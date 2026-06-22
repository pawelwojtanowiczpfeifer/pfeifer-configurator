"use client";

import { useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

import MyButton from "@/app/components/ui/MyButton";
import MyCard from "@/app/components/ui/MyCard";
import MyDivider from "@/app/components/ui/MyDivider";
import MyHStack from "@/app/components/ui/MyHStack";
import MyLabel from "@/app/components/ui/MyLabel";
import MyUserAvatar from "@/app/components/ui/MyUserAvatar";
import MyVStack from "@/app/components/ui/MyVStack";
import type { UIColorName } from "@/app/components/ui/colorPalette";

export type MyUserMenuProps = {
  name: string;
  avatarBackgroundColor?: UIColorName;
};

export default function MyUserMenu({
  name,
  avatarBackgroundColor = "partnerschaft",
}: MyUserMenuProps) {
  const router = useRouter();
  const menuId = useId();
  const displayName = name === "Pawel" ? "Pawe\u0142" : name;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      const menuElement = document.querySelector<HTMLElement>(
        `[data-user-menu-root="${menuId}"]`,
      );

      if (!menuElement?.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuId]);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    const supabase = await getSupabaseClient();

    await supabase.auth.signOut();

    setIsOpen(false);
    router.push("/ui/login");
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { label: "My profile" },
    { label: "My projects" },
    { label: "Settings" },
  ] as const;

  return (
    <MyVStack
      gap="none"
      align="end"
      className="relative"
      data-user-menu-root={menuId}
    >
      <MyButton
        variant="outline"
        size="small"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Open user menu for ${name}`}
        className="rounded-full border-0 bg-transparent p-0 hover:bg-transparent"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <MyUserAvatar
          name={name}
          size="md"
          backgroundColor={avatarBackgroundColor}
        />
      </MyButton>

      {isOpen ? (
        <MyVStack gap="none" className="absolute right-0 top-full z-20 mt-2">
          <MyCard p="md" minWidth="md" shadow="lg" nowrap>
            <MyVStack gap="md">
              <MyHStack gap="md" align="center" justify="between">
                <MyVStack gap="xs" align="start">
                  <MyLabel size="medium">Hi, {displayName}</MyLabel>
                  <MyLabel
                    size="small"
                    variant="muted"
                    children={undefined}
                  ></MyLabel>
                  Engineer account
                </MyVStack>
              </MyHStack>

              <MyDivider />

              <MyVStack as="nav" gap="xs" aria-label="User menu">
                {menuItems.map((menuItem) => (
                  <MyButton
                    key={menuItem.label}
                    variant="outline"
                    size="small"
                    onClick={handleCloseMenu}
                    className="w-full justify-start border-0 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {menuItem.label}
                  </MyButton>
                ))}
              </MyVStack>

              <MyDivider />

              <MyButton
                variant="outline"
                size="small"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full justify-center"
              >
                Logout
              </MyButton>
            </MyVStack>
          </MyCard>
        </MyVStack>
      ) : null}
    </MyVStack>
  );
}
