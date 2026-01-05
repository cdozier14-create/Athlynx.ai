import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import EarlyAccess from "./pages/EarlyAccess";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={EarlyAccess} />
      <Route path={"/vip"} component={EarlyAccess} />
      <Route path={"/founders"} component={EarlyAccess} />
      <Route path={"/portal-login"} component={EarlyAccess} />
      <Route path={"/privacy"} component={EarlyAccess} />
      <Route path={"/terms"} component={EarlyAccess} />
      <Route path={"/contact"} component={EarlyAccess} />
      <Route component={EarlyAccess} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
