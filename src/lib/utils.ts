import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cleanObject = (data: any) => {
    return Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== null && v !== undefined)
    );
}