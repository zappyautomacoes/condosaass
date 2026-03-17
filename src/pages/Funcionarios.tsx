import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users,
  UserCheck,
  Clock,
  AlertTriangle,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Activity
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Funcionarios = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const funcionarios = [
    {
      id: 1,
      nome: "João Silva",
      cargo: "Zelador",
      departamento: "Manutenção",
      status: "ativo",
      telefone: "(11) 99999-1234",
      email: "joao.silva@administre.com",
      dataAdmissao: "2020-03-15",
      salario: "R$ 2.800,00",
      avatar: "/api/placeholder/40/40",
      avaliacao: 4.5,
      presenca: 96,
      tarefasConcluidas: 145,
      certificacoes: ["Segurança do Trabalho", "Manutenção Predial"],
      horario: "06:00 - 14:00",
      localTrabalho: "Edifício Principal"
    },
    {
      id: 2,
      nome: "Maria Santos",
      cargo: "Faxineira",
      departamento: "Limpeza",
      status: "ativo",
      telefone: "(11) 99999-5678",
      email: "maria.santos@administre.com",
      dataAdmissao: "2019-08-22",
      salario: "R$ 1.800,00",
      avatar: "/api/placeholder/40/40",
      avaliacao: 4.8,
      presenca: 98,
      tarefasConcluidas: 289,
      certificacoes: ["Produtos Químicos", "Técnicas de Limpeza"],
      horario: "08:00 - 17:00",
      localTrabalho: "Todas as áreas"
    },
    {
      id: 3,
      nome: "Carlos Pereira",
      cargo: "Porteiro",
      departamento: "Segurança",
      status: "ativo",
      telefone: "(11) 99999-9012",
      email: "carlos.pereira@administre.com",
      dataAdmissao: "2021-01-10",
      salario: "R$ 2.200,00",
      avatar: "/api/placeholder/40/40",
      avaliacao: 4.3,
      presenca: 94,
      tarefasConcluidas: 78,
      certificacoes: ["Vigilância Patrimonial"],
      horario: "14:00 - 22:00",
      localTrabalho: "Portaria Principal"
    },
    {
      id: 4,
      nome: "Ana Costa",
      cargo: "Auxiliar de Limpeza",
      departamento: "Limpeza",
      status: "ferias",
      telefone: "(11) 99999-3456",
      email: "ana.costa@condosaas.com",
      dataAdmissao: "2022-06-18",
      salario: "R$ 1.600,00",
      avatar: "/api/placeholder/40/40",
      avaliacao: 4.2,
      presenca: 92,
      tarefasConcluidas: 156,
      certificacoes: ["Higienização"],
      horario: "06:00 - 14:00",
      localTrabalho: "Áreas Comuns"
    },
    {
      id: 5,
      nome: "Pedro Oliveira",
      cargo: "Técnico de Manutenção",
      departamento: "Manutenção",
      status: "ativo",
      telefone: "(11) 99999-7890",
      email: "pedro.oliveira@condosaas.com",
      dataAdmissao: "2018-11-05",
      salario: "R$ 3.500,00",
      avatar: "/api/placeholder/40/40",
      avaliacao: 4.7,
      presenca: 97,
      tarefasConcluidas: 234,
      certificacoes: ["Elétrica Predial", "Hidráulica", "Elevadores"],
      horario: "08:00 - 17:00",
      localTrabalho: "Todas as instalações"
    }
  ];

  const pontoEletronico = [
    {
      id: 1,
      funcionarioId: 1,
      data: "2024-01-15",
      entrada: "06:00",
      saidaAlmoco: "12:00",
      voltaAlmoco: "13:00",
      saida: "14:05",
      horasExtras: "00:05",
      status: "normal"
    },
    {
      id: 2,
      funcionarioId: 2,
      data: "2024-01-15",
      entrada: "07:55",
      saidaAlmoco: "12:00",
      voltaAlmoco: "13:00",
      saida: "17:00",
      horasExtras: "00:00",
      status: "normal"
    },
    {
      id: 3,
      funcionarioId: 3,
      data: "2024-01-15",
      entrada: "14:00",
      saidaAlmoco: "-",
      voltaAlmoco: "-",
      saida: "22:00",
      horasExtras: "00:00",
      status: "normal"
    }
  ];

  const treinamentos = [
    {
      id: 1,
      titulo: "Segurança do Trabalho - Atualização",
      descricao: "Atualização anual obrigatória sobre normas de segurança",
      dataInicio: "2024-02-01",
      dataFim: "2024-02-15",
      status: "agendado",
      participantes: [1, 3, 5],
      instrutor: "SESMT Consultoria",
      cargaHoraria: "20h"
    },
    {
      id: 2,
      titulo: "Atendimento ao Cliente",
      descricao: "Técnicas de comunicação e relacionamento com moradores",
      dataInicio: "2024-01-20",
      dataFim: "2024-01-22",
      status: "em_andamento",
      participantes: [3, 4],
      instrutor: "Instituto de Qualificação",
      cargaHoraria: "16h"
    },
    {
      id: 3,
      titulo: "Manuseio de Produtos Químicos",
      descricao: "Uso seguro de produtos de limpeza e manutenção",
      dataInicio: "2024-01-10",
      dataFim: "2024-01-12",
      status: "concluido",
      participantes: [2, 4],
      instrutor: "EcoLimp Treinamentos",
      cargaHoraria: "12h"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-success/10 text-success border-success/20';
      case 'ferias': return 'bg-primary/10 text-primary border-primary/20';
      case 'afastado': return 'bg-warning/10 text-warning border-warning/20';
      case 'inativo': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 4.5) return 'text-success';
    if (score >= 4.0) return 'text-primary';
    if (score >= 3.5) return 'text-warning';
    return 'text-destructive';
  };

  const filteredFuncionarios = funcionarios.filter(funcionario =>
    funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    funcionario.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    funcionario.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Funcionários</h1>
            <p className="text-muted-foreground mt-1">
              Controle completo de equipe, desempenho e desenvolvimento profissional
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button className="gap-2 bg-gradient-primary">
              <Plus className="h-4 w-4" />
              Novo Funcionário
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Funcionários</p>
                  <p className="text-2xl font-bold text-primary">12</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Presença Média</p>
                  <p className="text-2xl font-bold text-success">95%</p>
                </div>
                <UserCheck className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avaliação Média</p>
                  <p className="text-2xl font-bold text-warning">4.3</p>
                </div>
                <Star className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Treinamentos Ativos</p>
                  <p className="text-2xl font-bold text-accent">3</p>
                </div>
                <Award className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar funcionários por nome, cargo ou departamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="equipe" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="equipe">Equipe</TabsTrigger>
            <TabsTrigger value="ponto">Ponto Eletrônico</TabsTrigger>
            <TabsTrigger value="treinamentos">Treinamentos</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="equipe" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFuncionarios.map((funcionario) => (
                <Card key={funcionario.id} className="bg-gradient-card border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={funcionario.avatar} />
                          <AvatarFallback>{funcionario.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">{funcionario.nome}</h3>
                          <p className="text-sm text-muted-foreground">{funcionario.cargo}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge variant="outline" className={getStatusColor(funcionario.status)}>
                          {funcionario.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Departamento:</span>
                        <span className="text-sm font-medium">{funcionario.departamento}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Avaliação:</span>
                        <div className="flex items-center gap-1">
                          <Star className={`h-4 w-4 ${getPerformanceColor(funcionario.avaliacao)}`} />
                          <span className={`text-sm font-medium ${getPerformanceColor(funcionario.avaliacao)}`}>
                            {funcionario.avaliacao}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Presença:</span>
                          <span className="text-sm font-medium">{funcionario.presenca}%</span>
                        </div>
                        <Progress value={funcionario.presenca} className="h-2" />
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {funcionario.telefone}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {funcionario.horario}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Perfil
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ponto" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Ponto Eletrônico - Hoje
                </CardTitle>
                <CardDescription>
                  Registro de entrada e saída dos funcionários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pontoEletronico.map((ponto) => {
                    const funcionario = funcionarios.find(f => f.id === ponto.funcionarioId);
                    return (
                      <div key={ponto.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={funcionario?.avatar} />
                            <AvatarFallback>{funcionario?.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{funcionario?.nome}</p>
                            <p className="text-sm text-muted-foreground">{funcionario?.cargo}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <p className="text-xs text-muted-foreground">Entrada</p>
                            <p className="font-mono text-sm">{ponto.entrada}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Almoço</p>
                            <p className="font-mono text-sm">{ponto.saidaAlmoco} - {ponto.voltaAlmoco}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Saída</p>
                            <p className="font-mono text-sm">{ponto.saida}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">H. Extras</p>
                            <p className="font-mono text-sm">{ponto.horasExtras}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="treinamentos" className="space-y-6">
            <div className="space-y-4">
              {treinamentos.map((treinamento) => (
                <Card key={treinamento.id} className="bg-gradient-card border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">{treinamento.titulo}</h3>
                        <p className="text-sm text-muted-foreground">{treinamento.descricao}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {treinamento.dataInicio} a {treinamento.dataFim}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {treinamento.cargaHoraria}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {treinamento.participantes.length} participantes
                          </span>
                        </div>
                        
                        <p className="text-sm">
                          <span className="text-muted-foreground">Instrutor:</span> {treinamento.instrutor}
                        </p>
                      </div>
                      
                      <Badge variant="outline" className={
                        treinamento.status === 'concluido' ? 'text-success' :
                        treinamento.status === 'em_andamento' ? 'text-primary' : 'text-warning'
                      }>
                        {treinamento.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {funcionarios
                    .sort((a, b) => b.avaliacao - a.avaliacao)
                    .slice(0, 5)
                    .map((funcionario, index) => (
                    <div key={funcionario.id} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-warning text-warning-foreground' :
                        index === 1 ? 'bg-muted text-muted-foreground' :
                        index === 2 ? 'bg-accent text-accent-foreground' :
                        'bg-muted/50 text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={funcionario.avatar} />
                        <AvatarFallback className="text-xs">{funcionario.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{funcionario.nome}</p>
                        <p className="text-xs text-muted-foreground">{funcionario.cargo}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-warning" />
                          <span className="text-sm font-medium">{funcionario.avaliacao}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Métricas Gerais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Produtividade Geral</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Satisfação da Equipe</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Taxa de Retenção</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">18</p>
                      <p className="text-xs text-muted-foreground">Dias sem acidentes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">156</p>
                      <p className="text-xs text-muted-foreground">Tarefas concluídas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Funcionarios;