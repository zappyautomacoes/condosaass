import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar as CalendarIcon,
  ClipboardList,
  Users,
  Wrench,
  Shield,
  Trash2,
  Plus,
  Eye,
  Edit,
  Filter,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const TarefasDiarias = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState("hoje");

  const tarefas = [
    {
      id: 1,
      titulo: "Limpeza da Piscina",
      categoria: "Limpeza",
      responsavel: "João Silva",
      horario: "08:00",
      status: "concluida",
      prioridade: "alta",
      descricao: "Limpeza completa da piscina com produtos químicos",
      tempo_estimado: "2h"
    },
    {
      id: 2,
      titulo: "Verificação dos Elevadores",
      categoria: "Manutenção",
      responsavel: "Técnico Otis",
      horario: "09:30",
      status: "em_andamento",
      prioridade: "alta",
      descricao: "Inspeção de rotina dos elevadores 1 e 2",
      tempo_estimado: "1h30"
    },
    {
      id: 3,
      titulo: "Jardinagem - Área Externa",
      categoria: "Jardinagem",
      responsavel: "Maria Santos",
      horario: "14:00",
      status: "pendente",
      prioridade: "media",
      descricao: "Poda das plantas e irrigação",
      tempo_estimado: "3h"
    },
    {
      id: 4,
      titulo: "Ronda de Segurança Noturna",
      categoria: "Segurança",
      responsavel: "Carlos Pereira",
      horario: "22:00",
      status: "pendente",
      prioridade: "alta",
      descricao: "Ronda completa das dependências",
      tempo_estimado: "4h"
    },
    {
      id: 5,
      titulo: "Limpeza Hall Principal",
      categoria: "Limpeza",
      responsavel: "Ana Costa",
      horario: "06:00",
      status: "atrasada",
      prioridade: "media",
      descricao: "Limpeza e enceramento do hall de entrada",
      tempo_estimado: "1h"
    }
  ];

  const funcionarios = [
    { id: 1, nome: "João Silva", especialidade: "Limpeza" },
    { id: 2, nome: "Maria Santos", especialidade: "Jardinagem" },
    { id: 3, nome: "Carlos Pereira", especialidade: "Segurança" },
    { id: 4, nome: "Ana Costa", especialidade: "Limpeza" },
    { id: 5, nome: "Pedro Oliveira", especialidade: "Manutenção" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluida': return 'bg-success/10 text-success border-success/20';
      case 'em_andamento': return 'bg-primary/10 text-primary border-primary/20';
      case 'pendente': return 'bg-warning/10 text-warning border-warning/20';
      case 'atrasada': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluida': return <CheckCircle2 className="h-4 w-4" />;
      case 'em_andamento': return <Clock className="h-4 w-4" />;
      case 'pendente': return <Clock className="h-4 w-4" />;
      case 'atrasada': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-destructive';
      case 'media': return 'bg-warning';
      case 'baixa': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'Limpeza': return <Trash2 className="h-4 w-4" />;
      case 'Manutenção': return <Wrench className="h-4 w-4" />;
      case 'Segurança': return <Shield className="h-4 w-4" />;
      case 'Jardinagem': return <Users className="h-4 w-4" />;
      default: return <ClipboardList className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tarefas Diárias</h1>
            <p className="text-muted-foreground mt-1">
              Gestão completa das atividades operacionais do condomínio
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Relatório
            </Button>
            <Button className="gap-2 bg-gradient-primary">
              <Plus className="h-4 w-4" />
              Nova Tarefa
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Concluídas</p>
                  <p className="text-2xl font-bold text-success">8</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                  <p className="text-2xl font-bold text-primary">3</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
                  <p className="text-2xl font-bold text-warning">5</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Atrasadas</p>
                  <p className="text-2xl font-bold text-destructive">2</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hoje">Hoje</TabsTrigger>
            <TabsTrigger value="semana">Esta Semana</TabsTrigger>
            <TabsTrigger value="calendario">Calendário</TabsTrigger>
            <TabsTrigger value="nova">Nova Tarefa</TabsTrigger>
          </TabsList>

          <TabsContent value="hoje" className="space-y-6">
            <div className="space-y-4">
              {tarefas.map((tarefa) => (
                <Card key={tarefa.id} className="bg-gradient-card border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex items-center gap-2">
                          {getCategoriaIcon(tarefa.categoria)}
                          <div className={`w-3 h-3 rounded-full ${getPrioridadeColor(tarefa.prioridade)}`} />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{tarefa.titulo}</h3>
                            <Badge variant="outline" className={getStatusColor(tarefa.status)}>
                              {getStatusIcon(tarefa.status)}
                              {tarefa.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">{tarefa.descricao}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {tarefa.horario}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {tarefa.responsavel}
                            </span>
                            <span>Tempo: {tarefa.tempo_estimado}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendario" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Calendário</CardTitle>
                  <CardDescription>Selecione uma data para ver as tarefas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    locale={ptBR}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2 bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>
                    Tarefas para {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tarefas.slice(0, 3).map((tarefa) => (
                    <div key={tarefa.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getCategoriaIcon(tarefa.categoria)}
                        <div>
                          <p className="font-medium">{tarefa.titulo}</p>
                          <p className="text-sm text-muted-foreground">{tarefa.horario} - {tarefa.responsavel}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(tarefa.status)}>
                        {tarefa.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="nova" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Criar Nova Tarefa</CardTitle>
                <CardDescription>
                  Defina uma nova tarefa para ser executada pelos funcionários
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título da Tarefa</Label>
                    <Input id="titulo" placeholder="Ex: Limpeza da piscina" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="limpeza">Limpeza</SelectItem>
                        <SelectItem value="manutencao">Manutenção</SelectItem>
                        <SelectItem value="seguranca">Segurança</SelectItem>
                        <SelectItem value="jardinagem">Jardinagem</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="responsavel">Responsável</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o funcionário" />
                      </SelectTrigger>
                      <SelectContent>
                        {funcionarios.map((funcionario) => (
                          <SelectItem key={funcionario.id} value={funcionario.id.toString()}>
                            {funcionario.nome} - {funcionario.especialidade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="prioridade">Prioridade</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="baixa">Baixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="data">Data</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(date) => date && setDate(date)}
                          locale={ptBR}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="horario">Horário</Label>
                    <Input id="horario" type="time" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea 
                    id="descricao" 
                    placeholder="Descreva os detalhes da tarefa..."
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-end gap-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button className="bg-gradient-primary">Criar Tarefa</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TarefasDiarias;