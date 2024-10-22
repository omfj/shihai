<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import { QueryClientProvider } from '@tanstack/svelte-query';

	let { data, children } = $props();
</script>

<QueryClientProvider client={data.queryClient}>
	<div class="bg-gray-200">
		<div class="flex flex-col min-h-screen max-w-screen-sm mx-auto bg-white md:shadow">
			<Header />
			<div class="flex-1 px-4">
				{@render children()}
			</div>
			<Footer />
		</div>
	</div>
</QueryClientProvider>
