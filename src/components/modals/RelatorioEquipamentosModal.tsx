import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, User, Package, Activity } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";

interface RelatorioEquipamentosModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RelatorioEquipamentosModal = ({ open, onOpenChange }: RelatorioEquipamentosModalProps) => {
  const { toast } = useToast();
  const { state } = useData();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateRelatorio = async (format: 'pdf' | 'excel') => {
    setIsGenerating(true);
    
    // Simulate generating report
    setTimeout(() => {
      toast({
        title: "Relatório gerado",
        description: `Relatório de equipamentos gerado em ${format.toUpperCase()} com sucesso`,
      });
      setIsGenerating(false);
      
      // Here would be the actual file download logic
      console.log(`Downloading equipment report in ${format} format`);
    }, 2000);
  };

  const today = new Date().toLocaleDateString('pt-BR');
  const responsavel = "Administrador do Sistema";

  // Estatísticas dos equipamentos
  const totalEquipamentos = state.equipamentos.length;
  const equipamentosAtivos = state.equipamentos.filter(eq => eq.situacao === 'ativo').length;
  const equipamentosManutencao = state.equipamentos.filter(eq => eq.situacao === 'manutencao').length;
  const equipamentosInativos = state.equipamentos.filter(eq => eq.situacao === 'inativo').length;

  // Próximas manutenções
  const proximasManutencoes = state.manutencoes.filter(m => m.status === 'agendada').length;
  const manutencoesConcluidas = state.manutencoes.filter(m => m.status === 'concluida').length;

  // Equipamentos por tipo
  const equipamentosPorTipo = state.equipamentos.reduce((acc, eq) => {
    acc[eq.tipo] = (acc[eq.tipo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "extintor": return "Extintores";
      case "alarme": return "Sistemas de Alarme";
      case "luz_emergencia": return "Luzes de Emergência";
      case "porta_corta_fogo": return "Portas Corta-Fogo";
      case "outro": return "Outros";
      default: return tipo;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Relatório de Equipamentos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Relatório */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Informações do Relatório
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

          {/* Resumo Geral */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Resumo Geral
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{totalEquipamentos}</p>
                    <p className="text-sm text-muted-foreground">Total de Equipamentos</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{equipamentosAtivos}</p>
                    <p className="text-sm text-muted-foreground">Ativos</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-warning">{equipamentosManutencao}</p>
                    <p className="text-sm text-muted-foreground">Em Manutenção</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-destructive">{equipamentosInativos}</p>
                    <p className="text-sm text-muted-foreground">Inativos</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Equipamentos por Tipo */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Equipamentos por Tipo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(equipamentosPorTipo).map(([tipo, quantidade]) => (
                <Card key={tipo} className="bg-gradient-card border-0 shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{getTipoLabel(tipo)}</span>
                      <Badge variant="outline">{quantidade}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Estatísticas de Manutenção */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Manutenções
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-warning">{proximasManutencoes}</p>
                    <p className="text-sm text-muted-foreground">Manutenções Agendadas</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{manutencoesConcluidas}</p>
                    <p className="text-sm text-muted-foreground">Manutenções Concluídas</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Lista de Equipamentos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Lista de Equipamentos</h3>
            <div className="bg-muted/30 rounded-lg max-h-64 overflow-y-auto">
              <div className="space-y-2 p-4">
                {state.equipamentos.map((equipamento) => (
                  <div key={equipamento.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{equipamento.nome}</p>
                      <p className="text-sm text-muted-foreground">{equipamento.localInstalacao}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getTipoLabel(equipamento.tipo).slice(0, -1)}
                      </Badge>
                      <Badge
                        variant={
                          equipamento.situacao === 'ativo' ? 'secondary' :
                          equipamento.situacao === 'manutencao' ? 'outline' : 'destructive'
                        }
                        className={
                          equipamento.situacao === 'ativo' ? 'bg-success/20 text-success border-success/30' :
                          equipamento.situacao === 'manutencao' ? 'bg-warning/20 text-warning border-warning/30' : ''
                        }
                      >
                        {equipamento.situacao === 'ativo' ? 'Ativo' :
                         equipamento.situacao === 'manutencao' ? 'Manutenção' : 'Inativo'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Opções de Download */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Exportar Relatório
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleGenerateRelatorio('pdf')}
                  disabled={isGenerating}
                  className="h-20 flex-col gap-2"
                >
                  <FileText className="w-6 h-6" />
                  <div className="text-center">
                    <p className="font-medium">Relatório PDF</p>
                    <p className="text-xs opacity-90">Relatório completo com gráficos</p>
                  </div>
                </Button>

                <Button 
                  onClick={() => handleGenerateRelatorio('excel')}
                  disabled={isGenerating}
                  variant="outline"
                  className="h-20 flex-col gap-2"
                >
                  <Download className="w-6 h-6" />
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
                    <span className="text-sm text-muted-foreground">Gerando relatório...</span>
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

export default RelatorioEquipamentosModal;