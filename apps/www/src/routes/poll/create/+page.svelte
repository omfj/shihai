<script lang="ts">
	import { goto } from '$app/navigation';
	import { createPoll } from '$lib/api/polls/polls.fetch';
	import ActionButton from '$lib/components/ActionButton.svelte';
	import { CreatePollState } from '$lib/states/create-poll-state.svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import { ArrowUp, ArrowDown, X } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import type { FormEventHandler } from 'svelte/elements';

	let pollState = new CreatePollState();
	let error = $state('');

	const pollMutation = createMutation({
		mutationFn: createPoll
	});

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const optionsWithoutEmpty = pollState.options
			.filter((option) => option.value.trim() !== '')
			.map((option) => option.value);

		const result = await $pollMutation.mutateAsync({
			question: pollState.question,
			options: optionsWithoutEmpty
		});

		if (result.success) {
			goto(`/poll/${result.data.id}`);
		} else {
			error = result.error;
		}
	};

	$effect(() => {
		const lastOption = pollState.options[pollState.options.length - 1];

		if (lastOption.value !== '') {
			pollState.addOption();
		}
	});
</script>

<svelte:head>
	{#if !pollState.question}
		<title>Create a poll</title>
	{:else}
		<title>Creating - {pollState.question}...</title>
	{/if}
</svelte:head>

{#if error}
	<p class="text-center text-red-500">{error}</p>
{/if}

<form onsubmit={handleSubmit} class="flex flex-col gap-4">
	<label class="flex flex-col gap-1">
		<span class="font-medium text-sm">Question</span>
		<input
			class="px-2 py-1 h-8 border rounded"
			type="text"
			name="username"
			bind:value={pollState.question}
		/>
	</label>

	<ul class="flex flex-col gap-1">
		{#each pollState.options as option, i (option.id)}
			{@const isFirst = i === 0}
			{@const isLast = i === pollState.options.length - 1 || i === pollState.options.length - 2}
			{@const isOnlyOption = pollState.options.length === 1}
			<li animate:flip>
				<label class="flex flex-col gap-1">
					<span class="text-sm font-medium">Option {i + 1}</span>
					<div class="flex items-center gap-2">
						<input
							class="px-2 py-1 h-8 border rounded flex-1"
							type="text"
							name="username"
							bind:value={pollState.options[i].value}
						/>
						<ActionButton onclick={() => pollState.moveOption(i, 'up')} disabled={isFirst}>
							<ArrowUp />
						</ActionButton>
						<ActionButton onclick={() => pollState.moveOption(i, 'down')} disabled={isLast}>
							<ArrowDown />
						</ActionButton>
						<ActionButton onclick={() => pollState.deleteOption(i)} disabled={isOnlyOption}>
							<X />
						</ActionButton>
					</div>
				</label>
			</li>
		{/each}
	</ul>

	<button class="bg-indigo-600 text-white text-sm rounded h-8 font-medium" type="submit"
		>Create poll</button
	>
</form>
