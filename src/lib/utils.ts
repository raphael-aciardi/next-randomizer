import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateToday() {
  const formattedDate = format(new Date(), "EEE, dd MMMM yyyy", { locale: ptBR });

  return formattedDate


}