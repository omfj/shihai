<script lang="ts">
	import { goto } from '$app/navigation';
	import ActionButton from '$lib/components/ActionButton.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import FormControlLabel from '$lib/components/form/FormControl/FormControlLabel.svelte';
	import FormControlRoot from '$lib/components/form/FormControl/FormControlRoot.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { shihai } from '$lib/shihai';
	import { CreatePollState } from '$lib/states/create-poll-state.svelte.js';
	import { createMutation } from '@tanstack/svelte-query';
	import { ArrowDown, ArrowUp, X } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import type { FormEventHandler } from 'svelte/elements';

	let { data } = $props();

	let oldOptions = data.poll.options.map((option) => option.id);
	let error = $state('');
	let pollState = new CreatePollState({
		question: data.poll.question,
		expiresAt: data.poll.expiresAt?.split(':').slice(0, 2).join(':'),
		options: data.poll.options.map((option) => ({
			id: option.id,
			value: option.caption
		}))
	});

	const pollMutation = createMutation({
		mutationFn: shihai.polls.update
	});

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const optionsWithoutEmpty = pollState.options
			.filter((option) => option.value.trim() !== '')
			.map((option) => ({
				id: oldOptions.includes(option.id) ? option.id : null,
				caption: option.value
			}));

		const result = await $pollMutation.mutateAsync({
			id: data.poll.id,
			poll: {
				question: pollState.question,
				expiresAt: pollState.expiresAt ? new Date(pollState.expiresAt).toUTCString() : null,
				options: optionsWithoutEmpty
			}
		});

		if (result.success === true) {
			goto(`/poll/${result.data.id}`);
		} else {
			error = result.error;
		}
	};
</script>

<svelte:head>
	<title>Edit - {data.poll.question}</title>
</svelte:head>

{#if error}
	<Alert>{error}</Alert>
{/if}

<h1 class="text-2xl font-medium mb-2">Editing - {data.poll.question}</h1>

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
		<span>{pollState.expiresAt}</span>
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

	<Button type="submit">Save</Button>
</Form>
