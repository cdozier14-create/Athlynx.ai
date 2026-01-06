import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import Stripe from "stripe";
import * as db from "../db";

// Initialize Stripe for webhooks
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
});

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // STRIPE WEBHOOK - Must be before body parser (needs raw body)
  app.post("/api/webhooks/stripe", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event: Stripe.Event;
    
    try {
      if (webhookSecret) {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } else {
        event = JSON.parse(req.body.toString()) as Stripe.Event;
      }
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    console.log(`[STRIPE WEBHOOK] ${event.type}`);
    
    // Handle the event - AUTOMATED MONEY MACHINE
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = parseInt(session.metadata?.userId || "0");
        const plan = session.metadata?.plan;
        const service = session.metadata?.service;
        const creditPack = session.metadata?.creditPack;
        
        if (plan && userId) {
          // AUTO-ACTIVATE SUBSCRIPTION
          const validPlans = ["rookie", "starter", "allstar", "elite", "legend"] as const;
          type PlanType = typeof validPlans[number];
          if (validPlans.includes(plan as PlanType)) {
            await db.createSubscription({
              userId,
              plan: plan as PlanType,
              status: "active",
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
            });
            // ADD CREDITS BASED ON PLAN
            const creditAmounts: Record<string, number> = {
              rookie: 100, starter: 250, allstar: 500, elite: 1000, legend: 5000
            };
            if (creditAmounts[plan]) {
              await db.addCredits(userId, creditAmounts[plan], "bonus", `${plan} plan subscription`);
            }
            console.log(`[AUTO] User ${userId} subscribed to ${plan} plan - MONEY IN!`);
          }
        }
        
        if (service && userId) {
          // AUTO-ACTIVATE SERVICE
          const validServices = ["music", "media", "ai_trainer", "ai_recruiter", "content_suite", "messenger_pro", "marketplace"] as const;
          type ServiceType = typeof validServices[number];
          if (validServices.includes(service as ServiceType)) {
            await db.addUserService({ userId, service: service as ServiceType });
            console.log(`[AUTO] User ${userId} purchased ${service} service - MONEY IN!`);
          }
        }
        
        if (creditPack && userId) {
          // AUTO-ADD CREDITS
          const amounts: Record<string, number> = { small: 100, medium: 300, large: 750, mega: 2000 };
          await db.addCredits(userId, amounts[creditPack] || 0, "purchase", `${creditPack} credit pack`);
          console.log(`[AUTO] User ${userId} bought ${creditPack} credits - MONEY IN!`);
        }
        break;
      }
      
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as any;
        const subscriptionId = invoice.subscription as string;
        // AUTO-RENEW - Money keeps flowing
        if (subscriptionId) {
          const sub = await stripe.subscriptions.retrieve(subscriptionId) as any;
          const userId = parseInt(sub.metadata?.userId || "0");
          if (userId) {
            await db.updateSubscription(userId, {
              status: "active",
              currentPeriodStart: new Date(sub.current_period_start * 1000),
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
            });
            console.log(`[AUTO-RENEW] User ${userId} subscription renewed - RECURRING REVENUE!`);
          }
        }
        break;
      }
      
      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        const subscriptionId = invoice.subscription as string;
        // AUTO-HANDLE FAILED PAYMENT
        if (subscriptionId) {
          const sub = await stripe.subscriptions.retrieve(subscriptionId) as any;
          const userId = parseInt(sub.metadata?.userId || "0");
          if (userId) {
            await db.updateSubscription(userId, { status: "past_due" });
            console.log(`[AUTO] User ${userId} payment failed - sending recovery email`);
            // TODO: Trigger automated recovery email sequence
          }
        }
        break;
      }
      
      case "customer.subscription.deleted": {
        const subscription = event.data.object as any;
        const userId = parseInt(subscription.metadata?.userId || "0");
        if (userId) {
          await db.updateSubscription(userId, { status: "cancelled", cancelledAt: new Date() });
          console.log(`[AUTO] User ${userId} subscription cancelled`);
        }
        break;
      }
      
      default:
        console.log(`[STRIPE] Unhandled event type: ${event.type}`);
    }
    
    res.json({ received: true });
  });
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
