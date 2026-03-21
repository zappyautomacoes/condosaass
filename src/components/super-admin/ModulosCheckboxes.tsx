import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PermissoesModulos, moduloLabels, modulosCategorias } from "@/types/superAdmin";

interface ModulosCheckboxesProps {
  value: PermissoesModulos;
  onChange: (value: PermissoesModulos) => void;
  disabled?: boolean;
}

export const ModulosCheckboxes = ({ value, onChange, disabled }: ModulosCheckboxesProps) => {
  const toggle = (key: keyof PermissoesModulos) => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <div className="space-y-4">
      {Object.entries(modulosCategorias).map(([categoria, modulos]) => (
        <div key={categoria}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{categoria}</p>
          <div className="grid grid-cols-2 gap-2">
            {modulos.map((mod) => (
              <div key={mod} className="flex items-center gap-2">
                <Checkbox
                  id={mod}
                  checked={value[mod]}
                  onCheckedChange={() => toggle(mod)}
                  disabled={disabled}
                />
                <Label htmlFor={mod} className="text-sm text-slate-300 cursor-pointer">{moduloLabels[mod]}</Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
