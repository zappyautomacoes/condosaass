import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Filter, Calendar, FileText, User, X } from "lucide-react";
import { useState, useEffect } from "react";

interface FiltroDocumentosModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: any) => void;
  currentFilters: any;
}

const FiltroDocumentosModal = ({ open, onOpenChange, onApplyFilters, currentFilters }: FiltroDocumentosModalProps) => {
  const [filters, setFilters] = useState({
    categoria: "",
    dataUploadInicio: "",
    dataUploadFim: "",
    dataVencimentoInicio: "",
    dataVencimentoFim: "",
    responsavel: "",
    status: [] as string[],
    compartilhado: null as boolean | null,
    tamanhoMin: "",
    tamanhoMax: "",
    tipo: ""
  });

  useEffect(() => {
    if (currentFilters) {
      const defaultFilters = {
        categoria: "",
        dataUploadInicio: "",
        dataUploadFim: "",
        dataVencimentoInicio: "",
        dataVencimentoFim: "",
        responsavel: "",
        status: [] as string[],
        compartilhado: null as boolean | null,
        tamanhoMin: "",
        tamanhoMax: "",
        tipo: ""
      };
      
      setFilters({
        ...defaultFilters,
        ...currentFilters,
        status: Array.isArray(currentFilters.status) ? currentFilters.status : [] // Ensure status is always an array
      });
    }
  }, [currentFilters, open]);

  const categorias = [
    "Atas", "Licenças", "Contratos", "Seguros", "Alvarás", "Outros"
  ];

  const statusOptions = [
    { value: "ativo", label: "Ativo" },
    { value: "vencendo", label: "Vencendo" },
    { value: "vencido", label: "Vencido" }
  ];

  const responsaveis = [
    "João Silva", "Maria Santos", "Carlos Lima", "Ana Costa"
  ];

  const tipos = [
    "PDF", "DOC", "DOCX", "XLS", "XLSX", "JPG", "PNG"
  ];

  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      setFilters(prev => ({ ...prev, status: [...prev.status, status] }));
    } else {
      setFilters(prev => ({ ...prev, status: prev.status.filter(s => s !== status) }));
    }
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onOpenChange(false);
  };

  const handleClear = () => {
    const emptyFilters = {
      categoria: "",
      dataUploadInicio: "",
      dataUploadFim: "",
      dataVencimentoInicio: "",
      dataVencimentoFim: "",
      responsavel: "",
      status: [],
      compartilhado: null,
      tamanhoMin: "",
      tamanhoMax: "",
      tipo: ""
    };
    setFilters(emptyFilters);
    onApplyFilters(emptyFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categoria) count++;
    if (filters.dataUploadInicio || filters.dataUploadFim) count++;
    if (filters.dataVencimentoInicio || filters.dataVencimentoFim) count++;
    if (filters.responsavel) count++;
    if (filters.status.length > 0) count++;
    if (filters.compartilhado !== null) count++;
    if (filters.tamanhoMin || filters.tamanhoMax) count++;
    if (filters.tipo) count++;
    return count;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros Avançados
            {getActiveFiltersCount() > 0 && (
              <Badge variant="default" className="ml-2">
                {getActiveFiltersCount()} filtro{getActiveFiltersCount() > 1 ? 's' : ''} ativo{getActiveFiltersCount() > 1 ? 's' : ''}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Categoria */}
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={filters.categoria} onValueChange={(value) => setFilters(prev => ({ ...prev, categoria: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Data de Upload */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Data de Upload
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataUploadInicio" className="text-sm">De</Label>
                <Input
                  id="dataUploadInicio"
                  type="date"
                  value={filters.dataUploadInicio}
                  onChange={(e) => setFilters(prev => ({ ...prev, dataUploadInicio: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataUploadFim" className="text-sm">Até</Label>
                <Input
                  id="dataUploadFim"
                  type="date"
                  value={filters.dataUploadFim}
                  onChange={(e) => setFilters(prev => ({ ...prev, dataUploadFim: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Data de Vencimento */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Data de Vencimento
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataVencimentoInicio" className="text-sm">De</Label>
                <Input
                  id="dataVencimentoInicio"
                  type="date"
                  value={filters.dataVencimentoInicio}
                  onChange={(e) => setFilters(prev => ({ ...prev, dataVencimentoInicio: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataVencimentoFim" className="text-sm">Até</Label>
                <Input
                  id="dataVencimentoFim"
                  type="date"
                  value={filters.dataVencimentoFim}
                  onChange={(e) => setFilters(prev => ({ ...prev, dataVencimentoFim: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Responsável */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Responsável
            </Label>
            <Select value={filters.responsavel} onValueChange={(value) => setFilters(prev => ({ ...prev, responsavel: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um responsável" />
              </SelectTrigger>
              <SelectContent>
                {responsaveis.map((responsavel) => (
                  <SelectItem key={responsavel} value={responsavel}>{responsavel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <div key={status.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={status.value}
                    checked={filters.status.includes(status.value)}
                    onCheckedChange={(checked) => handleStatusChange(status.value, checked as boolean)}
                  />
                  <Label htmlFor={status.value}>{status.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Compartilhamento */}
          <div className="space-y-2">
            <Label>Compartilhamento</Label>
            <Select 
              value={filters.compartilhado === null ? "" : filters.compartilhado.toString()} 
              onValueChange={(value) => 
                setFilters(prev => ({ 
                  ...prev, 
                  compartilhado: value === "" ? null : value === "true" 
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por compartilhamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Compartilhados</SelectItem>
                <SelectItem value="false">Privados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de Arquivo */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Tipo de Arquivo
            </Label>
            <Select value={filters.tipo} onValueChange={(value) => setFilters(prev => ({ ...prev, tipo: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                {tipos.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tamanho do Arquivo */}
          <div className="space-y-2">
            <Label>Tamanho do Arquivo (MB)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tamanhoMin" className="text-sm">Mínimo</Label>
                <Input
                  id="tamanhoMin"
                  type="number"
                  min="0"
                  step="0.1"
                  value={filters.tamanhoMin}
                  onChange={(e) => setFilters(prev => ({ ...prev, tamanhoMin: e.target.value }))}
                  placeholder="0.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tamanhoMax" className="text-sm">Máximo</Label>
                <Input
                  id="tamanhoMax"
                  type="number"
                  min="0"
                  step="0.1"
                  value={filters.tamanhoMax}
                  onChange={(e) => setFilters(prev => ({ ...prev, tamanhoMax: e.target.value }))}
                  placeholder="100.0"
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-between gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleClear}>
              <X className="w-4 h-4 mr-2" />
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

export default FiltroDocumentosModal;