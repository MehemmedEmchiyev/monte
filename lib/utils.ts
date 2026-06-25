import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, locale: string = "az-AZ"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "AZN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function getDiscountPercent(
  price: number,
  discountPrice?: number
): number {
  if (!discountPrice || discountPrice >= price) return 0;
  return Math.round(((price - discountPrice) / price) * 100);
}

export const WHATSAPP_ORDER_NUMBER = "994507174704";

export function buildWhatsAppOrderUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(message)}`;
}
