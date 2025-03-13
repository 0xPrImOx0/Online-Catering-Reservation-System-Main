import clsx from "clsx";
import Image from "next/image";
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
  return (
    <div className="flex items-center my-2 max-w-fit mx-auto">
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
    </div>
  );
};

export default Logo;
