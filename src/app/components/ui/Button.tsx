export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
};

export default function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const base = "rounded-lg px-5 py-1 font-medium transition";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-[#a4aab1] text-white hover:bg-[#969da5]",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
}
