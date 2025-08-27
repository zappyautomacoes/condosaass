import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Download, Share, Calendar, User, AlertTriangle, CheckCircle2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Documento } from "@/contexts/DataContext";

interface VisualizarDocumentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documento: Documento | null;
}

const VisualizarDocumentoModal = ({ open, onOpenChange, documento }: VisualizarDocumentoModalProps) => {
  const { toast } = useToast();

  if (!documento) return null;

  const getStatusBadge = (status: string, dataVencimento: string | null) => {
    if (dataVencimento) {
      const hoje = new Date();
      const vencimento = new Date(dataVencimento);
      const diasRestantes = Math.ceil((vencimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
      
      if (diasRestantes < 0) {
        return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Vencido</Badge>;
      }
      if (diasRestantes <= 30) {
        return <Badge variant="secondary" className="gap-1 bg-warning/20 text-warning border-warning/30"><Calendar className="w-3 h-3" />Vence em {diasRestantes}d</Badge>;
      }
    }
    return <Badge variant="secondary" className="gap-1 bg-success/20 text-success border-success/30"><CheckCircle2 className="w-3 h-3" />Ativo</Badge>;
  };

  const getStatusColor = (status: string, dataVencimento: string | null) => {
    if (dataVencimento) {
      const hoje = new Date();
      const vencimento = new Date(dataVencimento);
      const diasRestantes = Math.ceil((vencimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
      
      if (diasRestantes < 0) {
        return "border-destructive/20 bg-destructive/5";
      }
      if (diasRestantes <= 30) {
        return "border-warning/20 bg-warning/5";
      }
    }
    return "border-success/20 bg-success/5";
  };

  const handleDownload = () => {
    // Simular download do PDF
    toast({
      title: "Download iniciado",
      description: `Baixando ${documento.nome}...`,
    });
    console.log('Download do documento:', documento.id);
  };

  const handleShare = () => {
    // Simular compartilhamento
    toast({
      title: "Link copiado",
      description: "Link de compartilhamento copiado para a área de transferência",
    });
    console.log('Compartilhando documento:', documento.id);
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Visualizar Documento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header com Avatar e Informações Básicas */}
          <div className={`p-6 rounded-lg border ${getStatusColor(documento.status, documento.dataVencimento)}`}>
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=${documento.nome}`} />
                <AvatarFallback className="text-lg">
                  <FileText className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-foreground">{documento.nome}</h3>
                  {getStatusBadge(documento.status, documento.dataVencimento)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <Badge variant="outline">{documento.tipo}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Categoria</p>
                      <p className="font-medium">{documento.categoria}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tamanho</p>
                      <p className="font-medium">{formatFileSize(documento.tamanho)}</p>
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
                <FileText className="w-5 h-5" />
                Informações do Documento
              </h4>
              
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data de Upload</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(documento.dataUpload).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                
                {documento.dataVencimento && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Data de Vencimento</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{new Date(documento.dataVencimento).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Enviado por</label>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{documento.uploadedBy}</span>
                  </div>
                </div>

                {documento.responsavel && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Responsável</label>
                    <p>{documento.responsavel}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Share className="w-5 h-5" />
                Compartilhamento e Acesso
              </h4>
              
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status de Compartilhamento</label>
                  <div className="flex items-center gap-2">
                    {documento.compartilhado ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-success">Compartilhado</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span>Privado</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total de Downloads</label>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-muted-foreground" />
                    <span>{documento.downloads} downloads</span>
                  </div>
                </div>

                {documento.tags && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tags</label>
                    <p>{documento.tags}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Descrição */}
          {documento.descricao && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Descrição</h4>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p>{documento.descricao}</p>
              </div>
            </div>
          )}

          {/* Preview do Documento (simulado) */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Preview do Documento</h4>
            <div className="bg-muted/30 p-8 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center min-h-[200px]">
              <FileText className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">{documento.nome}</p>
              <p className="text-sm text-muted-foreground mb-4">
                {documento.tipo} • {documento.tamanho}
              </p>
              <Button onClick={handleDownload} className="gap-2">
                <Download className="w-4 h-4" />
                Baixar Documento
              </Button>
            </div>
          </div>

          {/* Histórico de Acessos (simulado) */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Histórico de Acessos</h4>
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="font-medium">Documento enviado</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(documento.dataUpload).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pb-2 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="font-medium">Primeiro download</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(documento.dataUpload).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                {documento.compartilhado && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span className="font-medium">Documento compartilhado</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(documento.dataUpload).toLocaleDateString('pt-BR')}
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
            <Button variant="outline" onClick={handleShare} className="gap-2">
              <Share className="w-4 h-4" />
              Compartilhar
            </Button>
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisualizarDocumentoModal;