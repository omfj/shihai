import { Header } from "../components/header";
import { type RouteSectionProps } from "@solidjs/router";

export function DefaultLayout({ children }: RouteSectionProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
