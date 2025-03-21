"use client";

import { ChevronDown, LogOut, Moon, Settings, Sun, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

type CustomerNavUserProps = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};

export default function CustomerNavUser({ user }: CustomerNavUserProps) {
  const { setTheme, theme } = useTheme();
  const isMobile = useIsMobile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={isMobile ? "custom" : "landing"}
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <span className="truncate font-semibold max-md:hidden">
            {user.name}
          </span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/book-now"}>
              <User />
              Book Now!
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/settings"}>
              <Settings />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            <Moon className={clsx(theme === "dark" && "hidden")} />
            <Sun className={clsx(theme === "light" && "hidden")} />
            <span>{theme === "dark" ? "Light" : "Dark"} Mode</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" asChild>
          <Link href={"/sign-in"}>
            <LogOut />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
