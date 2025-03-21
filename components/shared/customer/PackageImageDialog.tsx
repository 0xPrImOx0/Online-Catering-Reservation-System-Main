"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import VisuallyHidden
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import {
  ImageDialogState,
  PackageImageDialogProps,
} from "@/types/customer/package-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ImageDialog({
  imageDialog,
  closeImageDialog,
}: PackageImageDialogProps) {
  return (
    <Dialog
      open={imageDialog.open}
      onOpenChange={(open) => {
        if (!open) closeImageDialog();
      }}
    >
      <DialogContent className="p-0 overflow-hidden bg-transparent border-0 shadow-none">
        <VisuallyHidden>
          <DialogTitle>{imageDialog.title}</DialogTitle>
        </VisuallyHidden>
        <div className="relative w-auto h-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Image
                    src={imageDialog.url || "/placeholder.svg"}
                    alt={imageDialog.title}
                    width={1500}
                    height={725}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={closeImageDialog}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-base">{imageDialog.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to open image dialog
export const useImageDialog = () => {
  const [imageDialog, setImageDialog] = useState<ImageDialogState>({
    open: false,
    url: "",
    title: "",
    width: 0,
    height: 0,
  });

  const openImageDialog = (url: string, title: string) => {
    // Set the dialog to open immediately with default dimensions
    setImageDialog({
      open: true,
      url,
      title,
      width: 800,
      height: 600,
    });

    // Then try to get the natural dimensions if possible
    const img = new window.Image() as HTMLImageElement;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Only update the dimensions once the image has loaded
      setImageDialog((prev) => ({
        ...prev,
        width: img.naturalWidth || 800,
        height: img.naturalHeight || 600,
      }));
    };

    img.onerror = () => {
      // Keep using the default dimensions if there's an error
      console.log("Failed to load image dimensions, using defaults");
    };

    // Set the source after setting up the handlers
    img.src = url;
  };

  const closeImageDialog = () => {
    setImageDialog({ open: false, url: "", title: "", width: 0, height: 0 });
  };

  return { imageDialog, openImageDialog, closeImageDialog };
};
