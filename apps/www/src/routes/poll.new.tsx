import { ComponentProps, For, Index, Show, createEffect, createSignal } from "solid-js";
import { getCurrentUser } from "../api/auth/auth.query";
import { Title } from "../components/seo/title";
import { Alert } from "../components/ui/alert";
import { FormControl } from "../components/ui/form-control";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineClose } from "solid-icons/ai";
import { cn } from "../lib/cn";
import { Key } from "@solid-primitives/keyed";

let currentId = 1;

type Option = {
  id: number;
  value: string;
};

export function NewPoll() {
  const user = getCurrentUser();

  const [question, setQuestion] = createSignal("");
  const [options, setOptions] = createSignal([
    {
      id: currentId,
      value: "",
    },
  ]);

  const push = (option: Option) => {
    setOptions((prev) => [...prev, option]);
  };

  const update = (index: number, value: string) => {
    setOptions((prev) => {
      const newOptions = [...prev];
      newOptions[index] = { ...newOptions[index], value };
      return newOptions;
    });
  };

  const swap = (indexA: number, indexB: number) => {
    setOptions((prev) => {
      const newOptions = [...prev];
      [newOptions[indexA], newOptions[indexB]] = [newOptions[indexB], newOptions[indexA]];
      return newOptions;
    });
  };

  const remove = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  createEffect(() => {
    const lastOption = options()[options().length - 1];
    if (lastOption.value !== "") {
      push({
        id: currentId++,
        value: "",
      });
    }
  });

  return (
    <>
      <Title>New Poll</Title>

      <main class="max-w-screen-sm mx-auto py-10">
        <Show when={!user()}>
          <Alert>You can not create a poll without being logged in.</Alert>
        </Show>

        <form class="space-y-6">
          <FormControl>
            <Label for="title">Title</Label>
            <Input
              id="title"
              type="text"
              value={question()}
              onInput={(e) => setQuestion(e.currentTarget.value)}
            />
          </FormControl>

          <div class="flex flex-col gap-3">
            <Key each={options()} by="id">
              {(option, index) => {
                const isOneOption = () => options().length === 1;
                const isFirst = () => index() === 0;
                const isLast = () => index() === options().length - 1;

                return (
                  <FormControl>
                    <Label for={`option-${index()}`}>Option {index() + 1}</Label>
                    <div class="flex items-center gap-2">
                      <Input
                        id={`option-${index()}`}
                        type="text"
                        class="flex-1"
                        value={option().value}
                        onInput={(e) => update(index(), e.currentTarget.value)}
                      />

                      <ActionButton
                        onClick={() => {
                          if (index() > 0) {
                            swap(index(), index() - 1);
                          }
                        }}
                        disabled={isFirst()}
                      >
                        <AiOutlineArrowUp class="h-5 w-5" />
                      </ActionButton>

                      <ActionButton
                        onClick={() => {
                          if (index() < options.length - 1) {
                            swap(index(), index() + 1);
                          }
                        }}
                        disabled={isLast()}
                      >
                        <AiOutlineArrowDown class="h-5 w-5" />
                      </ActionButton>

                      <ActionButton
                        onClick={() => {
                          if (options().length > 1) {
                            remove(index());
                          }
                        }}
                        disabled={isOneOption()}
                      >
                        <AiOutlineClose class="h-5 w-5" />
                      </ActionButton>
                    </div>
                  </FormControl>
                );
              }}
            </Key>
          </div>
        </form>
      </main>
    </>
  );
}

type ActionButtonProps = ComponentProps<"button">;

function ActionButton({ class: className, ...props }: ActionButtonProps) {
  return (
    <button
      type="button"
      class={cn(
        "h-10 w-10 border rounded flex items-center justify-center text-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}
