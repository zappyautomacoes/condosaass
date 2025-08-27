import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Download, Calendar, DollarSign, Building, CheckCircle2, Clock, AlertTriangle, FileText, Bell, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Certificacao } from "@/contexts/DataContext";

interface VisualizarCertificacaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificacao: Certificacao | null;
}

const VisualizarCertificacaoModal = ({ open, onOpenChange, certificacao }: VisualizarCertificacaoModalProps) => {
  const { toast } = useToast();

  if (!certificacao) return null;

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
    if (status === "vencido" || dias < 0) {
      return "border-destructive/20 bg-destructive/5";
    }
    if (status === "vencendo" || dias <= 30) {
      return "border-warning/20 bg-warning/5";
    }
    return "border-success/20 bg-success/5";
  };

  const getPrioridadeAlerta = (dias: number) => {
    if (dias < 0) return "URGENTE";
    if (dias <= 15) return "ALTA";
    if (dias <= 30) return "MÉDIA";
    return "BAIXA";
  };

  const handleDownload = () => {
    // Simular download do PDF
    toast({
      title: "Download iniciado",
      description: `Baixando certificado ${certificacao.tipo}...`,
    });
    console.log('Download da certificação:', certificacao.id);
  };

  const handleRenovacao = () => {
    toast({
      title: "Processo de renovação",
      description: "Processo de renovação será iniciado",
    });
    console.log('Renovando certificação:', certificacao.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Detalhes da Certificação
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header com Avatar e Informações Básicas */}
          <div className={`p-6 rounded-lg border ${getStatusColor(certificacao.status, certificacao.diasParaVencer)}`}>
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=${certificacao.tipo}`} />
                <AvatarFallback className="text-lg">
                  <Award className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-foreground">{certificacao.tipo}</h3>
                  {getStatusBadge(certificacao.status, certificacao.diasParaVencer)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Órgão Emissor</p>
                      <p className="font-medium">{certificacao.orgaoEmissor}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Número</p>
                      <Badge variant="outline" className="font-mono text-sm">
                        {certificacao.numeroDocumento}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Valor Renovação</p>
                      <p className="font-medium text-primary">R$ {certificacao.valorRenovacao.toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alerta de Vencimento */}
          {certificacao.diasParaVencer <= 60 && (
            <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-warning" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">Alerta de Vencimento</p>
                    <Badge variant="destructive" className="text-xs">
                      {getPrioridadeAlerta(certificacao.diasParaVencer)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {certificacao.diasParaVencer < 0 
                      ? `Vencido há ${Math.abs(certificacao.diasParaVencer)} dias - Renovação urgente`
                      : `Vence em ${certificacao.diasParaVencer} dias`
                    }
                  </p>
                </div>
                <Button size="sm" onClick={handleRenovacao}>
                  Renovar Agora
                </Button>
              </div>
            </div>
          )}

          {/* Informações Detalhadas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Informações do Documento
              </h4>
              
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Categoria</label>
                  <Badge variant="outline">{certificacao.categoria}</Badge>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data de Emissão</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(certificacao.dataEmissao).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data de Vencimento</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(certificacao.dataVencimento).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Responsável</label>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{certificacao.responsavel}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Alertas e Renovação
              </h4>
              
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Alerta de Renovação</label>
                  <div className="flex items-center gap-2">
                    {certificacao.alertaRenovacao ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-success">Ativo</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>Inativo</span>
                      </>
                    )}
                  </div>
                </div>
                
                {certificacao.diasAntecedencia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Dias de Antecedência</label>
                    <p>{certificacao.diasAntecedencia}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Custo de Renovação</label>
                  <p className="font-medium text-primary">R$ {certificacao.valorRenovacao.toLocaleString('pt-BR')}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tempo até Vencimento</label>
                  <p className={`font-medium ${
                    certificacao.diasParaVencer < 0 ? 'text-destructive' :
                    certificacao.diasParaVencer <= 30 ? 'text-warning' : 'text-success'
                  }`}>
                    {certificacao.diasParaVencer < 0 
                      ? `Vencido há ${Math.abs(certificacao.diasParaVencer)} dias`
                      : `${certificacao.diasParaVencer} dias`
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Observações */}
          {certificacao.observacoes && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Observações</h4>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p>{certificacao.observacoes}</p>
              </div>
            </div>
          )}

          {/* Preview do Documento (simulado) */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Documento Anexado</h4>
            <div className="bg-muted/30 p-8 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center min-h-[200px]">
              <Award className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">{certificacao.tipo}</p>
              <p className="text-sm text-muted-foreground mb-4">
                {certificacao.numeroDocumento} • PDF
              </p>
              <Button onClick={handleDownload} className="gap-2">
                <Download className="w-4 h-4" />
                Baixar Certificado
              </Button>
            </div>
          </div>

          {/* Histórico */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Histórico da Certificação</h4>
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="font-medium">Certificação emitida</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(certificacao.dataEmissao).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                {certificacao.alertaRenovacao && (
                  <div className="flex items-center justify-between pb-2 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="font-medium">Alerta configurado</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {certificacao.diasAntecedencia} dias antes
                    </span>
                  </div>
                )}
                
                {certificacao.status === 'vencido' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span className="font-medium">Certificação vencida</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(certificacao.dataVencimento).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-between gap-3 pt-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
            {certificacao.diasParaVencer <= 60 && (
              <Button onClick={handleRenovacao} className="gap-2">
                <Bell className="w-4 h-4" />
                Renovar
              </Button>
            )}
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisualizarCertificacaoModal;