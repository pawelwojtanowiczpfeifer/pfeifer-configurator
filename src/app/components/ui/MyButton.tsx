export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium";
};

export default function MyButton({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center rounded-lg font-medium transition touch-manipulation cursor-pointer disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-[#a4aab1] text-white hover:bg-[#969da5]",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  const sizes = {
    small: "text-sm px-5 py-1",
    medium: "text-base px-5 py-1",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
