import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar,
  Plus,
  Search,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { AgendarReservaModal } from "@/components/modals/AgendarReservaModal";
import { EditarReservaModal } from "@/components/modals/EditarReservaModal";
import { AprovarReservaModal } from "@/components/modals/AprovarReservaModal";
import { VisualizarAgendaModal } from "@/components/modals/VisualizarAgendaModal";

const espacos = [
  {
    id: 1,
    nome: "Salão de Festas",
    disponivel: true,
    proximaReserva: "25/12 - 19h",
    reservasHoje: 2
  },
  {
    id: 2,
    nome: "Churrasqueira",
    disponivel: false,  
    proximaReserva: "Hoje - 14h",
    reservasHoje: 3
  },
  {
    id: 3,
    nome: "Quadra Esportiva",
    disponivel: true,
    proximaReserva: "26/12 - 08h",
    reservasHoje: 1
  },
  {
    id: 4,
    nome: "Piscina",
    disponivel: true,
    proximaReserva: "27/12 - 10h",
    reservasHoje: 0
  }
];

const reservas = [
  {
    id: 1,
    morador: "Ana Costa",
    apartamento: "Apt 401",
    espaco: "Salão de Festas",
    data: "2024-01-25",
    horario: "19:00-23:00",
    status: "confirmada",
    protocolo: "RES001234"
  },
  {
    id: 2,  
    morador: "Pedro Alves",
    apartamento: "Apt 302",
    espaco: "Churrasqueira",
    data: "2024-01-20",
    horario: "14:00-18:00",
    status: "pendente",
    protocolo: "RES001235"
  },
  {
    id: 3,
    morador: "Sofia Lima",
    apartamento: "Apt 105",
    espaco: "Quadra Esportiva", 
    data: "2024-01-18",
    horario: "08:00-10:00",
    status: "cancelada",
    protocolo: "RES001236"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmada":
      return <Badge className="bg-success/10 text-success border-success/20">Confirmada</Badge>;
    case "pendente":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>;
    case "cancelada":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Cancelada</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "confirmada":
      return <CheckCircle className="w-4 h-4 text-success" />;
    case "pendente":
      return <AlertCircle className="w-4 h-4 text-warning" />;
    case "cancelada":
      return <XCircle className="w-4 h-4 text-destructive" />;
    default:
      return null;
  }
};

const Reservas = () => {
  const [reservasList, setReservasList] = useState(reservas);
  const [filtroStatus, setFiltroStatus] = useState("todas");
  const [modalNovaReserva, setModalNovaReserva] = useState(false);
  const [modalEditarReserva, setModalEditarReserva] = useState(false);
  const [modalAprovarReserva, setModalAprovarReserva] = useState(false);
  const [modalAgenda, setModalAgenda] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState<any>(null);

  const reservasFiltradas = reservasList.filter(reserva => {
    if (filtroStatus === "todas") return true;
    return reserva.status === filtroStatus;
  });

  const handleNovaReserva = (novaReserva: any) => {
    setReservasList(prev => [...prev, novaReserva]);
  };

  const handleEditarReserva = (reservaAtualizada: any) => {
    setReservasList(prev => prev.map(r => r.id === reservaAtualizada.id ? reservaAtualizada : r));
  };

  const handleAprovarReserva = (reservaAtualizada: any) => {
    setReservasList(prev => prev.map(r => r.id === reservaAtualizada.id ? reservaAtualizada : r));
  };

  return (
    <>
      <AgendarReservaModal 
        open={modalNovaReserva} 
        onOpenChange={setModalNovaReserva}
        onReservaCreated={handleNovaReserva}
      />
      <EditarReservaModal 
        open={modalEditarReserva} 
        onOpenChange={setModalEditarReserva}
        reserva={reservaSelecionada}
        onReservaUpdated={handleEditarReserva}
      />
      <AprovarReservaModal 
        open={modalAprovarReserva} 
        onOpenChange={setModalAprovarReserva}
        reserva={reservaSelecionada}
        onReservaApproved={handleAprovarReserva}
      />
      <VisualizarAgendaModal 
        open={modalAgenda} 
        onOpenChange={setModalAgenda}
        reservas={reservasList}
      />
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Reservas de Espaços
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestão de áreas comuns e agendamentos
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setModalAgenda(true)}>
              <Calendar className="w-4 h-4 mr-2" />
              Agenda
            </Button>
            <Button size="sm" className="bg-gradient-accent text-accent-foreground shadow-accent-glow" onClick={() => setModalNovaReserva(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Reserva
            </Button>
          </div>
        </div>

        {/* Status dos Espaços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {espacos.map((espaco) => (
            <Card key={espaco.id} className="p-6 bg-gradient-card border-0 shadow-soft">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    espaco.disponivel ? 'bg-success' : 'bg-destructive'
                  }`} />
                  <h3 className="font-semibold text-foreground">
                    {espaco.nome}
                  </h3>
                </div>
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Próxima: {espaco.proximaReserva}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {espaco.reservasHoje} reserva(s) hoje
                </p>
                <Badge 
                  variant={espaco.disponivel ? "outline" : "secondary"}
                  className={espaco.disponivel ? "text-success border-success/20" : ""}
                >
                  {espaco.disponivel ? "Disponível" : "Ocupado"}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Filtros e Busca */}
        <Card className="p-6 bg-gradient-card border-0 shadow-soft">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por morador, espaço ou protocolo..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant={filtroStatus === "todas" ? "default" : "outline"} size="sm" onClick={() => setFiltroStatus("todas")}>Todas</Button>
              <Button variant={filtroStatus === "confirmada" ? "default" : "outline"} size="sm" onClick={() => setFiltroStatus("confirmada")}>Confirmadas</Button>
              <Button variant={filtroStatus === "pendente" ? "default" : "outline"} size="sm" onClick={() => setFiltroStatus("pendente")}>Pendentes</Button>
              <Button variant={filtroStatus === "cancelada" ? "default" : "outline"} size="sm" onClick={() => setFiltroStatus("cancelada")}>Canceladas</Button>
            </div>
          </div>
        </Card>

        {/* Lista de Reservas */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold text-foreground">
              Reservas Recentes
            </h3>
          </div>
          
          <div className="divide-y divide-border/50">
            {reservasFiltradas.map((reserva) => (
              <div key={reserva.id} className="p-6 hover:bg-muted/20 transition-smooth">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(reserva.status)}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-medium text-foreground">
                          {reserva.morador}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {reserva.apartamento}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {reserva.espaco} • {reserva.data} • {reserva.horario}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Protocolo: {reserva.protocolo}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {getStatusBadge(reserva.status)}
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        setReservaSelecionada(reserva);
                        setModalEditarReserva(true);
                      }}>
                        Editar
                      </Button>
                      {reserva.status === "pendente" && (
                        <Button size="sm" className="bg-gradient-accent text-accent-foreground" onClick={() => {
                          setReservaSelecionada(reserva);
                          setModalAprovarReserva(true);
                        }}>
                          Aprovar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
    </>
  );
};

export default Reservas;