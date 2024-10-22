<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import { cn } from '$lib/cn';

	type Props = HTMLLabelAttributes;

	let { class: className, children, ...props }: Props = $props();
</script>

<label class={cn('flex flex-col gap-1', className)} {...props}>
	{@render children?.()}
</label>
