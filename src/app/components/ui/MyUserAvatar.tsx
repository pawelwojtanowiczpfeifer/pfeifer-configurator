import { UI_COLORS, type UIColorName } from "./colorPalette";

export type UserAvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  backgroundColor?: UIColorName;
};

export default function MyUserAvatar({
  name,
  size = "md",
  className = "",
  backgroundColor = "draht",
}: UserAvatarProps) {
  const base =
    "inline-flex shrink-0 items-center justify-center rounded-full font-semibold";

  const sizes = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
  };

  const initial = name.trim().charAt(0).toUpperCase() || "?";
  const selectedColor = UI_COLORS[backgroundColor];

  return (
    <div
      className={`${base} ${sizes[size]} ${className}`}
      style={{
        backgroundColor: selectedColor.hex,
        color: selectedColor.contrastTextHex,
      }}
    >
      {initial}
    </div>
  );
}

// Example:
// <MyUserAvatar name="Paweł" />
