import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
}

export function formatDateTime(dateString: string | null): string {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleString();
}
