<script lang="ts">
	import type { PageData } from './$types';

	import List from '$lib/List.svelte';

	let { data }: { data: PageData } = $props();
</script>

<List data={data.cmslist} />