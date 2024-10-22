<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/cn';

	type Props = HTMLAttributes<HTMLSpanElement>;

	let { class: className, children, ...props }: Props = $props();
</script>

<span class={cn('font-medium text-sm', className)} {...props}>
	{@render children?.()}
</span>
