<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		children: Snippet;
	};

	let { href, children }: Props = $props();
</script>

<li>
	<a class="font-medium text-white px-2" {href}>
		{@render children()}
	</a>
</li>
