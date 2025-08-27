import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  MessageSquare,
  FileText,
  Edit,
  Trash2
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DetalhesMoradorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  morador: any;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const DetalhesMoradorModal = ({ open, onOpenChange, morador, onEdit, onDelete }: DetalhesMoradorModalProps) => {
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-success/10 text-success border-success/20">Ativo</Badge>;
      case "inativo":
        return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Inativo</Badge>;
      case "pendente":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "proprietario":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Proprietário</Badge>;
      case "inquilino":
        return <Badge className="bg-accent/10 text-accent border-accent/20">Inquilino</Badge>;
      case "familiar":
        return <Badge className="bg-secondary/10 text-secondary-foreground border-secondary/20">Familiar</Badge>;
      case "visitante":
        return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Visitante</Badge>;
      default:
        return <Badge variant="outline">{tipo}</Badge>;
    }
  };

  const getInitials = (nome: string) => {
    return nome
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  if (!morador) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Detalhes do Morador
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header com Avatar e Info Principal */}
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {getInitials(morador.nome)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {morador.nome}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {morador.apartamento} {morador.bloco && `- Bloco ${morador.bloco}`}
                </p>
              </div>
              
              <div className="flex gap-2">
                {getStatusBadge(morador.status)}
                {getTipoBadge(morador.tipo)}
              </div>
            </div>
          </div>

          <Separator />

          {/* Informações de Contato */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Contatos
            </h4>
            
            <div className="grid gap-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-foreground">{morador.email}</span>
              </div>
              
              {morador.telefone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Telefone:</span>
                  <span className="font-medium text-foreground">{morador.telefone}</span>
                </div>
              )}
              
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Localização:</span>
                <span className="font-medium text-foreground">
                  {morador.apartamento} {morador.bloco && `- Bloco ${morador.bloco}`}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Estatísticas */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Histórico
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-3 bg-gradient-card border-0 shadow-soft">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {morador.totalInteracoes || 0}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Total de Interações
                  </p>
                </div>
              </Card>
              
              <Card className="p-3 bg-gradient-card border-0 shadow-soft">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">
                    {morador.reservasAtivas || 0}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Reservas Ativas
                  </p>
                </div>
              </Card>
            </div>
            
            {morador.ultimaInteracao && (
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Última interação:</span>
                <span className="font-medium text-foreground">
                  {formatDate(morador.ultimaInteracao)}
                </span>
              </div>
            )}
          </div>

          {/* Observações */}
          {morador.observacoes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Observações</h4>
                <div className="text-sm text-muted-foreground bg-muted/30 rounded-md p-3">
                  {morador.observacoes}
                </div>
              </div>
            </>
          )}

          {/* Botões de Ação */}
          <div className="flex justify-between pt-4 border-t">
            <div className="flex gap-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEdit}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </Button>
              )}
              
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDelete}
                  className="flex items-center gap-2 hover:text-destructive hover:border-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </Button>
              )}
            </div>
            
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};