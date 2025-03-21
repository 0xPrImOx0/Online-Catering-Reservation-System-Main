"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface LogoProps {
  withLabel?: boolean;
  imageSize?: number;
  withTitle?: boolean;
}

const Logo = ({
  withLabel = false,
  imageSize = 75,
  withTitle = true,
}: LogoProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={pathname.includes("/caterer") ? "/caterer/dashboard" : "/"}
      className={clsx("flex items-center my-2 max-w-fit", {
        "mx-auto": pathname === "/about-us",
      })}
    >
      <div>
        <Image
          src="/catering-logo.png"
          width={imageSize}
          height={imageSize}
          priority={true}
          alt="Catering-Logo"
        />
      </div>
      <div
        className={clsx(
          "flex flex-col",
          withLabel ? "text-left" : "ml-2 text-center items-center"
        )}
      >
        {withTitle && <span className="font-bold text-lg">Food Sentinel</span>}
        {withLabel && (
          <p className="font-light italic text-xs text-muted-foreground">
            Catering Reservation System
          </p>
        )}
      </div>
    </Link>
  );
};

export default Logo;
