"use client";

import { useRef } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { MenuImageDialogProps } from "@/types/customer/menu-types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import VisuallyHidden
import { X } from "lucide-react";

export function MenuImageDialog({
  item,
  open,
  onOpenChange,
}: MenuImageDialogProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden bg-transparent border-0 shadow-none">
        <VisuallyHidden>
          <DialogTitle>{item.name}</DialogTitle>
        </VisuallyHidden>
        <div className="relative w-auto h-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <div className="relative z-10" ref={imageRef}>
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      width={1500}
                      height={725}
                      alt={item.name}
                      
                    />
                    <DialogClose className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/70 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black transition-colors">
                      <X className="h-5 w-5" />
                    </DialogClose>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
