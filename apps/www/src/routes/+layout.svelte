<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { setAuthContext } from '$lib/context/auth-context.svelte';

	let { data, children } = $props();

	setAuthContext({
		get user() {
			return data.user;
		}
	});
</script>

<QueryClientProvider client={data.queryClient}>
	<div class="bg-gray-200 sm:p-4 flex flex-col min-h-screen">
		<div
			class="flex flex-col overflow-hidden sm:rounded-lg flex-1 w-full max-w-screen-sm mx-auto bg-white sm:shadow-lg sm:border-4 border-gray-400"
		>
			<Header />
			<div class="flex-1 px-4">
				{@render children()}
			</div>
			<Footer />
		</div>
	</div>
</QueryClientProvider>
