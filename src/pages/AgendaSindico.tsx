import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Plus,
  Eye,
  Edit,
  Bell,
  FileText,
  MessageSquare,
  Phone,
  Video
} from "lucide-react";
import { format, addDays, startOfWeek, endOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";

const AgendaSindico = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");

  const compromissos = [
    {
      id: 1,
      titulo: "Reunião com Administradora",
      tipo: "reuniao",
      data: new Date(),
      horario: "09:00",
      duracao: "1h30",
      local: "Sala de Reuniões",
      status: "confirmado",
      participantes: ["Ana Silva - Administradora", "Carlos Santos - Síndico"],
      descricao: "Discussão sobre orçamento 2024 e planejamento de obras",
      prioridade: "alta"
    },
    {
      id: 2,
      titulo: "Vistoria Elevadores",
      tipo: "vistoria",
      data: new Date(),
      horario: "14:00",
      duracao: "2h",
      local: "Elevadores 1 e 2",
      status: "pendente",
      participantes: ["Técnico Otis", "João Silva - Síndico"],
      descricao: "Inspeção mensal obrigatória dos elevadores",
      prioridade: "alta"
    },
    {
      id: 3,
      titulo: "Assembleia Ordinária",
      tipo: "assembleia",
      data: addDays(new Date(), 3),
      horario: "19:00",
      duracao: "3h",
      local: "Salão de Festas",
      status: "confirmado",
      participantes: ["Todos os condôminos"],
      descricao: "Apresentação de contas e votação do orçamento 2024",
      prioridade: "alta"
    },
    {
      id: 4,
      titulo: "Reunião com Fornecedores",
      tipo: "reuniao",
      data: addDays(new Date(), 1),
      horario: "10:30",
      duracao: "1h",
      local: "Online",
      status: "confirmado",
      participantes: ["Empresa de Limpeza", "Jardinagem Verde"],
      descricao: "Revisão de contratos e negociação de preços",
      prioridade: "media"
    },
    {
      id: 5,
      titulo: "Atendimento aos Moradores",
      tipo: "atendimento",
      data: addDays(new Date(), 2),
      horario: "15:00",
      duracao: "2h",
      local: "Administração",
      status: "confirmado",
      participantes: ["Moradores interessados"],
      descricao: "Plantão de atendimento semanal",
      prioridade: "media"
    }
  ];

  const tarefasRecorrentes = [
    {
      id: 1,
      titulo: "Verificação Bomba d'Água",
      frequencia: "Semanal - Segundas",
      horario: "08:00",
      responsavel: "João Silva",
      proxima: addDays(new Date(), 1)
    },
    {
      id: 2,
      titulo: "Inspeção de Segurança",
      frequencia: "Diário - 22:00",
      horario: "22:00",
      responsavel: "Segurança Noturna",
      proxima: new Date()
    },
    {
      id: 3,
      titulo: "Leitura de Medidores",
      frequencia: "Mensal - Dia 25",
      horario: "14:00",
      responsavel: "Zelador",
      proxima: addDays(new Date(), 7)
    }
  ];

  const alertas = [
    {
      id: 1,
      titulo: "Vencimento Seguro Predial",
      tipo: "documento",
      vencimento: addDays(new Date(), 15),
      status: "atencao"
    },
    {
      id: 2,
      titulo: "Renovação Contrato Limpeza",
      tipo: "contrato",
      vencimento: addDays(new Date(), 30),
      status: "normal"
    },
    {
      id: 3,
      titulo: "Assembleia Obrigatória",
      tipo: "legal",
      vencimento: addDays(new Date(), 45),
      status: "normal"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-success/10 text-success border-success/20';
      case 'pendente': return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelado': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'reuniao': return <Users className="h-4 w-4" />;
      case 'vistoria': return <Eye className="h-4 w-4" />;
      case 'assembleia': return <FileText className="h-4 w-4" />;
      case 'atendimento': return <MessageSquare className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getAlertaColor = (status: string) => {
    switch (status) {
      case 'urgente': return 'border-l-destructive';
      case 'atencao': return 'border-l-warning';
      case 'normal': return 'border-l-primary';
      default: return 'border-l-muted';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agenda do Síndico</h1>
            <p className="text-muted-foreground mt-1">
              Gerenciamento completo de compromissos e tarefas administrativas
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              Lembretes
            </Button>
            <Button className="gap-2 bg-gradient-primary">
              <Plus className="h-4 w-4" />
              Novo Compromisso
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hoje</p>
                  <p className="text-2xl font-bold text-primary">3</p>
                </div>
                <CalendarIcon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Esta Semana</p>
                  <p className="text-2xl font-bold text-success">12</p>
                </div>
                <Clock className="h-8 w-8 text-success" />
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
                <AlertCircle className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Alertas</p>
                  <p className="text-2xl font-bold text-destructive">3</p>
                </div>
                <Bell className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Calendário
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                locale={ptBR}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Compromissos */}
          <Card className="lg:col-span-2 bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle>
                Compromissos de {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
              </CardTitle>
              <CardDescription>
                {compromissos.filter(c => 
                  format(c.data, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                ).length} compromissos agendados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {compromissos
                .filter(c => format(c.data, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"))
                .map((compromisso) => (
                <div key={compromisso.id} className="p-4 bg-muted/20 rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        {getTipoIcon(compromisso.tipo)}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">{compromisso.titulo}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {compromisso.horario} ({compromisso.duracao})
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {compromisso.local}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{compromisso.descricao}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(compromisso.status)}>
                        {compromisso.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {compromisso.participantes.join(", ")}
                    </span>
                  </div>
                </div>
              ))}
              
              {compromissos.filter(c => 
                format(c.data, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
              ).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum compromisso agendado para este dia</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tabs para mais funcionalidades */}
        <Tabs defaultValue="tarefas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tarefas">Tarefas Recorrentes</TabsTrigger>
            <TabsTrigger value="alertas">Alertas e Vencimentos</TabsTrigger>
            <TabsTrigger value="relatorio">Relatório Semanal</TabsTrigger>
          </TabsList>

          <TabsContent value="tarefas" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Tarefas Recorrentes</CardTitle>
                <CardDescription>
                  Atividades programadas que se repetem automaticamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tarefasRecorrentes.map((tarefa) => (
                  <div key={tarefa.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">{tarefa.titulo}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{tarefa.frequencia}</span>
                        <span>{tarefa.responsavel}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Próxima:</p>
                      <p className="text-sm text-muted-foreground">
                        {format(tarefa.proxima, "dd/MM 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alertas" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Alertas e Vencimentos</CardTitle>
                <CardDescription>
                  Prazos importantes que requerem atenção
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {alertas.map((alerta) => (
                  <div key={alerta.id} className={`p-4 bg-muted/20 rounded-lg border-l-4 ${getAlertaColor(alerta.status)}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{alerta.titulo}</h3>
                        <p className="text-sm text-muted-foreground">
                          Vence em {format(alerta.vencimento, "dd/MM/yyyy", { locale: ptBR })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={
                          alerta.status === 'urgente' ? 'text-destructive' :
                          alerta.status === 'atencao' ? 'text-warning' : 'text-primary'
                        }>
                          {alerta.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relatorio" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Relatório Semanal</CardTitle>
                <CardDescription>
                  Resumo das atividades da semana
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
                    <p className="text-2xl font-bold text-success">18</p>
                    <p className="text-sm text-muted-foreground">Tarefas Concluídas</p>
                  </div>
                  
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">7</p>
                    <p className="text-sm text-muted-foreground">Reuniões Realizadas</p>
                  </div>
                  
                  <div className="text-center p-4 bg-warning/10 rounded-lg">
                    <AlertCircle className="h-8 w-8 text-warning mx-auto mb-2" />
                    <p className="text-2xl font-bold text-warning">3</p>
                    <p className="text-sm text-muted-foreground">Itens Pendentes</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Principais Realizações:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                      <span className="text-sm">Aprovação do orçamento 2024 em assembleia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                      <span className="text-sm">Renovação do contrato de segurança</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                      <span className="text-sm">Conclusão da manutenção preventiva dos elevadores</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgendaSindico;