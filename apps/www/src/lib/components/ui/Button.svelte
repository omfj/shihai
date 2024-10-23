<script lang="ts">
	import { cn } from '$lib/cn';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes;

	let { class: className, children, ...props }: Props = $props();
</script>

<button
	class={cn(
		'bg-indigo-600 text-white px-2 text-sm hover:bg-indigo-500 transition-all rounded h-8 font-medium',
		className
	)}
	{...props}
>
	{@render children?.()}
</button>
