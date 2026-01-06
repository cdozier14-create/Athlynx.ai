import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const TEMPLATES = [
  { id: 1, name: "Pro Athlete", preview: "🏆", category: "Sports", description: "Perfect for professional athletes", popular: true },
  { id: 2, name: "College Star", preview: "🎓", category: "College", description: "Designed for NCAA athletes" },
  { id: 3, name: "Rising Talent", preview: "⭐", category: "High School", description: "Showcase your potential" },
  { id: 4, name: "Coach Pro", preview: "📋", category: "Coaches", description: "For coaches and trainers" },
  { id: 5, name: "Team Hub", preview: "👥", category: "Teams", description: "Team and organization sites" },
  { id: 6, name: "Media Kit", preview: "📸", category: "Influencer", description: "Perfect for NIL deals" },
];

const HOSTING_PLANS = [
  {
    name: "Starter",
    price: "$9.99",
    period: "/month",
    features: ["1 Website", "Free subdomain", "5GB Storage", "SSL Certificate", "Basic Analytics", "Email Support"],
    color: "from-slate-500 to-slate-600",
  },
  {
    name: "Pro",
    price: "$29.99",
    period: "/month",
    features: ["3 Websites", "Custom Domain", "25GB Storage", "SSL Certificate", "Advanced Analytics", "Priority Support", "Remove ATHLYNX branding"],
    color: "from-cyan-500 to-blue-500",
    popular: true,
  },
  {
    name: "Team",
    price: "$99.99",
    period: "/month",
    features: ["10 Websites", "Multiple Domains", "100GB Storage", "SSL Certificate", "Team Analytics", "24/7 Support", "White-label option", "API Access"],
    color: "from-purple-500 to-pink-500",
  },
];

const MAINTENANCE_CONTRACTS = [
  {
    name: "Basic Care",
    price: "$49",
    period: "/month",
    features: ["Monthly updates", "Security patches", "Uptime monitoring", "Email support", "48hr response time"],
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Pro Care",
    price: "$149",
    period: "/month",
    features: ["Weekly updates", "Security + performance", "24/7 monitoring", "Priority support", "4hr response time", "Monthly reports", "Content updates (2/mo)"],
    color: "from-blue-500 to-cyan-500",
    popular: true,
  },
  {
    name: "Enterprise Care",
    price: "$499",
    period: "/month",
    features: ["Daily monitoring", "Dedicated manager", "Instant response", "Unlimited content updates", "Custom development", "Strategy sessions", "White-glove service"],
    color: "from-amber-500 to-orange-500",
  },
];

export default function WebsiteBuilder() {
  const { user, isAuthenticated } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<"builder" | "hosting" | "maintenance">("builder");

  const handleStartBuilding = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to start building");
      return;
    }
    toast.success("Website builder launching soon! You'll be first to know.");
  };

  const handleSelectPlan = (planName: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to select a plan");
      return;
    }
    toast.success(`${planName} plan selected! Checkout coming soon.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/athlynx-logo-icon.png" alt="ATHLYNX" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold text-cyan-400">ATHLYNX Cloud</h1>
              <p className="text-xs text-slate-400">Website Builder & Hosting</p>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <a href="/portal" className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Back to Portal
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <span className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
          ☁️ ATHLYNX CLOUD - AWS FOR ATHLETES
        </span>
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Empire</span> Online
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Professional websites, reliable hosting, and expert maintenance. Everything you need to dominate online.
        </p>

        {/* Section Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveSection("builder")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === "builder"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            🎨 Website Builder
          </button>
          <button
            onClick={() => setActiveSection("hosting")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === "hosting"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            ☁️ Hosting Plans
          </button>
          <button
            onClick={() => setActiveSection("maintenance")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === "maintenance"
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            🛠️ Maintenance Contracts
          </button>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 pb-16">
        {/* Website Builder Section */}
        {activeSection === "builder" && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Choose Your Template</h2>
              <p className="text-slate-400">Professional designs built for athletes. Customize everything.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {TEMPLATES.map((template) => (
                <Card
                  key={template.id}
                  className={`bg-slate-800/50 border-slate-700 cursor-pointer transition-all hover:border-cyan-500/50 ${
                    selectedTemplate === template.id ? "border-cyan-500 ring-2 ring-cyan-500/20" : ""
                  } ${template.popular ? "relative" : ""}`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  {template.popular && (
                    <span className="absolute -top-3 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Popular
                    </span>
                  )}
                  <CardContent className="py-8 text-center">
                    <span className="text-6xl block mb-4">{template.preview}</span>
                    <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                    <p className="text-cyan-400 text-sm mb-2">{template.category}</p>
                    <p className="text-slate-400 text-sm">{template.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Builder Features */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-center">Drag-and-Drop Builder Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <span className="text-4xl block mb-3">🎨</span>
                    <h4 className="font-bold text-white">Visual Editor</h4>
                    <p className="text-slate-400 text-sm">No code required</p>
                  </div>
                  <div>
                    <span className="text-4xl block mb-3">📱</span>
                    <h4 className="font-bold text-white">Mobile Ready</h4>
                    <p className="text-slate-400 text-sm">Responsive design</p>
                  </div>
                  <div>
                    <span className="text-4xl block mb-3">🔗</span>
                    <h4 className="font-bold text-white">Social Integration</h4>
                    <p className="text-slate-400 text-sm">Connect all platforms</p>
                  </div>
                  <div>
                    <span className="text-4xl block mb-3">📊</span>
                    <h4 className="font-bold text-white">Built-in Analytics</h4>
                    <p className="text-slate-400 text-sm">Track your visitors</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-12"
                onClick={handleStartBuilding}
              >
                Start Building Free
              </Button>
            </div>
          </div>
        )}

        {/* Hosting Plans Section */}
        {activeSection === "hosting" && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Hosting Plans</h2>
              <p className="text-slate-400">Fast, secure, and reliable hosting for your athlete website.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {HOSTING_PLANS.map((plan) => (
                <Card
                  key={plan.name}
                  className={`bg-slate-800/50 border-slate-700 relative ${
                    plan.popular ? "border-cyan-500 ring-2 ring-cyan-500/20" : ""
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  )}
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                      <span className="text-2xl">☁️</span>
                    </div>
                    <CardTitle className="text-white">{plan.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-slate-400">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                          <span className="text-green-400">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${plan.popular ? "bg-cyan-500 hover:bg-cyan-400" : "bg-slate-700 hover:bg-slate-600"}`}
                      onClick={() => handleSelectPlan(plan.name)}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Hosting Features */}
            <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
              <CardContent className="py-8">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <p className="text-4xl font-bold text-cyan-400">99.9%</p>
                    <p className="text-slate-400">Uptime Guarantee</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-green-400">Free</p>
                    <p className="text-slate-400">SSL Certificates</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-purple-400">CDN</p>
                    <p className="text-slate-400">Global Delivery</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-amber-400">24/7</p>
                    <p className="text-slate-400">DDoS Protection</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Maintenance Contracts Section */}
        {activeSection === "maintenance" && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Maintenance & Support Contracts</h2>
              <p className="text-slate-400">Let us handle the technical stuff so you can focus on your game.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {MAINTENANCE_CONTRACTS.map((contract) => (
                <Card
                  key={contract.name}
                  className={`bg-slate-800/50 border-slate-700 relative ${
                    contract.popular ? "border-green-500 ring-2 ring-green-500/20" : ""
                  }`}
                >
                  {contract.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Best Value
                    </span>
                  )}
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contract.color} flex items-center justify-center mb-4`}>
                      <span className="text-2xl">🛠️</span>
                    </div>
                    <CardTitle className="text-white">{contract.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">{contract.price}</span>
                      <span className="text-slate-400">{contract.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {contract.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                          <span className="text-green-400">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${contract.popular ? "bg-green-500 hover:bg-green-400" : "bg-slate-700 hover:bg-slate-600"}`}
                      onClick={() => handleSelectPlan(contract.name)}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* What's Included */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-center">What's Included in Every Contract</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <span className="text-4xl block mb-3">🔒</span>
                    <h4 className="font-bold text-white mb-2">Security Updates</h4>
                    <p className="text-slate-400 text-sm">Regular security patches and vulnerability fixes</p>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl block mb-3">⚡</span>
                    <h4 className="font-bold text-white mb-2">Performance Optimization</h4>
                    <p className="text-slate-400 text-sm">Keep your site fast and responsive</p>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl block mb-3">💾</span>
                    <h4 className="font-bold text-white mb-2">Daily Backups</h4>
                    <p className="text-slate-400 text-sm">Never lose your data with automatic backups</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Enterprise CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-y border-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-slate-400 mb-8">
            White-label solutions for teams, schools, and organizations. Let's build something amazing together.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-8">
            Contact Enterprise Sales
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>ATHLYNX Cloud • AWS for Athletes</p>
          <p className="mt-2">🎨 Build • ☁️ Host • 🛠️ Maintain</p>
        </div>
      </footer>
    </div>
  );
}
