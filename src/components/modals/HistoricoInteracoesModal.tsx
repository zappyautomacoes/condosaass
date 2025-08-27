import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Phone, Mail, Calendar, User } from "lucide-react";

interface HistoricoInteracoesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  morador?: any;
}

export const HistoricoInteracoesModal = ({ open, onOpenChange, morador }: HistoricoInteracoesModalProps) => {
  const interacoes = [
    {
      id: 1,
      tipo: "whatsapp",
      data: "2024-01-22 14:30",
      assunto: "Dúvida sobre taxa condominial",
      resumo: "Morador questionou sobre aumento na taxa de janeiro",
      status: "resolvido",
    },
    {
      id: 2,
      tipo: "email",
      data: "2024-01-20 09:15",
      assunto: "Solicitação de reserva",
      resumo: "Pedido de reserva do salão de festas para 15/02",
      status: "pendente",
    },
    {
      id: 3,
      tipo: "presencial",
      data: "2024-01-18 16:00",
      assunto: "Reclamação sobre barulho",
      resumo: "Relatou barulho do apartamento vizinho após 22h",
      status: "resolvido",
    },
    {
      id: 4,
      tipo: "telefone",
      data: "2024-01-15 11:30",
      assunto: "Problema na fechadura",
      resumo: "Dificuldade para abrir a porta do prédio",
      status: "resolvido",
    },
  ];

  const getIconByTipo = (tipo: string) => {
    switch (tipo) {
      case "whatsapp":
        return <MessageSquare className="w-4 h-4 text-success" />;
      case "email":
        return <Mail className="w-4 h-4 text-primary" />;
      case "telefone":
        return <Phone className="w-4 h-4 text-warning" />;
      case "presencial":
        return <User className="w-4 h-4 text-accent" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolvido":
        return <Badge className="bg-success/10 text-success border-success/20">Resolvido</Badge>;
      case "pendente":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Histórico de Interações</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {morador?.nome} - {morador?.apartamento}
          </p>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{morador?.totalInteracoes || 0}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">15</p>
              <p className="text-sm text-muted-foreground">Resolvidas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">1</p>
              <p className="text-sm text-muted-foreground">Pendentes</p>
            </div>
          </div>

          <ScrollArea className="h-80">
            <div className="space-y-3">
              {interacoes.map((interacao) => (
                <div key={interacao.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-smooth">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getIconByTipo(interacao.tipo)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground">
                            {interacao.assunto}
                          </p>
                          {getStatusBadge(interacao.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {interacao.resumo}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {interacao.data}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Fechar
            </Button>
            <Button className="bg-gradient-primary text-primary-foreground">
              Nova Interação
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};