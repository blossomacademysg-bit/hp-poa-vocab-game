import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { I18nProvider } from "@/contexts/I18nContext";
import Home from "@/pages/Home";
import Play from "@/pages/Play";
import WordBank from "@/pages/WordBank";
import ProgressPage from "@/pages/Progress";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";

// Hash routing (/#/)：方便把 dist/index.html 直接丢到任何静态托管平台
function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/">{() => <Home />}</Route>
        <Route path="/play">{() => <Play />}</Route>
        <Route path="/word-bank">{() => <WordBank />}</Route>
        <Route path="/progress">{() => <ProgressPage />}</Route>
        <Route path="/login">{() => <Login />}</Route>
        <Route path="/register">{() => <Register />}</Route>
        <Route path="/admin">{() => <Admin />}</Route>
        <Route>{() => <NotFound />}</Route>
      </Switch>
    </Router>
  );
}

// Note on theming:
// - Choose defaultTheme based on your design (light or dark background)
// - Update the color palette in index.css to match
// - If you want switchable themes, add `switchable` prop and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

