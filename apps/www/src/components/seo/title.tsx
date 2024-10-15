import { createEffect } from "solid-js";

type TitleProps = {
  children: string | undefined | null;
};

export function Title({ children }: TitleProps) {
  createEffect(() => {
    document.title = children ?? "";
  });

  return null;
}
