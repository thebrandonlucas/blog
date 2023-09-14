<script>
	import '../app.css';
	import Icon from '../components/Icon/Icon.svelte';
	import { themeIcon, toggleDarkMode } from '../lib/theme';
</script>

<svelte:head>
	<title>Brandon's Blog</title>
	<meta
		name="description"
		content="Thoughts on things like Bitcoin, the Lightning Network, and random programming stuff, projects I've built, and more."
	/>
</svelte:head>

<div class="flex flex-col gap-8 prose dark:prose-invert justify-center items-center mx-auto mt-10">
	<div class="flex w-full justify-around">
		<a class="text-3xl no-underline hover:text-gray-500 transition-all font-bold" href="/"
			>Brandon Lucas</a
		>
		<div class="flex gap-2 items-baseline">
			<a
				class="text-4xl hover:text-gray-500 transition-all"
				target="_blank"
				rel="noreferrer"
				href="https://github.com/thebrandonlucas"><Icon name="github" /></a
			>
			<a
				class="text-4xl hover:text-gray-500 transition-all"
				target="_blank"
				rel="noreferrer"
				href="https://twitter.com/brandonstlucas"><Icon name="twitter" /></a
			>
			<button class="text-black dark:text-white" on:click={toggleDarkMode}
				><Icon name={$themeIcon} /></button
			>
		</div>
	</div>
	<div>
		<slot />
	</div>
</div>
