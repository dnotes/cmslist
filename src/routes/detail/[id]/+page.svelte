<script lang="ts">
  import CmsFull from '$lib/CMSFull.svelte';
  import CompareLinks from '$lib/CompareLinks.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<div class="prose prose-stone dark:prose-invert mx-auto prose-sm sm:prose-lg">
  <CmsFull cms={data.cms} isSingle />

  <div class="px-4">
    <CompareLinks current={[data.cms]} cmslist={data.cmslist} />
  </div>
</div>
