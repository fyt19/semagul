"use client";

import { Toaster } from "sonner";

export function AdminToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={2800}
      toastOptions={{
        classNames: {
          toast: "font-sans",
        },
      }}
    />
  );
}
