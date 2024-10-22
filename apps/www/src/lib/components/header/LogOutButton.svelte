<script>
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
</script>

<li>
	<form
		action="/logout"
		method="post"
		use:enhance={() => {
			return () => {
				invalidate('auth');
			};
		}}
	>
		<button class="font-medium text-white px-2">Log Out</button>
	</form>
</li>
