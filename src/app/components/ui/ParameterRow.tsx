export type ParameterRowProps = {
  children: React.ReactNode;
  label: string;
  unit?: string;
};

export default function ParameterRow({
  children,
  label,
  unit,
}: ParameterRowProps) {
  return (
    <div className="grid grid-cols-[160px_minmax(0,1fr)_60px] items-center gap-3">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      <span className="text-sm text-slate-500">{unit ?? ""}</span>
    </div>
  );
}
