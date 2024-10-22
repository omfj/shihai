<script lang="ts">
	import { getQueryClientContext } from '@tanstack/svelte-query';
	import { registerUser } from '$lib/api/auth/auth.fetch';
	import { createMutation } from '@tanstack/svelte-query';
	import { type FormEventHandler } from 'svelte/elements';

	let username = $state('');
	let email = $state('');
	let password = $state('');
	let passwordRepeat = $state('');

	let isMatchingPasswords = $derived.by(() => password === passwordRepeat);

	let queryClient = getQueryClientContext();

	const registerMutation = createMutation({
		mutationFn: registerUser
	});

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (!isMatchingPasswords) {
			return;
		}

		$registerMutation.mutate({
			username,
			email,
			password
		});

		queryClient.invalidateQueries({
			queryKey: ['auth']
		});
	};
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-4">
	<label class="flex flex-col">
		<span>Username</span>
		<input class="px-2 py-1 h-8 border rounded" type="text" name="username" bind:value={username} />
	</label>

	<label class="flex flex-col">
		<span>Email</span>
		<input class="px-2 py-1 h-8 border rounded" type="email" name="email" bind:value={email} />
	</label>

	<label class="flex flex-col">
		<span>Password</span>
		<input
			class="px-2 py-1 h-8 border rounded"
			type="password"
			name="password"
			bind:value={password}
		/>
	</label>

	<label class="flex flex-col">
		<span>Repeat Password</span>
		<input
			class="px-2 py-1 h-8 border rounded"
			type="password"
			name="passwordRepeat"
			bind:value={passwordRepeat}
		/>
	</label>

	{#if !isMatchingPasswords}
		<p class="text-red-500 text-sm">Passwords do not match</p>
	{/if}

	<button class="bg-indigo-600 text-white rounded h-8 font-medium" type="submit">Register</button>
</form>
