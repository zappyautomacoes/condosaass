import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MessageSquare, 
  CreditCard, 
  Calendar, 
  Wrench,
  CheckCircle,
  AlertCircle
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "text-success bg-success/10 border-success/20";
    case "pending":
      return "text-warning bg-warning/10 border-warning/20";
    case "warning":
      return "text-warning bg-warning/10 border-warning/20";
    default:
      return "text-muted-foreground bg-muted/10 border-border";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
      return CheckCircle;
    case "pending":
    case "warning":
      return AlertCircle;
    default:
      return Clock;
  }
};

export const RecentActivity = () => {
  return (
    <Card className="p-6 bg-gradient-card border-0 shadow-soft">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Atividades Recentes
        </h3>
        <p className="text-sm text-muted-foreground">
          Últimas ações no sistema
        </p>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          const StatusIcon = getStatusIcon(activity.status);
          
          return (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm text-foreground truncate">
                    {activity.title}
                  </p>
                  <StatusIcon className={cn(
                    "w-4 h-4 flex-shrink-0",
                    getStatusColor(activity.status).split(' ')[0]
                  )} />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};