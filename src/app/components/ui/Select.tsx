export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  defaultValue?: string;
  options: SelectOption[];
};

export default function Select({ defaultValue, options }: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        defaultValue={defaultValue}
        className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 outline-none transition focus:border-blue-600"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 7 5 6 5-6" />
        </svg>
      </span>
    </div>
  );
}
