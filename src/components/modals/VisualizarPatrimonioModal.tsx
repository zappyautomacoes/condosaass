import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package, MapPin, Calendar, DollarSign, Building, CheckCircle2, Wrench, AlertTriangle, FileText, Download, Camera } from "lucide-react";
import { PatrimonioItem } from "@/contexts/DataContext";

interface VisualizarPatrimonioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: PatrimonioItem | null;
}

const VisualizarPatrimonioModal = ({ open, onOpenChange, item }: VisualizarPatrimonioModalProps) => {
  if (!item) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge variant="secondary" className="gap-1 bg-success/20 text-success border-success/30"><CheckCircle2 className="w-3 h-3" />Ativo</Badge>;
      case "manutencao":
        return <Badge variant="secondary" className="gap-1 bg-warning/20 text-warning border-warning/30"><Wrench className="w-3 h-3" />Manutenção</Badge>;
      case "baixado":
        return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Baixado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "border-success/20 bg-success/5";
      case "manutencao":
        return "border-warning/20 bg-warning/5";
      case "baixado":
        return "border-destructive/20 bg-destructive/5";
      default:
        return "border-border/20 bg-muted/5";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Ficha do Patrimônio
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header com Avatar e Informações Básicas */}
          <div className={`p-6 rounded-lg border ${getStatusColor(item.status)}`}>
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=${item.nome}`} />
                <AvatarFallback className="text-lg">
                  {item.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-foreground">{item.nome}</h3>
                  {getStatusBadge(item.status)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Plaqueta</p>
                      <Badge variant="outline" className="font-mono text-sm">
                        {item.numeroPlaqueta}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Localização</p>
                      <p className="font-medium">{item.localFisico}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Valor de Aquisição</p>
                      <p className="font-medium text-success">R$ {item.valorAquisicao.toLocaleString('pt-BR')}</p>
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
                <Building className="w-5 h-5" />
                Informações Gerais
              </h4>
              
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Categoria</label>
                  <p className="font-medium">{item.categoria}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Fornecedor</label>
                  <p>{item.fornecedor}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data de Aquisição</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(item.dataAquisicao).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                
                {item.garantia && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Garantia</label>
                    <p>{item.garantia}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Histórico de Manutenção
              </h4>
              
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                {item.ultimaManutencao && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Última Manutenção</label>
                    <p className="font-medium">
                      {new Date(item.ultimaManutencao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                )}
                
                {item.proximaManutencao && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Próxima Manutenção</label>
                    <p className="font-medium">
                      {new Date(item.proximaManutencao).toLocaleDateString('pt-BR')}
                    </p>
                    {item.proximaManutencao && (
                      <p className="text-sm text-muted-foreground">
                        {Math.ceil((new Date(item.proximaManutencao).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} dias
                      </p>
                    )}
                  </div>
                )}
                
                {!item.ultimaManutencao && !item.proximaManutencao && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhuma manutenção programada
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Fotos do Item */}
          {item.fotos && item.fotos.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Fotos do Item
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {item.fotos.map((foto, index) => (
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
          {item.documentos && item.documentos.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documentos Anexos
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {item.documentos.map((doc, index) => (
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
          {item.observacoes && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Observações</h4>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p>{item.observacoes}</p>
              </div>
            </div>
          )}

          {/* Histórico de Movimentações */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Histórico de Movimentações</h4>
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="font-medium">Item adquirido</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(item.dataAquisicao).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                {item.ultimaManutencao && (
                  <div className="flex items-center justify-between pb-2 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span className="font-medium">Manutenção realizada</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(item.ultimaManutencao).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                )}
                
                {item.status === 'baixado' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span className="font-medium">Item baixado</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Data não informada
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
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

export default VisualizarPatrimonioModal;