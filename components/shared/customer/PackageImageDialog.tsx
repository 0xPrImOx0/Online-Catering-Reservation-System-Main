"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import {
  ImageDialogState,
  PackageImageDialogProps,
} from "@/types/customer/package-types";

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
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden flex items-center justify-center">
        <div className="relative">
          <Image
            src={imageDialog.url || "/placeholder.svg"}
            alt={imageDialog.title}
            width={800}
            height={600}
            className="object-contain"
            style={{ maxHeight: "80vh", maxWidth: "90vw" }}
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
