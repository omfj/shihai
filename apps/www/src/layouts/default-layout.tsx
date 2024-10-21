import { Header } from "../components/header";
import { type RouteSectionProps } from "@solidjs/router";

export function DefaultLayout({ children }: RouteSectionProps) {
  return (
    <div class="min-h-screen flex flex-col">
      <Header />
      <div class="flex-1">{children}</div>
    </div>
  );
}
