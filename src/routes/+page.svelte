<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

{#each data.cmslist as item}
  <div><a href="/detail/{item.id}">{item.title}</a></div>
{/each}