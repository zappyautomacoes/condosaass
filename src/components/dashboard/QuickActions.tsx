import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Plus,
  Send,
  FileText,
  Users,
  MessageSquare,
  Building2,
  CreditCard,
  Calendar
} from "lucide-react";
import { CadastrarCondominioModal } from "@/components/modals/CadastrarCondominioModal";
import { CadastrarMoradorModal } from "@/components/modals/CadastrarMoradorModal";
import { GerarCobrancaModal } from "@/components/modals/GerarCobrancaModal";
import { AbrirAtendimentoModal } from "@/components/modals/AbrirAtendimentoModal";
import { EnviarComunicadoModal } from "@/components/modals/EnviarComunicadoModal";
import { AgendarReservaModal } from "@/components/modals/AgendarReservaModal";
import { GerarRelatorioModal } from "@/components/modals/GerarRelatorioModal";

export const QuickActions = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const quickActions = [
    {
      title: "Cadastrar Condomínio",
      description: "Adicionar novo cliente",
      icon: Building2,
      action: () => setActiveModal("cadastrar-condominio"),
      variant: "default" as const
    },
    {
      title: "Cadastrar Morador",
      description: "Adicionar novo contato",
      icon: Users,
      action: () => setActiveModal("cadastrar-morador"),
      variant: "outline" as const
    },
    {
      title: "Gerar Cobrança",
      description: "Criar boleto ou cobrança",
      icon: CreditCard,
      action: () => setActiveModal("gerar-cobranca"),
      variant: "default" as const
    },
    {
      title: "Abrir Atendimento",
      description: "Registrar solicitação",
      icon: MessageSquare,
      action: () => setActiveModal("abrir-atendimento"),
      variant: "secondary" as const
    },
    {
      title: "Enviar Comunicado",
      description: "Mensagem para todos",
      icon: Send,
      action: () => setActiveModal("enviar-comunicado"), 
      variant: "secondary" as const
    },
    {
      title: "Agendar Reserva",
      description: "Reservar espaço comum",
      icon: Calendar,
      action: () => setActiveModal("agendar-reserva"),
      variant: "outline" as const
    },
    {
      title: "Gerar Relatório",
      description: "Criar relatório detalhado",
      icon: FileText,
      action: () => setActiveModal("gerar-relatorio"),
      variant: "outline" as const
    }
  ];

  return (
    <>
      <Card className="p-6 bg-gradient-card border-0 shadow-soft">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Ações Rápidas
          </h3>
          <p className="text-sm text-muted-foreground">
            Acessos diretos às principais funcionalidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            
            return (
              <Button
                key={action.title}
                variant={action.variant}
                size="lg"
                onClick={action.action}
                className="h-auto p-4 flex flex-col items-center gap-3 text-center transition-smooth hover:shadow-soft"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">
                    {action.title}
                  </p>
                  <p className="text-xs opacity-80">
                    {action.description}
                  </p>
                </div>
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Modals */}
      <CadastrarCondominioModal 
        open={activeModal === "cadastrar-condominio"} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <CadastrarMoradorModal 
        open={activeModal === "cadastrar-morador"} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <GerarCobrancaModal 
        open={activeModal === "gerar-cobranca"} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <AbrirAtendimentoModal 
        open={activeModal === "abrir-atendimento"} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <EnviarComunicadoModal 
        open={activeModal === "enviar-comunicado"} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <AgendarReservaModal 
        open={activeModal === "agendar-reserva"} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
      <GerarRelatorioModal 
        open={activeModal === "gerar-relatorio"} 
        onOpenChange={(open) => !open && setActiveModal(null)} 
      />
    </>
  );
};