import { toast } from "sonner";

export function adminBusy(message = "İşleniyor…") {
  return toast.loading(message);
}

export function adminDone(
  id: string | number,
  message: string,
  ok = true,
) {
  if (ok) toast.success(message, { id });
  else toast.error(message, { id });
}

export function adminSuccess(message: string) {
  toast.success(message);
}

export function adminError(message: string) {
  toast.error(message);
}
