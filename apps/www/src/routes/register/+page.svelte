<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { register } from '$lib/api/auth/auth.fetch';
	import Form from '$lib/components/form/Form.svelte';
	import FormControlLabel from '$lib/components/form/FormControl/FormControlLabel.svelte';
	import FormControlRoot from '$lib/components/form/FormControl/FormControlRoot.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import type { FormEventHandler } from 'svelte/elements';

	let username = $state('');
	let email = $state('');
	let password = $state('');
	let passwordRepeat = $state('');

	let isMatchingPasswords = $derived.by(() => password === passwordRepeat);

	const registerMutation = createMutation({
		mutationFn: register
	});

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		if (!isMatchingPasswords) {
			return;
		}

		await $registerMutation.mutateAsync({
			username,
			email,
			password
		});

		await invalidateAll();
		await goto('/');
	};
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<Form onsubmit={handleSubmit}>
	<FormControlRoot>
		<FormControlLabel>Username</FormControlLabel>
		<Input type="text" name="username" bind:value={username} />
	</FormControlRoot>

	<FormControlRoot>
		<FormControlLabel>Email</FormControlLabel>
		<Input type="email" name="email" bind:value={email} />
	</FormControlRoot>

	<FormControlRoot>
		<FormControlLabel>Password</FormControlLabel>
		<Input type="password" name="password" bind:value={password} />
	</FormControlRoot>

	<FormControlRoot>
		<FormControlLabel>Repeat password</FormControlLabel>
		<Input type="password" name="passwordRepeat" bind:value={passwordRepeat} />
	</FormControlRoot>

	{#if !isMatchingPasswords}
		<p class="text-red-500 text-sm">Passwords do not match</p>
	{/if}

	<Button type="submit">Register</Button>
</Form>

<p class="py-4 text-center">
	<a class="text-blue-500 hover:underline" href="/login">Already have an account?</a>
</p>
