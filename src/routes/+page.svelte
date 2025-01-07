<script lang="ts">
	import type { PageData } from './$types';

	import List from '$lib/List.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>CMS List | Content is king.</title>
	<meta name="description" content="Compare the most popular content management systems." />
</svelte:head>

<List data={data.cmslist} />