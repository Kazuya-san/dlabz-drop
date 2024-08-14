import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const debounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function convertTo12Hour(time24: string) {
  const [hours, minutes] = time24.split(":");
  let hours12 = parseInt(hours);
  const ampm = hours12 >= 12 ? "PM" : "AM";

  hours12 = hours12 % 12 || 12; // Convert '0' to '12' for midnight and handle noon
  const minutesPadded = minutes.padStart(2, "0");

  return `${hours12}:${minutesPadded} ${ampm}`;
}
