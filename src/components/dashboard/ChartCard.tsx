import { Card } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { BarChart3, TrendingUp } from "lucide-react";

interface ChartCardProps {
  title: string;
  data: any[];
}

export const ChartCard = ({ title, data }: ChartCardProps) => {
  return (
    <Card className="p-6 md:p-8 bg-gradient-to-br from-card via-card to-muted/10 border-0 shadow-lg rounded-2xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      
      <div className="relative mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">
                Evolução mensal dos atendimentos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>+15%</span>
          </div>
        </div>
      </div>

      <div className="relative h-72 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAtendimentos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAutomacao" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                padding: '12px 16px'
              }}
              labelStyle={{ 
                color: 'hsl(var(--foreground))',
                fontWeight: 600,
                marginBottom: '8px'
              }}
              itemStyle={{
                color: 'hsl(var(--muted-foreground))',
                fontSize: '13px'
              }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span style={{ color: 'hsl(var(--foreground))', fontSize: '13px', fontWeight: 500 }}>
                  {value === 'atendimentos' ? 'Atendimentos' : 'Automação'}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="atendimentos"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorAtendimentos)"
              dot={{ r: 4, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: 'hsl(var(--card))' }}
              activeDot={{ r: 6, fill: 'hsl(var(--primary))', strokeWidth: 3, stroke: 'hsl(var(--card))' }}
            />
            <Area
              type="monotone"
              dataKey="automacao"
              stroke="hsl(var(--accent))"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorAutomacao)"
              dot={{ r: 4, fill: 'hsl(var(--accent))', strokeWidth: 2, stroke: 'hsl(var(--card))' }}
              activeDot={{ r: 6, fill: 'hsl(var(--accent))', strokeWidth: 3, stroke: 'hsl(var(--card))' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
