import { JSX, Show } from "solid-js";
import { A } from "@solidjs/router";
import { createLogoutMutation, getCurrentUser } from "../api/auth/auth.query";

export function Header() {
  const user = getCurrentUser();

  return (
    <header class="p-4 flex justify-between border-b">
      <a href="/">
        <h1 class="font-semibold text-xl">SHIHAI</h1>
      </a>

      <menu class="flex items-center space-x-2">
        <HeaderItem href="/">Home</HeaderItem>
        <HeaderItem href="/poll/new">New Poll</HeaderItem>
        <Show when={!!user()}>
          <HeaderItem href="/profile">{user()!.username}</HeaderItem>
          <LogoutButton />
        </Show>
        <Show when={!user()}>
          <HeaderItem href="/login">Log in</HeaderItem>
          <HeaderItem href="/register">Register</HeaderItem>
        </Show>
      </menu>
    </header>
  );
}

type MenuItemProps = {
  href: string;
  children: JSX.Element;
};

function HeaderItem({ href, children }: MenuItemProps) {
  return (
    <li>
      <A class="text-gray-700 hover:underline hover:text-gray-900" href={href}>
        {children}
      </A>
    </li>
  );
}

function LogoutButton() {
  const logoutMutation = createLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <li>
      <button class="text-gray-700 hover:underline hover:text-gray-900" onClick={handleLogout}>
        Log out
      </button>
    </li>
  );
}
