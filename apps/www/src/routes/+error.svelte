<script lang="ts">
	import { page } from '$app/stores';
	import { OctagonAlert } from 'lucide-svelte';
</script>

<div class="flex flex-col justify-center items-center gap-2">
	<OctagonAlert class="h-8 w-8" />
	<p class="font-medium text-lg">
		{$page.status}: {$page.error?.message}
	</p>
</div>
