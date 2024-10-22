<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { login } from '$lib/api/auth/auth.fetch';
	import Form from '$lib/components/form/Form.svelte';
	import FormControlLabel from '$lib/components/form/FormControl/FormControlLabel.svelte';
	import FormControlRoot from '$lib/components/form/FormControl/FormControlRoot.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import type { FormEventHandler } from 'svelte/elements';

	let username = $state('');
	let password = $state('');

	const loginMutation = createMutation({
		mutationFn: login
	});

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		await $loginMutation.mutateAsync({
			username,
			password
		});

		await invalidateAll();
		await goto('/');
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<Form onsubmit={handleSubmit}>
	<FormControlRoot>
		<FormControlLabel>Username</FormControlLabel>
		<Input type="text" name="username" bind:value={username} />
	</FormControlRoot>

	<FormControlRoot>
		<FormControlLabel>Password</FormControlLabel>
		<Input type="password" name="password" bind:value={password} />
	</FormControlRoot>

	<Button type="submit">Login</Button>
</Form>

<p class="py-4 text-center">
	<a class="text-blue-500 hover:underline" href="/register">Don't have an account?</a>
</p>
