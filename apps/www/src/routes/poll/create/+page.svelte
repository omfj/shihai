<script lang="ts">
	import { createPoll } from '$lib/api/polls/polls.fetch';
	import { CreatePollState } from '$lib/states/create-poll-state.svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import { ArrowUp, ArrowDown, X } from 'lucide-svelte';
	import { type FormEventHandler } from 'svelte/elements';

	let pollState = new CreatePollState();

	let message = $state('');

	const pollMutation = createMutation({
		mutationFn: createPoll
	});

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const optionsWithoutEmpty = pollState.options.filter((option) => option.trim() !== '');

		$pollMutation.mutate({
			question: pollState.question,
			options: optionsWithoutEmpty
		});

		pollState.question = '';
		pollState.options = [''];

		message = 'Poll created successfully';
	};

	$effect(() => {
		const lastOption = pollState.options[pollState.options.length - 1];

		if (lastOption !== '') {
			pollState.options.push('');
		}
	});
</script>

{#if message}
	<p>{message}</p>
{/if}

<form onsubmit={handleSubmit} class="flex flex-col gap-4">
	<label class="flex flex-col">
		<span>Question</span>
		<input
			class="px-2 py-1 h-8 border rounded"
			type="text"
			name="username"
			bind:value={pollState.question}
		/>
	</label>

	{#each pollState.options as _, i}
		<label class="flex flex-col">
			<span>Option {i + 1}</span>
			<div class="flex items-center gap-2">
				<input
					class="px-2 py-1 h-8 border rounded flex-1"
					type="text"
					name="username"
					bind:value={pollState.options[i]}
				/>
				<button
					type="button"
					onclick={() => pollState.moveOption(i, 'up')}
					class="flex items-center justify-center size-8 p-2 border rounded text-gray-600 hover:bg-gray-200 hover:border-gray-300"
				>
					<ArrowUp />
				</button>
				<button
					type="button"
					onclick={() => pollState.moveOption(i, 'down')}
					class="flex items-center justify-center size-8 p-2 border rounded text-gray-600 hover:bg-gray-200 hover:border-gray-300"
				>
					<ArrowDown />
				</button>
				<button
					type="button"
					onclick={() => pollState.deleteOption(i)}
					class="flex items-center justify-center size-8 p-2 border rounded text-gray-600 hover:bg-gray-200 hover:border-gray-300"
				>
					<X />
				</button>
			</div>
		</label>
	{/each}

	<button class="bg-indigo-600 text-white rounded h-8 font-medium" type="submit">Create poll</button
	>
</form>
