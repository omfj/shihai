import { ComponentProps } from "solid-js";
import { cn } from "../../lib/cn";

export type FormControlProps = ComponentProps<"div">;

export function FormControl({ class: className, ...props }: FormControlProps) {
  return <div class={cn("flex flex-col gap-1", className)} {...props} />;
}
