<script>
	import { createQuery } from '@tanstack/svelte-query';
	import HeaderItem from './HeaderItem.svelte';
	import { getMe } from '$lib/api/auth/auth.fetch';

	const userState = createQuery({
		queryKey: ['auth'],
		queryFn: getMe
	});

	let isLoggedIn = $derived.by(() => !!$userState.data);
</script>

<header class="bg-indigo-600 p-3 flex items-center justify-between mb-8">
	<a href="/">
		<h1 class="font-bold text-white text-xl">Shihai</h1>
	</a>

	<div>
		<menu class="flex items-center">
			{#if isLoggedIn}
				<HeaderItem href="/poll/create">Create poll</HeaderItem>
				<HeaderItem href="/profile">Profile</HeaderItem>
				<HeaderItem href="/logout">Logout</HeaderItem>
			{/if}

			{#if !isLoggedIn}
				<HeaderItem href="/login">Login</HeaderItem>
				<HeaderItem href="/register">Register</HeaderItem>
			{/if}
		</menu>
	</div>
</header>
