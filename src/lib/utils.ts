import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateToday() {
  return format(new Date(), "EEE, dd MMMM yyyy", { locale: ptBR });
}