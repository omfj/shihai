<script>
	import { enhance } from '$app/forms';
</script>

<li>
	<form action="/logout" method="post" use:enhance>
		<button class="font-medium text-gray-600 hover:text-gray-900 transition-all px-2"
			>Log Out</button
		>
	</form>
</li>
