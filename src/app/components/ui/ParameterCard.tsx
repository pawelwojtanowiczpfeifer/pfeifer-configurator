export type ParameterCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function ParameterCard({
  title,
  description,
  children,
}: ParameterCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description ? (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        ) : null}
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
}
