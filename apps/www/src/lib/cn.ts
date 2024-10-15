import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classes: Array<ClassValue>) {
  return twMerge(clsx(classes));
}
