<script lang="ts">
	import { cn } from '$lib/cn';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes;

	let { class: className, children, ...props }: Props = $props();
</script>

<button
	type="button"
	class={cn(
		'flex items-center justify-center size-8 p-2 border rounded text-gray-600 transition-all hover:bg-gray-200 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-gray-200',
		className
	)}
	{...props}
>
	{@render children()}
</button>
