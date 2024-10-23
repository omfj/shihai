<script lang="ts">
	import { AlertOctagon } from 'lucide-svelte';
	import { cn } from '$lib/cn';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { class: className, children, ...props }: Props = $props();
</script>

<div
	class={cn(
		'flex items-center gap-4 p-4 rounded border-red-500 border-2 text-red-500 bg-red-200',
		className
	)}
	{...props}
>
	<AlertOctagon class="h-6 w-6" />
	{@render children?.()}
</div>
