<script>
	import { invalidateAll } from '$app/navigation';
	import { logout } from '$lib/api/auth/auth.fetch';

	const handleLogout = async () => {
		await logout();
		await invalidateAll();
	};
</script>

<li>
	<button
		onclick={handleLogout}
		class="font-medium text-gray-600 hover:text-gray-900 transition-all px-2">Log Out</button
	>
</li>
