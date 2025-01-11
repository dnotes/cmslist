<script lang="ts">
  import type { FullCMSRecord } from '$lib';
  import type { PageData } from './$types';
  const { data }:{ data:PageData } = $props();
  import { page } from '$app/state'
  import CmsFull from '$lib/CMSFull.svelte';
  import CompareLinks from '$lib/CompareLinks.svelte';
  import { screen } from '$lib/state.svelte'
  import AddCompare from '$lib/AddCompare.svelte';

  let ids = $derived(page.url.searchParams.getAll('ids').join(',').split(','))
  let items:FullCMSRecord[] = $derived(data.cmslist.filter(item => ids.includes(item.id)))

  let pagetitle = $derived.by(() => {
    if (items.length === 1) return `Compare ${items[0].title} with any other CMS`
    let words = items.slice(0,4).map(i => i.title).join(' vs. ')
    return items.length > 5 ? `${words} vs. ${items.length - 4} more` : words
  })

  let isMobile = $derived(screen.w < 640)
  let current = $state(0)

</script>

<svelte:head>
	<title>
  {pagetitle} | CMS List</title>
	<meta name="description" content="Compare the most popular content management systems." />
</svelte:head>

<div class="prose prose-stone dark:prose-invert mx-auto prose-sm sm:prose-lg grid grid-cols-{items.length + 1} gap-x-6"
  style="max-width:{isMobile ? '100%' : (224 + (items.length * 400)) + 'px'} !important;"
>

  {#if items.length}

    {#if !isMobile /** This is where we show the field names in a grid, but for mobile we show them with the content */}
    <CmsFull cms={items[0]} fieldsOnly>
      <AddCompare {ids} cmslist={data.cmslist} />
    </CmsFull>
    {/if}

    {#each items as cms, i}
      <CmsFull {cms} column={isMobile ? 1 : i+2} isSingle={isMobile} collapsed={i !== current && isMobile}>
        {#if isMobile}
          <AddCompare {ids} cmslist={data.cmslist} />
        {/if}
      </CmsFull>
    {/each}

    {#if isMobile}
      {#if current < items.length - 1}
        <button class="right-2 text-right swipe" onclick={()=>current++}>
          <span class="pr-3">
            {items[current+1].title}
          </span>
          &RightAngleBracket;
        </button>
      {/if}
      {#if current > 0}
        <button class="left-2 text-left swipe" onclick={()=>current--}>
          &LeftAngleBracket;
          <span class="pl-3">
            {items[current-1].title}
          </span>
        </button>
      {/if}
    {/if}

  {/if}

</div>

{#if items.length < 2}
  <div>
    <CompareLinks current={items} cmslist={data.cmslist} />
  </div>
{/if}

<style lang="postcss">
  button.swipe {
    @apply top-1 w-36 opacity-40 text-3xl font-bold fixed bg-transparent z-50 flex items-center;
  }
  button.swipe span {
    @apply text-xs w-28 leading-none;
  }
</style>