<script lang="ts">
	import { cn } from '$lib/cn';
	import type { HTMLFormAttributes } from 'svelte/elements';

	type Props = HTMLFormAttributes;

	let { class: className, children, ...props }: Props = $props();
</script>

<form {...props} class={cn('flex flex-col gap-4', className)}>
	{@render children?.()}
</form>
