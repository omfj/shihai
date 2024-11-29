<script lang="ts">
	import { buttonVariant } from '$lib/variants';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = HTMLAnchorAttributes;

	let { class: className, children, ...props }: Props = $props();
</script>

<a class={buttonVariant({ className })} {...props}>
	{@render children?.()}
</a>
