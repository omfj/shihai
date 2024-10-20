import { ComponentProps } from "solid-js";
import { cn } from "../../lib/cn";

export type ButtonProps = ComponentProps<"button">;

export function Button({ class: className, ...props }: ButtonProps) {
  return (
    <button
      class={cn(
        "px-4 py-2 bg-green-500 hover:bg-green-600 transition-colors h-10 text-white font-medium rounded",
        className,
      )}
      {...props}
    />
  );
}
