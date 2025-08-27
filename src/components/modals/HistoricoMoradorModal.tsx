import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  History, 
  Users, 
  AlertTriangle, 
  Home, 
  Calendar,
  FileText,
  Download
} from "lucide-react";

interface HistoricoMoradorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  morador: any;
}

const historicoMock = [
  {
    id: 1,
    tipo: "assembleia",
    titulo: "Participação em Assembleia",
    descricao: "Assembleia Ordinária - Janeiro 2024",
    data: "2024-01-15",
    status: "presente"
  },
  {
    id: 2,
    tipo: "advertencia",
    titulo: "Advertência por Ruído",
    descricao: "Som alto após 22h - Reclamação de vizinhos",
    data: "2024-01-08",
    status: "resolvido"
  },
  {
    id: 3,
    tipo: "mudanca",
    titulo: "Mudança de Unidade",
    descricao: "Transferência do Apt 201 para Apt 301",
    data: "2023-12-01",
    status: "concluido"
  },
  {
    id: 4,
    tipo: "assembleia",
    titulo: "Participação em Assembleia",
    descricao: "Assembleia Extraordinária - Dezembro 2023",
    data: "2023-12-15",
    status: "ausente"
  }
];

export const HistoricoMoradorModal = ({ open, onOpenChange, morador }: HistoricoMoradorModalProps) => {
  if (!morador) return null;

  const getIconByType = (tipo: string) => {
    switch (tipo) {
      case "assembleia":
        return <Users className="w-4 h-4 text-primary" />;
      case "advertencia":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "mudanca":
        return <Home className="w-4 h-4 text-accent" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "presente":
        return <Badge className="bg-success/10 text-success border-success/20">Presente</Badge>;
      case "ausente":
        return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Ausente</Badge>;
      case "resolvido":
        return <Badge className="bg-accent/10 text-accent border-accent/20">Resolvido</Badge>;
      case "concluido":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Concluído</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Histórico do Morador
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Resumo do Morador */}
          <div className="p-4 bg-muted/20 rounded-lg">
            <h3 className="font-semibold text-foreground">{morador.nome}</h3>
            <p className="text-sm text-muted-foreground">
              {morador.apartamento} - Bloco {morador.bloco}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{morador.tipo}</Badge>
              <Badge 
                className={morador.status === "ativo" 
                  ? "bg-success/10 text-success border-success/20" 
                  : "bg-muted/10 text-muted-foreground border-muted/20"
                }
              >
                {morador.status}
              </Badge>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 border border-border rounded-lg">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Assembleias</p>
            </div>
            <div className="text-center p-3 border border-border rounded-lg">
              <p className="text-2xl font-bold text-warning">2</p>
              <p className="text-sm text-muted-foreground">Advertências</p>
            </div>
            <div className="text-center p-3 border border-border rounded-lg">
              <p className="text-2xl font-bold text-accent">1</p>
              <p className="text-sm text-muted-foreground">Mudanças</p>
            </div>
          </div>

          <Separator />

          {/* Histórico */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Histórico de Eventos</h4>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
            
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {historicoMock.map((evento) => (
                  <div key={evento.id} className="p-3 border border-border rounded-lg">
                    <div className="flex items-start gap-3">
                      {getIconByType(evento.tipo)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-foreground">{evento.titulo}</h5>
                          {getStatusBadge(evento.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {evento.descricao}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {evento.data}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};