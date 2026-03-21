import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

export const SuperAdminHeader = () => {
  return (
    <header className="h-16 bg-gradient-to-r from-slate-900 to-violet-900 border-b border-slate-700/50 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-white">Super Admin Panel</h1>
        <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
          <Crown className="w-3 h-3 mr-1" /> MASTER
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">SA</span>
        </div>
      </div>
    </header>
  );
};
