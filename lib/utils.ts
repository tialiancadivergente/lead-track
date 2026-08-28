import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleScroll() {
  setTimeout(() => {
    const element = document.getElementById("hero")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      console.error("Elemento com id 'cadastro' não encontrado")
    }
  }, 100)
}

export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");

  const limitedDigits = digits.slice(0, 11);

  if (limitedDigits.length <= 2) {
    return limitedDigits.length > 0 ? `(${limitedDigits}` : "";
  }

  if (limitedDigits.length <= 7) {
    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2)}`;
  }

  return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2, 7)}-${limitedDigits.slice(7)}`;
}

export function handlePhoneInputChange(
  event: React.ChangeEvent<HTMLInputElement>
): string {
  const formatted = formatPhoneNumber(event.target.value);
  return formatted;
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
  const digits = phoneNumber.replace(/\D/g, "");
  return digits.length === 11;
}

export function extractPhoneDigits(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, "");
}

