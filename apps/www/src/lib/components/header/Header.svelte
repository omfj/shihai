<script>
	import { page } from '$app/stores';
	import HeaderItem from './HeaderItem.svelte';
	import LogOutButton from './LogOutButton.svelte';

	let user = $derived($page.data.user);
	let isLoggedIn = $derived(!!user);
</script>

<header class="bg-indigo-600 p-3 flex items-center justify-between mb-8">
	<a href="/">
		<h1 class="font-bold text-white text-xl">⛩️ Shihai</h1>
	</a>

	<div>
		<menu class="flex items-center">
			{#if isLoggedIn}
				<HeaderItem href="/poll/create">Create poll</HeaderItem>
				<LogOutButton />
			{/if}

			{#if !isLoggedIn}
				<HeaderItem href="/login">Login</HeaderItem>
				<HeaderItem href="/register">Register</HeaderItem>
			{/if}
		</menu>
	</div>
</header>
