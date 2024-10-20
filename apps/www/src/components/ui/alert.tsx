import { ComponentProps } from "solid-js";
import { cn } from "../../lib/cn";

export type AlertProps = ComponentProps<"div">;

export function Alert({ children, class: className, ...props }: AlertProps) {
  return (
    <div
      class={cn("bg-red-100 border-red-300 border-2 text-red-800 p-4 rounded-md", className)}
      {...props}
    >
      <p>{children}</p>
    </div>
  );
}
