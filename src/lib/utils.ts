import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Phone list from portfolio JSON (`phones` array or legacy single `phone`). */
export function getProfilePhoneList(profile: { phones?: string[]; phone?: string }): string[] {
  if (Array.isArray(profile.phones) && profile.phones.length > 0) return profile.phones;
  if (typeof profile.phone === "string" && profile.phone) return [profile.phone];
  return [];
}
