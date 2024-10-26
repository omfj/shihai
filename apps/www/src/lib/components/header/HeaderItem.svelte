<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		children: Snippet;
	};

	let { href, children }: Props = $props();
</script>

<li>
	<a class="font-medium text-gray-600 hover:text-gray-900 transition-all px-2" {href}>
		{@render children()}
	</a>
</li>
