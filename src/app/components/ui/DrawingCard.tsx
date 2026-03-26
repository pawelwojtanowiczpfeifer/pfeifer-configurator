export type DrawingCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function DrawingCard({
  title,
  subtitle,
  children,
}: DrawingCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
        {children}
      </div>
    </div>
  );
}
