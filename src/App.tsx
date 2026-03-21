import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { DataProvider } from "@/contexts/DataContext";
import { Layout } from "./components/layout/Layout";
import { SuperAdminLayout } from "./components/super-admin/SuperAdminLayout";
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

// Super Admin
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import SuperAdminAdministradoras from "./pages/super-admin/SuperAdminAdministradoras";
import SuperAdminAdminDetalhes from "./pages/super-admin/SuperAdminAdminDetalhes";
import SuperAdminSindicos from "./pages/super-admin/SuperAdminSindicos";
import SuperAdminPlanos from "./pages/super-admin/SuperAdminPlanos";
import SuperAdminFinanceiro from "./pages/super-admin/SuperAdminFinanceiro";
import SuperAdminConfiguracoes from "./pages/super-admin/SuperAdminConfiguracoes";

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
            <Routes>
              {/* Super Admin - Layout próprio */}
              <Route path="/super-admin" element={<Navigate to="/super-admin/dashboard" replace />} />
              <Route path="/super-admin/dashboard" element={<SuperAdminLayout><SuperAdminDashboard /></SuperAdminLayout>} />
              <Route path="/super-admin/administradoras" element={<SuperAdminLayout><SuperAdminAdministradoras /></SuperAdminLayout>} />
              <Route path="/super-admin/administradoras/:id" element={<SuperAdminLayout><SuperAdminAdminDetalhes /></SuperAdminLayout>} />
              <Route path="/super-admin/sindicos" element={<SuperAdminLayout><SuperAdminSindicos /></SuperAdminLayout>} />
              <Route path="/super-admin/planos" element={<SuperAdminLayout><SuperAdminPlanos /></SuperAdminLayout>} />
              <Route path="/super-admin/financeiro" element={<SuperAdminLayout><SuperAdminFinanceiro /></SuperAdminLayout>} />
              <Route path="/super-admin/configuracoes" element={<SuperAdminLayout><SuperAdminConfiguracoes /></SuperAdminLayout>} />

              {/* Sistema Principal - Layout existente */}
              <Route path="/" element={<Layout><Dashboard /></Layout>} />
              <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
              
              <Route path="/tarefas-diarias" element={<Layout><TarefasDiarias /></Layout>} />
              <Route path="/manutencoes" element={<Layout><Manutencoes /></Layout>} />
              <Route path="/agenda-sindico" element={<Layout><AgendaSindico /></Layout>} />
              <Route path="/funcionarios" element={<Layout><Funcionarios /></Layout>} />
              <Route path="/equipamentos" element={<Layout><Equipamentos /></Layout>} />
              <Route path="/seguranca" element={<Layout><Seguranca /></Layout>} />
              
              <Route path="/financeiro" element={<Layout><Financeiro /></Layout>} />
              <Route path="/cobranca" element={<Layout><Cobranca /></Layout>} />
              <Route path="/inadimplencia" element={<Layout><Inadimplencia /></Layout>} />
              <Route path="/integracao-bancaria" element={<Layout><IntegracaoBancaria /></Layout>} />
              
              <Route path="/moradores" element={<Layout><Moradores /></Layout>} />
              <Route path="/reservas" element={<Layout><Reservas /></Layout>} />
              <Route path="/assembleias" element={<Layout><Assembleias /></Layout>} />
              <Route path="/contratos" element={<Layout><Contratos /></Layout>} />
              <Route path="/fornecedores" element={<Layout><Fornecedores /></Layout>} />
              <Route path="/documentos" element={<Layout><Documentos /></Layout>} />
              <Route path="/patrimonio" element={<Layout><Patrimonio /></Layout>} />
              <Route path="/certificacoes" element={<Layout><Certificacoes /></Layout>} />
              
              <Route path="/atendimento" element={<Layout><Atendimento /></Layout>} />
              <Route path="/whatsapp" element={<Layout><WhatsAppConexao /></Layout>} />
              <Route path="/comunicados" element={<Layout><Comunicados /></Layout>} />
              <Route path="/chat" element={<Layout><ChatIA /></Layout>} />
              
              <Route path="/automacao" element={<Layout><Automacao /></Layout>} />
              <Route path="/alertas" element={<Layout><Alertas /></Layout>} />
              <Route path="/relatorios" element={<Layout><Relatorios /></Layout>} />
              <Route path="/configuracoes" element={<Layout><Configuracoes /></Layout>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
