import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, DollarSign, User, Building, Download, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Contrato } from "@/contexts/DataContext";

interface VisualizarContratoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contrato: Contrato | null;
}

const VisualizarContratoModal = ({ open, onOpenChange, contrato }: VisualizarContratoModalProps) => {
  if (!contrato) return null;

  const getStatusBadge = (status: string, dias: number) => {
    if (status === "vencido" || dias < 0) {
      return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Vencido</Badge>;
    }
    if (status === "vencendo" || dias <= 30) {
      return <Badge variant="secondary" className="gap-1 bg-warning/20 text-warning border-warning/30"><Clock className="w-3 h-3" />Vencendo</Badge>;
    }
    return <Badge variant="secondary" className="gap-1 bg-success/20 text-success border-success/30"><CheckCircle2 className="w-3 h-3" />Ativo</Badge>;
  };

  const getStatusColor = (status: string, dias: number) => {
    if (status === "vencido" || dias < 0) return "border-destructive/20 bg-destructive/5";
    if (status === "vencendo" || dias <= 30) return "border-warning/20 bg-warning/5";
    return "border-success/20 bg-success/5";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Detalhes do Contrato
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header com Informações Principais */}
          <div className={`p-6 rounded-lg border ${getStatusColor(contrato.status, contrato.diasParaVencer)}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {contrato.titulo || contrato.numero}
                </h3>
                <p className="text-lg text-muted-foreground">{contrato.servico}</p>
              </div>
              {getStatusBadge(contrato.status, contrato.diasParaVencer)}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Número</p>
                  <p className="font-medium">{contrato.numero}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="font-medium text-success">R$ {contrato.valor.toLocaleString('pt-BR')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {contrato.diasParaVencer < 0 
                      ? `Vencido há ${Math.abs(contrato.diasParaVencer)} dias`
                      : `${contrato.diasParaVencer} dias para vencer`
                    }
                  </p>
                  <p className="font-medium">
                    {new Date(contrato.dataTermino).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Informações Detalhadas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Building className="w-5 h-5" />
                Informações do Fornecedor
              </h4>
              
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Fornecedor</label>
                  <p className="text-lg font-medium">{contrato.fornecedor}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tipo de Serviço</label>
                  <p>{contrato.tipoServico || contrato.servico}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Responsável</label>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{contrato.responsavel}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Vigência do Contrato
              </h4>
              
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Data de Início</label>
                    <p className="font-medium">
                      {new Date(contrato.dataInicio).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Data de Término</label>
                    <p className="font-medium">
                      {new Date(contrato.dataTermino).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Duração</label>
                  <p>
                    {Math.ceil((new Date(contrato.dataTermino).getTime() - new Date(contrato.dataInicio).getTime()) / (1000 * 3600 * 24))} dias
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Configurações Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h5 className="font-medium mb-3">Informações Financeiras</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valor Total</span>
                  <span className="font-medium">R$ {contrato.valor.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valor Mensal*</span>
                  <span className="font-medium">
                    R$ {Math.round(contrato.valor / 12).toLocaleString('pt-BR')}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * Estimativa baseada em 12 meses
                </p>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h5 className="font-medium mb-3">Configurações</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Alerta de Renovação</span>
                  <Badge variant={contrato.alertaRenovacao ? "default" : "secondary"}>
                    {contrato.alertaRenovacao ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                {contrato.alertaRenovacao && contrato.diasAntecedencia && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Antecedência</span>
                    <span className="text-sm">{contrato.diasAntecedencia} dias</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Observações */}
          {contrato.observacoes && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Observações</h4>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p>{contrato.observacoes}</p>
              </div>
            </div>
          )}

          {/* Documento do Contrato */}
          {contrato.arquivoPDF && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Documento do Contrato</h4>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">Contrato {contrato.numero}.pdf</p>
                    <p className="text-sm text-muted-foreground">
                      Documento assinado • PDF
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
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

export default VisualizarContratoModal;