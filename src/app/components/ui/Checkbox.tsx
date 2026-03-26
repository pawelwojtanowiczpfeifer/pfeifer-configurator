export type CheckboxProps = {
  defaultChecked?: boolean;
  description?: string;
  label: string;
};

export default function Checkbox({
  defaultChecked = false,
  description,
  label,
}: CheckboxProps) {
  return (
    <label className="flex items-start gap-3">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
      />

      <span className="space-y-1">
        <span className="block text-sm font-medium text-slate-700">{label}</span>
        {description ? (
          <span className="block text-sm text-slate-500">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
