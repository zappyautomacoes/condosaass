import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package, MapPin, Calendar, DollarSign, User, CheckCircle2, Wrench, AlertTriangle, FileText, Download, Camera, Settings, History } from "lucide-react";
import { Equipamento, Manutencao } from "@/contexts/DataContext";
import { useData } from "@/contexts/DataContext";

interface VisualizarEquipamentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipamento: Equipamento | null;
}

const VisualizarEquipamentoModal = ({ open, onOpenChange, equipamento }: VisualizarEquipamentoModalProps) => {
  const { state } = useData();
  
  if (!equipamento) return null;

  const manutencoes = state.manutencoes.filter(m => m.equipamentoId === equipamento.id);
  const proximasManutencoes = manutencoes.filter(m => m.status === 'agendada');
  const manutencoesConcluidas = manutencoes.filter(m => m.status === 'concluida');

  const getStatusBadge = (situacao: string) => {
    switch (situacao) {
      case "ativo":
        return <Badge variant="secondary" className="gap-1 bg-success/20 text-success border-success/30"><CheckCircle2 className="w-3 h-3" />Ativo</Badge>;
      case "manutencao":
        return <Badge variant="secondary" className="gap-1 bg-warning/20 text-warning border-warning/30"><Wrench className="w-3 h-3" />Em Manutenção</Badge>;
      case "inativo":
        return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Inativo</Badge>;
      default:
        return <Badge variant="outline">{situacao}</Badge>;
    }
  };

  const getStatusColor = (situacao: string) => {
    switch (situacao) {
      case "ativo":
        return "border-success/20 bg-success/5";
      case "manutencao":
        return "border-warning/20 bg-warning/5";
      case "inativo":
        return "border-destructive/20 bg-destructive/5";
      default:
        return "border-border/20 bg-muted/5";
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "extintor": return "Extintor";
      case "alarme": return "Sistema de Alarme";
      case "luz_emergencia": return "Luz de Emergência";
      case "porta_corta_fogo": return "Porta Corta-Fogo";
      case "outro": return "Outro";
      default: return tipo;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "extintor": return "🧯";
      case "alarme": return "🚨";
      case "luz_emergencia": return "💡";
      case "porta_corta_fogo": return "🚪";
      default: return "⚙️";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Ficha do Equipamento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header com Avatar e Informações Básicas */}
          <div className={`p-6 rounded-lg border ${getStatusColor(equipamento.situacao)}`}>
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-2xl">
                  {getTipoIcon(equipamento.tipo)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-foreground">{equipamento.nome}</h3>
                  {getStatusBadge(equipamento.situacao)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <Badge variant="outline">
                        {getTipoLabel(equipamento.tipo)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Localização</p>
                      <p className="font-medium">{equipamento.localInstalacao}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Instalação</p>
                      <p className="font-medium">{new Date(equipamento.dataInstalacao).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informações Detalhadas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Package className="w-5 h-5" />
                Informações Gerais
              </h4>
              
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                {equipamento.numeroSerie && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Número de Série</label>
                    <p className="font-mono">{equipamento.numeroSerie}</p>
                  </div>
                )}
                
                {equipamento.fornecedor && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fornecedor</label>
                    <p>{equipamento.fornecedor}</p>
                  </div>
                )}
                
                {equipamento.responsavel && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Responsável</label>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{equipamento.responsavel}</span>
                    </div>
                  </div>
                )}
                
                {equipamento.garantia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Garantia</label>
                    <p>{equipamento.garantia}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Manutenção
              </h4>
              
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                {equipamento.ultimaManutencao && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Última Manutenção</label>
                    <p className="font-medium">
                      {new Date(equipamento.ultimaManutencao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                )}
                
                {equipamento.proximaManutencao && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Próxima Manutenção</label>
                    <p className="font-medium">
                      {new Date(equipamento.proximaManutencao).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {Math.ceil((new Date(equipamento.proximaManutencao).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} dias
                    </p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Manutenções Agendadas</label>
                  <p className="font-medium text-warning">{proximasManutencoes.length}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Manutenções Realizadas</label>
                  <p className="font-medium text-success">{manutencoesConcluidas.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Histórico de Manutenções */}
          {manutencoes.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <History className="w-5 h-5" />
                Histórico de Manutenções
              </h4>
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {manutencoes.sort((a, b) => new Date(b.dataAgendada).getTime() - new Date(a.dataAgendada).getTime()).map((manutencao) => (
                    <div key={manutencao.id} className="flex items-center justify-between pb-2 border-b border-border/50 last:border-b-0">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          manutencao.status === 'concluida' ? 'bg-success' : 
                          manutencao.status === 'agendada' ? 'bg-warning' : 'bg-destructive'
                        }`}></div>
                        <div>
                          <span className="font-medium capitalize">{manutencao.tipo}</span>
                          {manutencao.descricao && (
                            <p className="text-sm text-muted-foreground">{manutencao.descricao}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">
                          {new Date(manutencao.dataAgendada).toLocaleDateString('pt-BR')}
                        </span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {manutencao.status === 'concluida' ? 'Concluída' : 
                           manutencao.status === 'agendada' ? 'Agendada' : 'Cancelada'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Fotos do Equipamento */}
          {equipamento.fotos && equipamento.fotos.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Fotos do Equipamento
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {equipamento.fotos.map((foto, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-center mt-1 text-muted-foreground">
                      Foto {index + 1}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documentos */}
          {equipamento.documentos && equipamento.documentos.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documentos Anexos
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {equipamento.documentos.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <div>
                        <p className="text-sm font-medium">Documento {index + 1}</p>
                        <p className="text-xs text-muted-foreground">PDF</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Observações */}
          {equipamento.observacoes && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Observações</h4>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p>{equipamento.observacoes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisualizarEquipamentoModal;