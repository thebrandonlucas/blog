<script>
	import '../app.css';
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-col gap-8 prose justify-center items-center mx-auto mt-10">
	<div class="flex w-full justify-around">
		<a class="text-3xl no-underline hover:text-gray-500 transition-all font-bold" href="/"
			>Brandon Lucas</a
		>
		<div class="flex gap-2">
			<a
				class="text-4xl hover:text-gray-500 transition-all"
				target="_blank"
				rel="noreferrer"
				href="https://github.com/thebrandonlucas"><Icon icon="mdi:github" /></a
			>
			<a
				class="text-4xl hover:text-gray-500 transition-all"
				target="_blank"
				rel="noreferrer"
				href="https://twitter.com/brandonstlucas"><Icon icon="mdi:twitter" /></a
			>
		</div>
	</div>
	<div>
		<slot />
	</div>
</div>
