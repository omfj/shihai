<script lang="ts">
	import { buttonVariant } from '$lib/variants';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes;

	let { class: className, children, ...props }: Props = $props();
</script>

<button class={buttonVariant({ className })} {...props}>
	{@render children?.()}
</button>
