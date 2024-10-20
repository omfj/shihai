import { A } from "@solidjs/router";
import { Title } from "../components/seo/title";
import { Button } from "../components/ui/button";
import { FormControl } from "../components/ui/form-control";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Show, createSignal } from "solid-js";
import { createRegisterMutation } from "../api/auth/auth.query";

export function Register() {
  const registerMutation = createRegisterMutation();

  const [email, setEmail] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");

  const passwordMatches = () => password() === confirmPassword();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (!passwordMatches()) {
      return;
    }

    registerMutation.mutate({
      email: email(),
      username: username(),
      password: password(),
    });
  };

  return (
    <>
      <Title>Register</Title>

      <main class="max-w-screen-sm mx-auto py-10">
        <h1 class="font-medium text-2xl mb-8">Register</h1>

        <form onSubmit={handleSubmit} class="flex flex-col gap-4">
          <FormControl>
            <Label>Email</Label>
            <Input type="email" value={email()} onInput={(e) => setEmail(e.target.value)} />
          </FormControl>

          <FormControl>
            <Label>Username</Label>
            <Input type="text" value={username()} onInput={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl>
            <Label>Password</Label>
            <Input
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={confirmPassword()}
              onInput={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          <Show when={!passwordMatches()}>
            <p class="text-red-500">Passwords do not match</p>
          </Show>

          <Button type="submit" disabled={!passwordMatches()}>
            Register
          </Button>
        </form>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          <A href="/login" class="text-blue-500 hover:underline">
            Already have an account?
          </A>
        </div>
      </main>
    </>
  );
}
