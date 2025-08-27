import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, FileText, Calendar, User } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface InventarioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patrimonio: any[];
}

const InventarioModal = ({ open, onOpenChange, patrimonio }: InventarioModalProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateInventario = async (format: 'pdf' | 'excel') => {
    setIsGenerating(true);
    
    // Simulate generating report
    setTimeout(() => {
      toast({
        title: "Inventário gerado",
        description: `Inventário completo gerado em ${format.toUpperCase()} com sucesso`,
      });
      setIsGenerating(false);
      
      // Here would be the actual file download logic
      console.log(`Downloading inventory in ${format} format`);
    }, 2000);
  };

  const today = new Date().toLocaleDateString('pt-BR');
  const responsavel = "Administrador do Sistema";

  const resumoInventario = {
    totalItens: patrimonio.length,
    itensAtivos: patrimonio.filter(item => item.status === 'ativo').length,
    itensManutencao: patrimonio.filter(item => item.status === 'manutencao').length,
    itensBaixados: patrimonio.filter(item => item.status === 'baixado').length,
    valorTotal: patrimonio
      .filter(item => item.status !== 'baixado')
      .reduce((total, item) => total + item.valorAquisicao, 0)
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Inventário Patrimonial
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Inventário */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Informações do Inventário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Data de Emissão:</span>
                  <Badge variant="outline">{today}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Responsável:</span>
                  <Badge variant="outline">{responsavel}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{resumoInventario.totalItens}</p>
                  <p className="text-sm text-muted-foreground">Total de Itens</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{resumoInventario.itensAtivos}</p>
                  <p className="text-sm text-muted-foreground">Itens Ativos</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">{resumoInventario.itensManutencao}</p>
                  <p className="text-sm text-muted-foreground">Em Manutenção</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    R$ {resumoInventario.valorTotal.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Opções de Download */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Exportar Inventário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleGenerateInventario('pdf')}
                  disabled={isGenerating}
                  className="h-20 flex-col gap-2"
                >
                  <FileText className="w-6 h-6" />
                  <div className="text-center">
                    <p className="font-medium">Relatório PDF</p>
                    <p className="text-xs opacity-90">Inventário completo com fotos</p>
                  </div>
                </Button>

                <Button 
                  onClick={() => handleGenerateInventario('excel')}
                  disabled={isGenerating}
                  variant="outline"
                  className="h-20 flex-col gap-2"
                >
                  <Upload className="w-6 h-6" />
                  <div className="text-center">
                    <p className="font-medium">Planilha Excel</p>
                    <p className="text-xs opacity-90">Dados para análise e edição</p>
                  </div>
                </Button>
              </div>

              {isGenerating && (
                <div className="text-center py-4">
                  <div className="inline-flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span className="text-sm text-muted-foreground">Gerando inventário...</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InventarioModal;