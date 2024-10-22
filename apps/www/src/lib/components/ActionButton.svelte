<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		onclick: () => void;
		children: Snippet;
		disabled: boolean;
	};

	let { onclick, children, disabled }: Props = $props();
</script>

<button
	type="button"
	class="flex items-center justify-center size-8 p-2 border rounded text-gray-600 hover:bg-gray-200 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
	{onclick}
	{disabled}
>
	{@render children()}
</button>
