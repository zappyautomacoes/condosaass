import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { useState, useEffect } from "react";

interface FiltroPatrimonioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilter: (filters: any) => void;
  currentFilters: any;
}

const FiltroPatrimonioModal = ({ open, onOpenChange, onApplyFilter, currentFilters }: FiltroPatrimonioModalProps) => {
  const [filters, setFilters] = useState({
    categoria: "",
    status: "",
    local: "",
    dataAquisicaoInicio: "",
    dataAquisicaoFim: "",
    valorMinimo: "",
    valorMaximo: ""
  });

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleApply = () => {
    onApplyFilter(filters);
    onOpenChange(false);
  };

  const handleClear = () => {
    const emptyFilters = {
      categoria: "",
      status: "",
      local: "",
      dataAquisicaoInicio: "",
      dataAquisicaoFim: "",
      valorMinimo: "",
      valorMaximo: ""
    };
    setFilters(emptyFilters);
    onApplyFilter(emptyFilters);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros de Patrimônio
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={filters.categoria} onValueChange={(value) => setFilters({...filters, categoria: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as categorias</SelectItem>
                  <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                  <SelectItem value="Equipamentos">Equipamentos</SelectItem>
                  <SelectItem value="Móveis">Móveis</SelectItem>
                  <SelectItem value="Ferramentas">Ferramentas</SelectItem>
                  <SelectItem value="Veículos">Veículos</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os status</SelectItem>
                  <SelectItem value="ativo">Ativo em bom uso</SelectItem>
                  <SelectItem value="manutencao">Em manutenção</SelectItem>
                  <SelectItem value="baixado">Quebrado para baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="local">Local</Label>
              <Input
                id="local"
                value={filters.local}
                onChange={(e) => setFilters({...filters, local: e.target.value})}
                placeholder="Filtrar por local..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataInicio">Data Aquisição - Início</Label>
              <Input
                id="dataInicio"
                type="date"
                value={filters.dataAquisicaoInicio}
                onChange={(e) => setFilters({...filters, dataAquisicaoInicio: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataFim">Data Aquisição - Fim</Label>
              <Input
                id="dataFim"
                type="date"
                value={filters.dataAquisicaoFim}
                onChange={(e) => setFilters({...filters, dataAquisicaoFim: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorMinimo">Valor Mínimo (R$)</Label>
              <Input
                id="valorMinimo"
                type="number"
                step="0.01"
                value={filters.valorMinimo}
                onChange={(e) => setFilters({...filters, valorMinimo: e.target.value})}
                placeholder="0,00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorMaximo">Valor Máximo (R$)</Label>
              <Input
                id="valorMaximo"
                type="number"
                step="0.01"
                value={filters.valorMaximo}
                onChange={(e) => setFilters({...filters, valorMaximo: e.target.value})}
                placeholder="0,00"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={handleClear} className="gap-2">
              <X className="w-4 h-4" />
              Limpar Filtros
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleApply}>
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FiltroPatrimonioModal;