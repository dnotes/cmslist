<script lang="ts">
  import type { FullCMSRecord } from '$lib';
  import type { PageData } from './$types';
  const { data }:{ data:PageData } = $props();
  import { page } from '$app/state'
  import CmsFull from '$lib/CMSFull.svelte';

  let ids = page.url.searchParams.getAll('ids').join(',').split(',')
  let items:FullCMSRecord[] = data.cmslist.filter(item => ids.includes(item.id))

</script>

<div class="prose prose-stone dark:prose-invert mx-auto prose-sm sm:prose-lg grid grid-cols-{items.length + 1} gap-x-6"
  style="max-width:{224 + (items.length * 400)}px !important;"
>

  {#if items.length}
    <CmsFull cms={items[0]} fieldsOnly/>
    {#each items as cms, i}
      <CmsFull {cms} column={i+2} />
    {/each}
  {/if}

</div>