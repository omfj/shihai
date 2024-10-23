<script lang="ts">
	import Form from '$lib/components/form/Form.svelte';
	import FormControlLabel from '$lib/components/form/FormControl/FormControlLabel.svelte';
	import FormControlRoot from '$lib/components/form/FormControl/FormControlRoot.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<h1 class="text-2xl font-medium mb-4">Profile</h1>

<Form>
	<FormControlRoot>
		<FormControlLabel>Username</FormControlLabel>
		<Input readonly class="read-only:cursor-not-allowed" value={data.user.username} />
	</FormControlRoot>

	<FormControlRoot>
		<FormControlLabel>Email</FormControlLabel>
		<Input readonly class="read-only:cursor-not-allowed" value={data.user.email} />
	</FormControlRoot>
</Form>
