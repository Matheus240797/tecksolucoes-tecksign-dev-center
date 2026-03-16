import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Home from "@/pages/Home";
import GettingStarted from "@/pages/GettingStarted";
import Authentication from "@/pages/Authentication";
import CreateProcess from "@/pages/CreateProcess";
import GetProcess from "@/pages/GetProcess";
import GetDocuments from "@/pages/GetDocuments";
import ApiReference from "@/pages/ApiReference";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/getting-started" component={GettingStarted} />
      <Route path="/authentication" component={Authentication} />
      <Route path="/endpoints/create-process" component={CreateProcess} />
      <Route path="/endpoints/get-process" component={GetProcess} />
      <Route path="/endpoints/get-documents" component={GetDocuments} />
      <Route path="/api-reference" component={ApiReference} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
