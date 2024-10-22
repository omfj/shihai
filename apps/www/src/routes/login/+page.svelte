<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/api/auth/auth.fetch';
	import { createMutation } from '@tanstack/svelte-query';
	import { type FormEventHandler } from 'svelte/elements';

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

		await goto('/');
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<form onsubmit={handleSubmit} class="flex flex-col gap-4">
	<label class="flex flex-col gap-1">
		<span class="font-medium text-sm">Username</span>
		<input class="px-2 py-1 h-8 border rounded" type="text" name="username" bind:value={username} />
	</label>

	<label class="flex flex-col gap-1">
		<span class="font-medium text-sm">Password</span>
		<input
			class="px-2 py-1 h-8 border rounded"
			type="password"
			name="password"
			bind:value={password}
		/>
	</label>

	<button class="bg-indigo-600 text-white rounded h-8 font-medium" type="submit">Login</button>
</form>
