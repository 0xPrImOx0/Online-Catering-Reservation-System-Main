"use client";

import {
  ChevronDown,
  ClipboardCheck,
  LogOut,
  LucideIcon,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";

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
import { links, registeredLinks } from "@/lib/customer-links";

type CustomerNavUserProps = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};

type DropdownLinkProps = {
  data: {
    title: string;
    href: string;
    Icon: LucideIcon;
  };
};

export default function CustomerNavUser({ user }: CustomerNavUserProps) {
  const { setTheme, theme } = useTheme();
  const isMobile = useIsMobile();

  const DropdownLink = ({ data }: DropdownLinkProps) => {
    const { title, href, Icon } = data;
    return (
      <DropdownMenuItem className="text-base" asChild key={title}>
        <Link href={href}>
          <Icon />
          {title}
        </Link>
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={isMobile ? "custom" : "landing"}
          className="data-[state=open]:bg-sidebar-accent p-1 data-[state=open]:text-sidebar-accent-foreground"
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
        className="max-sm:w-[90vw] sm:min-w-56 rounded-lg"
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
        {isMobile && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {links.map((data) => (
                <DropdownLink data={data} key={data.title} />
              ))}
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {registeredLinks.map((data) => (
            <DropdownLink data={data} key={data.title} />
          ))}
          <DropdownMenuItem
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
            className="text-base"
          >
            <Moon className={clsx(theme === "dark" && "hidden")} />
            <Sun className={clsx(theme === "light" && "hidden")} />
            <span>{theme === "dark" ? "Light" : "Dark"} Mode</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive dark:text-red-500"
          asChild
        >
          <Link href={"/sign-in"} className="text-base">
            <LogOut />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
