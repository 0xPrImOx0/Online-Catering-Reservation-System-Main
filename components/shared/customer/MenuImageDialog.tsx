"use client";

import { useRef } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X } from "lucide-react";
import type { MenuItem } from "../types";
import Image from "next/image";

interface MenuImageDialogProps {
  item: MenuItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MenuImageDialog({
  item,
  open,
  onOpenChange,
}: MenuImageDialogProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden bg-transparent border-0 shadow-none">
        <div className="relative w-auto h-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <div className="relative" ref={imageRef}>
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      className="object-contain max-h-[85vh] max-w-[85vw] rounded-lg"
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
