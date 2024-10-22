<script lang="ts">
	import { cn } from '$lib/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = HTMLInputAttributes;

	let { class: className, value = $bindable(), ...props }: Props = $props();
</script>

<input bind:value class={cn('px-2 py-1 h-8 border rounded', className)} {...props} />
