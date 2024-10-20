import { ComponentProps } from "solid-js";
import { cn } from "../../lib/cn";

type InputProps = ComponentProps<"input">;

export function Input({ class: className, ...props }: InputProps) {
  return <input class={cn("px-3 rounded py-2 h-10 border", className)} {...props} />;
}
