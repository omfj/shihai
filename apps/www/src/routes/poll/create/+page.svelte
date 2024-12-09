<script lang="ts">
	import { goto } from '$app/navigation';
	import ActionButton from '$lib/components/ActionButton.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import FormControlLabel from '$lib/components/form/FormControl/FormControlLabel.svelte';
	import FormControlRoot from '$lib/components/form/FormControl/FormControlRoot.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { CreatePollState } from '$lib/states/create-poll-state.svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import { ArrowUp, ArrowDown, X } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import type { FormEventHandler } from 'svelte/elements';
	import { shihai } from '$lib/shihai';

	let pollState = new CreatePollState();
	let error = $state('');

	const pollMutation = createMutation({
		mutationFn: shihai.polls.create
	});

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const optionsWithoutEmpty = pollState.options
			.filter((option) => option.value.trim() !== '')
			.map((option) => option.value);

		const result = await $pollMutation.mutateAsync({
			question: pollState.question,
			expiresAt: pollState.expiresAt ? new Date(pollState.expiresAt).toUTCString() : null,
			options: optionsWithoutEmpty
		});

		if (result.success === true) {
			goto(`/poll/${result.data.id}`);
		} else {
			error = result.error;
		}
	};
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

<Form onsubmit={handleSubmit}>
	<FormControlRoot>
		<FormControlLabel>Question</FormControlLabel>
		<Input type="text" name="username" bind:value={pollState.question} />
	</FormControlRoot>

	<FormControlRoot>
		<FormControlLabel>Expires at</FormControlLabel>
		<div class="flex items-center gap-2">
			<Input
				class="flex-1"
				type="datetime-local"
				name="expiresAt"
				bind:value={pollState.expiresAt}
			/>
			<ActionButton
				title="Reset expiration date"
				class="hover:text-red-600"
				onclick={() => (pollState.expiresAt = null)}
			>
				<X />
			</ActionButton>
		</div>
		<span class="text-gray-500 text-sm">Optional field if you want the form to expire.</span>
	</FormControlRoot>

	<ul class="flex flex-col gap-1">
		{#each pollState.options as option, i (option.id)}
			{@const isFirst = i === 0}
			{@const isLast = i === pollState.options.length - 1 || i === pollState.options.length - 2}
			{@const isOnlyOption = pollState.options.length === 1}
			<li animate:flip>
				<FormControlRoot>
					<FormControlLabel>Option {i + 1}</FormControlLabel>
					<div class="flex items-center gap-2">
						<Input
							class="flex-1"
							type="text"
							name={`option-${i}`}
							bind:value={pollState.options[i].value}
						/>
						<ActionButton
							title="Move up"
							onclick={() => pollState.moveOption(i, 'up')}
							disabled={isFirst}
						>
							<ArrowUp />
						</ActionButton>
						<ActionButton
							title="Move down"
							onclick={() => pollState.moveOption(i, 'down')}
							disabled={isLast}
						>
							<ArrowDown />
						</ActionButton>
						<ActionButton
							title="Delete option"
							onclick={() => pollState.deleteOption(i)}
							disabled={isOnlyOption}
						>
							<X />
						</ActionButton>
					</div>
				</FormControlRoot>
			</li>
		{/each}
	</ul>

	<span class="text-gray-500 text-sm"
		>Note: The last (empty) option will be omitted when the poll is created.</span
	>

	<Button type="submit">Create poll</Button>
</Form>
