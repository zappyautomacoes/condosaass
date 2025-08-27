import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, Calendar, User, Clock, FileText, MapPin, Settings, Shield, Bug, Brush, HardHat } from "lucide-react";

interface VisualizarManutencaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  manutencao?: any;
}

const VisualizarManutencaoModal = ({ open, onOpenChange, manutencao }: VisualizarManutencaoModalProps) => {
  if (!manutencao) return null;

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case "equipamentos": return Settings;
      case "infraestrutura": return HardHat;
      case "seguranca": return Shield;
      case "pragas": return Bug;
      case "obras": return Brush;
      default: return Settings;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "agendada":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Agendada</Badge>;
      case "atrasada":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Atrasada</Badge>;
      case "pendente":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>;
      case "concluida":
        return <Badge className="bg-success/10 text-success border-success/20">Concluída</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const IconComponent = getCategoriaIcon(manutencao.categoria);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Detalhes da Manutenção
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cabeçalho da Manutenção */}
          <Card className="p-6 bg-gradient-card border-0">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-foreground">#{manutencao.protocolo}</h3>
                  {getStatusBadge(manutencao.status)}
                </div>
                <h4 className="text-lg text-foreground mb-1">{manutencao.tipo}</h4>
                <p className="text-muted-foreground">{manutencao.equipamento}</p>
              </div>
            </div>
          </Card>

          {/* Informações Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 bg-muted/20">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-primary" />
                <h5 className="font-semibold">Agendamento</h5>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data:</span>
                  <span className="font-medium">{manutencao.dataProxima}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Periodicidade:</span>
                  <span className="font-medium">{manutencao.periodicidade}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-muted/20">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-primary" />
                <h5 className="font-semibold">Responsável</h5>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Empresa:</span>
                  <span className="font-medium">{manutencao.responsavel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Custo:</span>
                  <span className="font-medium">{manutencao.custo}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Observações */}
          {manutencao.observacoes && (
            <Card className="p-4 bg-muted/20">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-primary" />
                <h5 className="font-semibold">Observações</h5>
              </div>
              <p className="text-sm leading-relaxed">{manutencao.observacoes}</p>
            </Card>
          )}

          {/* Histórico (Placeholder) */}
          <Card className="p-4 bg-muted/20">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-primary" />
              <h5 className="font-semibold">Histórico de Execuções</h5>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="text-sm font-medium">Última execução</p>
                  <p className="text-xs text-muted-foreground">2023-08-15 - Concluída</p>
                </div>
                <Badge className="bg-success/10 text-success border-success/20">Concluída</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="text-sm font-medium">Execução anterior</p>
                  <p className="text-xs text-muted-foreground">2023-02-15 - Concluída</p>
                </div>
                <Badge className="bg-success/10 text-success border-success/20">Concluída</Badge>
              </div>
            </div>
          </Card>

          {/* Anexos (Placeholder) */}
          <Card className="p-4 bg-muted/20">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-primary" />
              <h5 className="font-semibold">Documentos e Anexos</h5>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-background rounded">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Relatório_Manutencao_2023.pdf</span>
                </div>
                <Button variant="ghost" size="sm">Download</Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-background rounded">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Fotos_Antes_Depois.zip</span>
                </div>
                <Button variant="ghost" size="sm">Download</Button>
              </div>
            </div>
          </Card>
        </div>

        <Separator />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisualizarManutencaoModal;