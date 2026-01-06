import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import EarlyAccess from "@/pages/EarlyAccess";
import Portal from "@/pages/Portal";
import Messenger from "@/pages/Messenger";
import DiamondGrind from "@/pages/DiamondGrind";
import Pricing from "@/pages/Pricing";
import AIAgents from "@/pages/AIAgents";
import Music from "@/pages/Music";
import Marketplace from "@/pages/Marketplace";
import Stories from "@/pages/Stories";
import WarriorsPlaybook from "@/pages/WarriorsPlaybook";
import TransferPortal from "@/pages/TransferPortal";
import NILVault from "@/pages/NILVault";
import Faith from "@/pages/Faith";
import AdminDashboard from "@/pages/AdminDashboard";
import BrandDeals from "@/pages/BrandDeals";
import WebsiteBuilder from "@/pages/WebsiteBuilder";
import Infrastructure from "@/pages/Infrastructure";
import MarketingServices from "@/pages/MarketingServices";
import DHGEmpire from "@/pages/DHGEmpire";

function Router() {
  return (
    <Switch>
      <Route path="/" component={EarlyAccess} />
      <Route path="/early-access" component={EarlyAccess} />
      <Route path="/portal" component={Portal} />
      <Route path="/messenger" component={Messenger} />
      <Route path="/diamond-grind" component={DiamondGrind} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/ai" component={AIAgents} />
      <Route path="/ai-agents" component={AIAgents} />
      <Route path="/music" component={Music} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/stories" component={Stories} />
      <Route path="/reels" component={Stories} />
      <Route path="/playbook" component={WarriorsPlaybook} />
      <Route path="/warriors-playbook" component={WarriorsPlaybook} />
      <Route path="/transfer-portal" component={TransferPortal} />
      <Route path="/transfer" component={TransferPortal} />
      <Route path="/nil-vault" component={NILVault} />
      <Route path="/nil" component={NILVault} />
      <Route path="/faith" component={Faith} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/revenue" component={AdminDashboard} />
      {/* Phase 10 - Advertisement & Infrastructure */}
      <Route path="/brand-deals" component={BrandDeals} />
      <Route path="/ads" component={BrandDeals} />
      <Route path="/advertising" component={BrandDeals} />
      <Route path="/sponsors" component={BrandDeals} />
      <Route path="/website-builder" component={WebsiteBuilder} />
      <Route path="/builder" component={WebsiteBuilder} />
      <Route path="/hosting" component={WebsiteBuilder} />
      <Route path="/cloud" component={WebsiteBuilder} />
      <Route path="/infrastructure" component={Infrastructure} />
      <Route path="/data-centers" component={Infrastructure} />
      <Route path="/domains" component={Infrastructure} />
      <Route path="/marketing-services" component={MarketingServices} />
      <Route path="/marketing" component={MarketingServices} />
      <Route path="/agency" component={MarketingServices} />
      {/* The Empire */}
      <Route path="/empire" component={DHGEmpire} />
      <Route path="/dhg" component={DHGEmpire} />
      <Route path="/dozier-holdings-group" component={DHGEmpire} />
      <Route path="/crown" component={DHGEmpire} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
