import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MessageSquare, 
  CreditCard, 
  Calendar, 
  Wrench,
  CheckCircle,
  AlertCircle,
  Activity,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "payment",
    title: "Boleto pago automaticamente",
    description: "Morador Apt 301 - R$ 850,00",
    time: "2 min atrás",
    icon: CreditCard,
    status: "success"
  },
  {
    id: 2,
    type: "chat",
    title: "Atendimento IA finalizado",  
    description: "Reserva salão de festas aprovada",
    time: "5 min atrás",
    icon: MessageSquare,
    status: "success"
  },
  {
    id: 3,
    type: "maintenance",
    title: "Chamado de manutenção",
    description: "Vazamento no 2º andar - Protocolo #1234",
    time: "12 min atrás",
    icon: Wrench,
    status: "pending"
  },
  {
    id: 4,
    type: "reservation",
    title: "Nova reserva confirmada",
    description: "Churrasqueira - 25/12 às 19h",
    time: "18 min atrás",
    icon: Calendar,
    status: "success"
  },
  {
    id: 5,
    type: "chat",
    title: "Transferência para humano",
    description: "Solicitação complexa de mudança",
    time: "25 min atrás",
    icon: MessageSquare,
    status: "warning"
  }
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "success":
      return {
        badge: "bg-success/10 text-success border-success/20",
        icon: CheckCircle,
        iconColor: "text-success"
      };
    case "pending":
      return {
        badge: "bg-warning/10 text-warning border-warning/20",
        icon: Clock,
        iconColor: "text-warning"
      };
    case "warning":
      return {
        badge: "bg-warning/10 text-warning border-warning/20",
        icon: AlertCircle,
        iconColor: "text-warning"
      };
    default:
      return {
        badge: "bg-muted text-muted-foreground border-border",
        icon: Clock,
        iconColor: "text-muted-foreground"
      };
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "payment":
      return "bg-gradient-to-br from-success/20 to-success/5 text-success";
    case "chat":
      return "bg-gradient-to-br from-primary/20 to-primary/5 text-primary";
    case "maintenance":
      return "bg-gradient-to-br from-warning/20 to-warning/5 text-warning";
    case "reservation":
      return "bg-gradient-to-br from-accent/20 to-accent/5 text-accent";
    default:
      return "bg-gradient-to-br from-muted to-muted/50 text-muted-foreground";
  }
};

export const RecentActivity = () => {
  return (
    <Card className="p-6 md:p-8 bg-gradient-to-br from-card via-card to-muted/10 border-0 shadow-lg rounded-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="relative mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg">
              <Activity className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Atividades Recentes
              </h3>
              <p className="text-sm text-muted-foreground">
                Últimas ações no sistema
              </p>
            </div>
          </div>
          <button className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
            Ver todas
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative space-y-3">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          const statusStyles = getStatusStyles(activity.status);
          const StatusIcon = statusStyles.icon;
          
          return (
            <div 
              key={activity.id} 
              className={cn(
                "group flex items-start gap-4 p-4 rounded-xl",
                "bg-card/50 border border-border/30",
                "hover:bg-card hover:border-border/60 hover:shadow-md",
                "transition-all duration-200 cursor-pointer"
              )}
            >
              <div className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm",
                getTypeColor(activity.type)
              )}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {activity.title}
                  </p>
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0",
                    statusStyles.badge
                  )}>
                    <StatusIcon className={cn("w-3 h-3", statusStyles.iconColor)} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                  {activity.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
