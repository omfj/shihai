<script>
	import { enhance } from '$app/forms';
</script>

<li>
	<form action="/logout" method="post" use:enhance>
		<button class="font-medium text-white px-2">Log Out</button>
	</form>
</li>
