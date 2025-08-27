import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Upload, X, RefreshCw, FileText } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useData, Contrato } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";

interface RenovarContratoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contrato: Contrato | null;
}

const RenovarContratoModal = ({ open, onOpenChange, contrato }: RenovarContratoModalProps) => {
  const { dispatch } = useData();
  const { toast } = useToast();
  const [novaDataTermino, setNovaDataTermino] = useState<Date | null>(null);
  const [novoValor, setNovoValor] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [arquivoPDF, setArquivoPDF] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contrato || !novaDataTermino) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const valorNumerico = novoValor ? parseFloat(novoValor.replace(/[^\d,]/g, '').replace(',', '.')) : contrato.valor;

    const hoje = new Date();
    const diasParaVencer = Math.ceil((novaDataTermino.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
    
    let status: 'ativo' | 'vencendo' | 'vencido' = 'ativo';
    if (diasParaVencer < 0) {
      status = 'vencido';
    } else if (diasParaVencer <= 30) {
      status = 'vencendo';
    }

    // Criar histórico de renovação
    const historicoRenovacao = {
      dataAnterior: contrato.dataTermino,
      dataNova: novaDataTermino.toISOString().split('T')[0],
      valorAnterior: contrato.valor,
      valorNovo: valorNumerico,
      dataRenovacao: hoje.toISOString().split('T')[0],
      observacoes: observacoes
    };

    const contratoRenovado: Contrato = {
      ...contrato,
      dataTermino: novaDataTermino.toISOString().split('T')[0],
      valor: valorNumerico,
      status,
      diasParaVencer,
      observacoes: observacoes ? `${contrato.observacoes || ''}\n\n[RENOVAÇÃO ${format(hoje, "dd/MM/yyyy", { locale: ptBR })}]: ${observacoes}` : contrato.observacoes,
      arquivoPDF: arquivoPDF ? URL.createObjectURL(arquivoPDF) : contrato.arquivoPDF
    };

    dispatch({ type: 'UPDATE_CONTRATO', payload: contratoRenovado });

    toast({
      title: "Sucesso",
      description: "Contrato renovado com sucesso!",
    });

    onOpenChange(false);
    
    // Reset form
    setNovaDataTermino(null);
    setNovoValor("");
    setObservacoes("");
    setArquivoPDF(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setArquivoPDF(file);
    } else {
      toast({
        title: "Erro",
        description: "Selecione apenas arquivos PDF.",
        variant: "destructive",
      });
    }
  };

  if (!contrato) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Renovar Contrato
          </DialogTitle>
        </DialogHeader>

        {/* Informações do Contrato Atual */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Contrato Atual</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Número: </span>
              <span className="font-medium">{contrato.numero}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Fornecedor: </span>
              <span className="font-medium">{contrato.fornecedor}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Término Atual: </span>
              <span className="font-medium">
                {new Date(contrato.dataTermino).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Valor Atual: </span>
              <span className="font-medium">R$ {contrato.valor.toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nova Data de Término *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {novaDataTermino ? format(novaDataTermino, "PPP", { locale: ptBR }) : "Selecione a nova data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={novaDataTermino || undefined}
                    onSelect={(date) => setNovaDataTermino(date || null)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="novoValor">Novo Valor (opcional)</Label>
              <Input
                id="novoValor"
                value={novoValor}
                onChange={(e) => setNovoValor(e.target.value)}
                placeholder={`Atual: R$ ${contrato.valor.toLocaleString('pt-BR')}`}
              />
              <p className="text-xs text-muted-foreground">
                Deixe em branco para manter o valor atual
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Upload da Nova Versão do Contrato (PDF)</Label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="arquivo"
              />
              <Label htmlFor="arquivo" className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent">
                  <Upload className="w-4 h-4" />
                  Selecionar Nova Versão PDF
                </div>
              </Label>
              {arquivoPDF && (
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{arquivoPDF.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setArquivoPDF(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Opcional: Faça upload da nova versão assinada do contrato
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações da Renovação</Label>
            <Textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Descreva as mudanças ou observações sobre esta renovação..."
              rows={3}
            />
          </div>

          {/* Resumo da Renovação */}
          {novaDataTermino && (
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h4 className="font-medium mb-2 text-primary">Resumo da Renovação</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Extensão do prazo:</span>
                  <span className="font-medium">
                    {Math.ceil((novaDataTermino.getTime() - new Date(contrato.dataTermino).getTime()) / (1000 * 3600 * 24))} dias
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Novo vencimento:</span>
                  <span className="font-medium">
                    {format(novaDataTermino, "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </div>
                {novoValor && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Alteração de valor:</span>
                    <span className="font-medium">
                      R$ {parseFloat(novoValor.replace(/[^\d,]/g, '').replace(',', '.')).toLocaleString('pt-BR')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Renovar Contrato
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenovarContratoModal;