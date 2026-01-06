import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import EarlyAccess from "@/pages/EarlyAccess";
import Portal from "@/pages/Portal";
import FounderStory from "@/pages/FounderStory";
import RobotCompanions from "@/pages/RobotCompanions";
import Veterans from "@/pages/Veterans";
import BlueCollar from "@/pages/BlueCollar";
import CRMDashboard from "@/pages/CRMDashboard";
import ManusPartnership from "@/pages/ManusPartnership";
import Pricing from "@/pages/Pricing";
import TransferPortal from "@/pages/TransferPortal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={EarlyAccess} />
      <Route path="/early-access" component={EarlyAccess} />
      <Route path="/portal" component={Portal} />
      <Route path="/our-story" component={FounderStory} />
      <Route path="/founder-story" component={FounderStory} />
      <Route path="/robot-companions" component={RobotCompanions} />
      <Route path="/robots" component={RobotCompanions} />
      <Route path="/veterans" component={Veterans} />
      <Route path="/veterans-heroes" component={Veterans} />
      <Route path="/blue-collar" component={BlueCollar} />
      <Route path="/life-playbook" component={BlueCollar} />
      <Route path="/crm" component={CRMDashboard} />
      <Route path="/dashboard" component={CRMDashboard} />
      <Route path="/partner-dashboard" component={CRMDashboard} />
      <Route path="/manus" component={ManusPartnership} />
      <Route path="/partnership" component={ManusPartnership} />
      <Route path="/ai-partner" component={ManusPartnership} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/transfer-portal" component={TransferPortal} />
      <Route path="/portal-search" component={TransferPortal} />
      <Route path="/find-players" component={TransferPortal} />
      <Route path="/plans" component={Pricing} />
      <Route path="/subscribe" component={Pricing} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
