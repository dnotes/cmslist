<script lang="ts">
  import type { FullCMSRecord } from '$lib';
  import type { PageData } from './$types';
  const { data }:{ data:PageData } = $props();
  import { page } from '$app/state'
  import CmsFull from '$lib/CMSFull.svelte';
  import CompareLinks from '$lib/CompareLinks.svelte';
  import { goto } from '$app/navigation';

  let ids = $derived(page.url.searchParams.getAll('ids').join(',').split(','))
  let items:FullCMSRecord[] = $derived(data.cmslist.filter(item => ids.includes(item.id)))

  let others = $derived(data.cmslist.filter(item => !ids.includes(item.id)))
  let addComparison:string = $state('')

</script>

<div class="prose prose-stone dark:prose-invert mx-auto prose-sm sm:prose-lg grid grid-cols-{items.length + 1} gap-x-6"
  style="max-width:{224 + (items.length * 400)}px !important;"
>

  {#if items.length}
    <CmsFull cms={items[0]} fieldsOnly>
      <select
        aria-label="Add comparison"
        name="add-comparison"
        id="add-comparison"
        bind:value={addComparison}
        class="bg-stone-200 dark:bg-stone-800 text-stone-500 w-36 text-xs inline-block"
      >
        <option value="">+ add comparison</option>
        {#each others as link}
          <option value="{link.id}">{link.title}</option>
        {/each}
      </select>
      <button
        class="btn text-sm"
        onclick={()=>{
          if (addComparison) goto(`/compare?ids=${([...ids, addComparison]).sort().join(',')}`)
          addComparison = ''
        }}>
        Go
      </button>
    </CmsFull>
    {#each items as cms, i}
      <CmsFull {cms} column={i+2} />
    {/each}
  {/if}

</div>

{#if items.length < 4}
  <div>
    <CompareLinks current={items} cmslist={data.cmslist} />
  </div>
{/if}
