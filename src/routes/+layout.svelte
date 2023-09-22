<script>
	import { page } from '$app/stores';
	import '../app.css';
	import Icon from '../components/Icon/Icon.svelte';
	import { themeIcon, toggleDarkMode } from '../lib/theme';

	$: selectedTab = $page.url.searchParams.get('tab') || 'articles';
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
		<a class="text-3xl no-underline hover:text-gray-500 transition-all font-bold" href="/">
			Brandon Lucas
		</a>
		<div class="flex gap-2 items-center">
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
			<button
				class="hover:text-gray-500 dark:hover:text-gray-500 dark:text-white text-black transition-all text-4xl"
				on:click={toggleDarkMode}
			>
				<Icon name={$themeIcon} />
			</button>
		</div>
	</div>
	<div class="flex gap-8">
		<a href="/?tab=articles" class={`${selectedTab === 'articles' && 'selected'}`}>Articles</a>
		<a href="/?tab=blog" class={`${selectedTab === 'blog' && 'selected'}`}>Blog</a>
	</div>
	<div>
		<slot />
	</div>
</div>

<style lang="postcss">
	a {
		@apply no-underline;
	}
	.selected {
		@apply underline;
	}
</style>
