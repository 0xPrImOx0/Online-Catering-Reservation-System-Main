import Image from "next/image";
import React from "react";

interface LogoProps {
  withLabel?: boolean;
  imageSize?: number;
}

const Logo = ({ withLabel = false, imageSize }: LogoProps) => {
  return (
    <div className="flex h-14 items-center my-4">
      <div>
        <Image
          src="/catering-logo.png"
          width={imageSize || 75}
          height={imageSize || 75}
          priority={true}
          alt="Catering-Logo"
        />
      </div>
      <div
        className={`flex flex-col ${
          withLabel ? "text-left" : "ml-2 text-center items-center"
        }`}
      >
        <span className="font-semibold text-lg">Food Sentinel</span>
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
