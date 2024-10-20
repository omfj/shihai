import { A, useNavigate } from "@solidjs/router";
import { Title } from "../components/seo/title";
import { Button } from "../components/ui/button";
import { FormControl } from "../components/ui/form-control";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { createLoginMutation, getCurrentUser } from "../api/auth/auth.query";
import { createEffect, createSignal } from "solid-js";

export function Login() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const loginMutation = createLoginMutation();

  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    loginMutation.mutate({
      username: username(),
      password: password(),
    });
  };

  createEffect(() => {
    if (user()) {
      navigate("/");
    }
  });

  return (
    <>
      <Title>Login</Title>

      <main class="max-w-screen-sm mx-auto py-10">
        <h1 class="font-medium text-2xl mb-8">Login</h1>

        <form onSubmit={handleSubmit} class="flex flex-col gap-4">
          <FormControl>
            <Label>Username</Label>
            <Input
              type="text"
              value={username()}
              onInput={(e) => setUsername(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl>
            <Label>Password</Label>
            <Input
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
            />
          </FormControl>

          <Button type="submit">Login</Button>
        </form>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          <A href="/register" class="text-blue-500 hover:underline">
            Don't have an account?
          </A>
        </div>
      </main>
    </>
  );
}
