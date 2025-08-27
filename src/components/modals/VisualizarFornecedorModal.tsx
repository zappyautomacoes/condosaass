import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, Phone, Mail, MapPin, Star, Calendar, DollarSign, FileText, Download } from "lucide-react";
import { Fornecedor } from "@/contexts/DataContext";

interface VisualizarFornecedorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fornecedor: Fornecedor | null;
}

const VisualizarFornecedorModal = ({ open, onOpenChange, fornecedor }: VisualizarFornecedorModalProps) => {
  if (!fornecedor) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-warning fill-warning' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Detalhes do Fornecedor
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header com Avatar e Informações Básicas */}
          <div className="flex items-start gap-4 p-6 bg-gradient-card rounded-lg border">
            <Avatar className="w-16 h-16">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${fornecedor.nome}`} />
              <AvatarFallback className="text-lg">
                {fornecedor.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-foreground">{fornecedor.nome}</h3>
                <Badge variant={fornecedor.status === 'ativo' ? 'default' : 'secondary'}>
                  {fornecedor.status === 'ativo' ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              
              <p className="text-lg text-muted-foreground mb-3">{fornecedor.areaServico}</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {renderStars(fornecedor.avaliacaoMedia)}
                  <span className="text-sm font-medium ml-1">{fornecedor.avaliacaoMedia}</span>
                </div>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{fornecedor.totalServicos} serviços</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm font-medium text-success">
                  R$ {fornecedor.valorTotal.toLocaleString('pt-BR')} total
                </span>
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Building className="w-5 h-5" />
                Dados da Empresa
              </h4>
              
              <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">CNPJ</label>
                  <p className="font-mono">{fornecedor.cnpj}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Pessoa de Contato</label>
                  <p>{fornecedor.contato}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{fornecedor.telefone}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{fornecedor.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Localização
              </h4>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p>{fornecedor.endereco}</p>
                    {fornecedor.cidade && fornecedor.estado && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {fornecedor.cidade} - {fornecedor.estado}
                        {fornecedor.cep && ` • CEP: ${fornecedor.cep}`}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium">Último Serviço</span>
              </div>
              <p className="text-lg font-bold">
                {new Date(fornecedor.ultimoServico).toLocaleDateString('pt-BR')}
              </p>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-success" />
                <span className="font-medium">Valor Médio</span>
              </div>
              <p className="text-lg font-bold text-success">
                R$ {Math.round(fornecedor.valorTotal / fornecedor.totalServicos).toLocaleString('pt-BR')}
              </p>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-warning" />
                <span className="font-medium">Avaliação</span>
              </div>
              <p className="text-lg font-bold text-warning">{fornecedor.avaliacaoMedia}/5.0</p>
            </div>
          </div>

          {/* Observações */}
          {fornecedor.observacoes && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Observações</h4>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p>{fornecedor.observacoes}</p>
              </div>
            </div>
          )}

          {/* Documentos */}
          {fornecedor.documentos && fornecedor.documentos.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documentos
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fornecedor.documentos.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">Documento {index + 1}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
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

export default VisualizarFornecedorModal;