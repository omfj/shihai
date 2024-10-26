<script>
	import { getAuthContext } from '$lib/context/auth-context.svelte';
	import HeaderItem from './HeaderItem.svelte';
	import LogOutButton from './LogOutButton.svelte';

	let auth = getAuthContext();
	let isLoggedIn = $derived(!!auth.user);
</script>

<header class="bg-gray-100 p-3 flex items-center justify-between border-b shadow-sm mb-8">
	<a href="/">
		<h1 class="font-bold text-xl">⛩️ Shihai</h1>
	</a>

	<div>
		<menu class="flex items-center">
			{#if isLoggedIn}
				<HeaderItem href="/poll/create">Create poll</HeaderItem>
				<HeaderItem href="/profile">Profile</HeaderItem>
				<LogOutButton />
			{/if}

			{#if !isLoggedIn}
				<HeaderItem href="/login">Login</HeaderItem>
				<HeaderItem href="/register">Register</HeaderItem>
			{/if}
		</menu>
	</div>
</header>
