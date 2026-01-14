import { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Plus,
  Send,
  FileText,
  Users,
  MessageSquare,
  Building2,
  CreditCard,
  Calendar,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CadastrarCondominioModal } from "@/components/modals/CadastrarCondominioModal";
import { CadastrarMoradorModal } from "@/components/modals/CadastrarMoradorModal";
import { GerarCobrancaModal } from "@/components/modals/GerarCobrancaModal";
import { AbrirAtendimentoModal } from "@/components/modals/AbrirAtendimentoModal";
import { EnviarComunicadoModal } from "@/components/modals/EnviarComunicadoModal";
import { AgendarReservaModal } from "@/components/modals/AgendarReservaModal";
import { GerarRelatorioModal } from "@/components/modals/GerarRelatorioModal";

export const QuickActions = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const quickActions = [
    {
      id: "cadastrar-condominio",
      title: "Cadastrar Condomínio",
      description: "Adicionar novo cliente",
      icon: Building2,
      gradient: "from-primary to-primary/80",
      bgHover: "group-hover:bg-primary/10"
    },
    {
      id: "cadastrar-morador",
      title: "Cadastrar Morador",
      description: "Adicionar novo contato",
      icon: Users,
      gradient: "from-accent to-accent/80",
      bgHover: "group-hover:bg-accent/10"
    },
    {
      id: "gerar-cobranca",
      title: "Gerar Cobrança",
      description: "Criar boleto ou cobrança",
      icon: CreditCard,
      gradient: "from-warning to-warning/80",
      bgHover: "group-hover:bg-warning/10"
    },
    {
      id: "abrir-atendimento",
      title: "Abrir Atendimento",
      description: "Registrar solicitação",
      icon: MessageSquare,
      gradient: "from-primary to-accent",
      bgHover: "group-hover:bg-primary/10"
    },
    {
      id: "enviar-comunicado",
      title: "Enviar Comunicado",
      description: "Mensagem para todos",
      icon: Send,
      gradient: "from-destructive to-destructive/80",
      bgHover: "group-hover:bg-destructive/10"
    },
    {
      id: "agendar-reserva",
      title: "Agendar Reserva",
      description: "Reservar espaço comum",
      icon: Calendar,
      gradient: "from-accent to-primary",
      bgHover: "group-hover:bg-accent/10"
    },
    {
      id: "gerar-relatorio",
      title: "Gerar Relatório",
      description: "Criar relatório detalhado",
      icon: FileText,
      gradient: "from-muted-foreground to-muted-foreground/80",
      bgHover: "group-hover:bg-muted"
    }
  ];

  return (
    <>
      <Card className="p-6 md:p-8 bg-gradient-to-br from-card via-card to-muted/20 border-0 shadow-lg rounded-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="relative mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Plus className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Ações Rápidas
              </h3>
              <p className="text-sm text-muted-foreground">
                Acessos diretos às principais funcionalidades
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const isHovered = hoveredAction === action.id;
            
            return (
              <button
                key={action.id}
                onClick={() => setActiveModal(action.id)}
                onMouseEnter={() => setHoveredAction(action.id)}
                onMouseLeave={() => setHoveredAction(null)}
                className={cn(
                  "group relative flex flex-col items-center justify-center gap-3 p-4 md:p-5",
                  "rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm",
                  "transition-all duration-300 ease-out",
                  "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
                  "hover:-translate-y-1 hover:bg-card",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
                  "min-h-[140px]"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  "bg-gradient-to-br shadow-md transition-all duration-300",
                  action.gradient,
                  "group-hover:scale-110 group-hover:shadow-lg"
                )}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="text-center space-y-1 w-full">
                  <p className="font-semibold text-sm text-foreground leading-tight line-clamp-2">
                    {action.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 hidden sm:block">
                    {action.description}
                  </p>
                </div>

                <div className={cn(
                  "absolute bottom-3 right-3 w-6 h-6 rounded-full",
                  "bg-primary/10 flex items-center justify-center",
                  "opacity-0 group-hover:opacity-100 transition-all duration-300",
                  "translate-x-2 group-hover:translate-x-0"
                )}>
                  <ArrowRight className="w-3 h-3 text-primary" />
                </div>
              </button>
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
