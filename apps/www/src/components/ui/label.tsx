import { ComponentProps } from "solid-js";
import { cn } from "../../lib/cn";

export type LabelProps = ComponentProps<"label">;

export function Label({ class: className, ...props }: LabelProps) {
  return <label class={cn("text-sm font-medium text-gray-700", className)} {...props} />;
}
