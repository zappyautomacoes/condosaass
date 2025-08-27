import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, Calendar, Clock, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AprovarReservaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reserva: any;
  onReservaApproved?: (reserva: any, status: string) => void;
}

export const AprovarReservaModal = ({ open, onOpenChange, reserva, onReservaApproved }: AprovarReservaModalProps) => {
  const { toast } = useToast();
  const [observacoes, setObservacoes] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleApproval = (status: "confirmada" | "cancelada") => {
    if (!reserva) return;

    const reservaAtualizada = {
      ...reserva,
      status,
      observacoes: observacoes || reserva.observacoes,
      dataAprovacao: new Date().toISOString(),
    };

    onReservaApproved?.(reservaAtualizada, status);
    
    toast({
      title: status === "confirmada" ? "Reserva aprovada!" : "Reserva cancelada!",
      description: `Reserva ${reserva.protocolo} foi ${status === "confirmada" ? "aprovada" : "cancelada"} com sucesso.`,
      variant: status === "confirmada" ? "default" : "destructive",
    });

    setObservacoes("");
    setSelectedStatus("");
    onOpenChange(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmada":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "cancelada":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <AlertCircle className="w-5 h-5 text-warning" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmada":
        return <Badge className="bg-success/10 text-success border-success/20">Confirmada</Badge>;
      case "pendente":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>;
      case "cancelada":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Cancelada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!reserva) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusIcon(reserva.status)}
            Aprovar Reserva - {reserva.protocolo}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações da Reserva */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">Detalhes da Reserva</h4>
              {getStatusBadge(reserva.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Morador:</span>
                <span className="font-medium">{reserva.morador}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Apt:</span>
                <span className="font-medium">{reserva.apartamento}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Espaço:</span>
                <span className="font-medium">{reserva.espaco}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Data:</span>
                <span className="font-medium">{reserva.data}</span>
              </div>
              
              <div className="flex items-center gap-2 col-span-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Horário:</span>
                <span className="font-medium">{reserva.horario}</span>
              </div>
            </div>
            
            {reserva.observacoes && (
              <div className="mt-3">
                <span className="text-sm text-muted-foreground">Observações:</span>
                <p className="text-sm mt-1 p-2 bg-background rounded border">
                  {reserva.observacoes}
                </p>
              </div>
            )}
          </div>

          {/* Campo de Observações para Aprovação */}
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações da Aprovação</Label>
            <Textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Adicione observações sobre a aprovação ou cancelamento..."
              rows={3}
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Fechar
            </Button>
            
            {reserva.status === "pendente" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleApproval("cancelada")}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                
                <Button
                  onClick={() => handleApproval("confirmada")}
                  className="bg-gradient-accent text-accent-foreground"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aprovar
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};