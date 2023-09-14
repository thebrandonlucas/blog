<script lang="ts">
	import { page } from '$app/stores';
	import Articles from '../Markdown/Articles.md';
	import Blog from '../Markdown/Blog.md';

	$: selectedTab = $page.url.searchParams.get('tab') || 'articles';
</script>

{#if selectedTab === 'articles'}
	<Articles />
{:else if selectedTab === 'blog'}
	<Blog />
{/if}
