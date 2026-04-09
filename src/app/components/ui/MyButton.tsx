export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium";
};

export default function MyButton({
  children,
  onClick,
  variant = "primary",
  size = "medium",
}: ButtonProps) {
  const base = "rounded-md font-medium transition";

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
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </button>
  );
}
