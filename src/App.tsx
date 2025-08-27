import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { DataProvider } from "@/contexts/DataContext";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";

// Gestão Geral
import Analytics from "./pages/Analytics";

// Gestão do Síndico
import TarefasDiarias from "./pages/TarefasDiarias";
import Manutencoes from "./pages/Manutencoes";
import AgendaSindico from "./pages/AgendaSindico";
import Funcionarios from "./pages/Funcionarios";
import Equipamentos from "./pages/Equipamentos";
import Seguranca from "./pages/Seguranca";

// Gestão Financeira
import Financeiro from "./pages/Financeiro";
import Cobranca from "./pages/Cobranca";
import Inadimplencia from "./pages/Inadimplencia";
import IntegracaoBancaria from "./pages/IntegracaoBancaria";

// Gestão Operacional
import Moradores from "./pages/Moradores";
import Reservas from "./pages/Reservas";
import Assembleias from "./pages/Assembleias";
import Contratos from "./pages/Contratos";
import Fornecedores from "./pages/Fornecedores";
import Documentos from "./pages/Documentos";
import Patrimonio from "./pages/Patrimonio";
import Certificacoes from "./pages/Certificacoes";

// Comunicação
import Atendimento from "./pages/Atendimento";
import WhatsAppConexao from "./pages/WhatsAppConexao";
import Comunicados from "./pages/Comunicados";
import ChatIA from "./pages/ChatIA";

// Automação
import Automacao from "./pages/Automacao";
import Alertas from "./pages/Alertas";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DataProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
            <Routes>
              {/* Gestão Geral */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              
              {/* Gestão do Síndico */}
              <Route path="/tarefas-diarias" element={<TarefasDiarias />} />
              <Route path="/manutencoes" element={<Manutencoes />} />
              <Route path="/agenda-sindico" element={<AgendaSindico />} />
              <Route path="/funcionarios" element={<Funcionarios />} />
              <Route path="/equipamentos" element={<Equipamentos />} />
              <Route path="/seguranca" element={<Seguranca />} />
              
              {/* Gestão Financeira */}
              <Route path="/financeiro" element={<Financeiro />} />
              <Route path="/cobranca" element={<Cobranca />} />
              <Route path="/inadimplencia" element={<Inadimplencia />} />
              <Route path="/integracao-bancaria" element={<IntegracaoBancaria />} />
              
              {/* Gestão Operacional */}
              <Route path="/moradores" element={<Moradores />} />
              <Route path="/reservas" element={<Reservas />} />
              <Route path="/assembleias" element={<Assembleias />} />
              <Route path="/contratos" element={<Contratos />} />
              <Route path="/fornecedores" element={<Fornecedores />} />
              <Route path="/documentos" element={<Documentos />} />
              <Route path="/patrimonio" element={<Patrimonio />} />
              <Route path="/certificacoes" element={<Certificacoes />} />
              
              {/* Comunicação */}
              <Route path="/atendimento" element={<Atendimento />} />
              <Route path="/whatsapp" element={<WhatsAppConexao />} />
              <Route path="/comunicados" element={<Comunicados />} />
              <Route path="/chat" element={<ChatIA />} />
              
              {/* Automação */}
              <Route path="/automacao" element={<Automacao />} />
              <Route path="/alertas" element={<Alertas />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        </DataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
