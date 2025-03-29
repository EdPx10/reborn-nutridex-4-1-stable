
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Explorateur from "./pages/Explorateur";
import FicheAliment from "./pages/FicheAliment";
import MonAssiette from "./pages/MonAssiette";
import ProfilUtilisateur from "./pages/ProfilUtilisateur";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Explorateur />} />
            <Route path="/aliment/:id" element={<FicheAliment />} />
            <Route path="/mon-assiette" element={<MonAssiette />} />
            <Route path="/profil" element={<ProfilUtilisateur />} />
            <Route path="/aliments" element={<Explorateur />} /> {/* Temporairement redirige vers Explorateur */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
