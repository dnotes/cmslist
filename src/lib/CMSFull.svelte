<script lang="ts">
  import { allFields, fieldsAndHeadings, normalizeFieldValue, sections, type FullCMSRecord } from "$lib";
  import { get, kebabCase } from "lodash-es";
  import CompareLinks from "./CompareLinks.svelte";

  import { page } from '$app/state'

  const {
    cms,
    column = 1,
    isSingle = false,
    fieldsOnly = false,
    children
  }:{
    cms:FullCMSRecord,
    column?:number,
    isSingle?:boolean,
    fieldsOnly?:boolean,
    children?:any
  } = $props()

  let comparisons = $derived(page.url.searchParams.getAll('ids').join(',').split(','))
  let closelink = $derived(comparisons.filter((id => id !== cms.id)).join(','))

</script>

<h2 class="flex mt-5 mb-2 sticky top-0 h-10 bg-white dark:bg-stone-900 z-20">
  {#if !fieldsOnly}
    {cms.title}
    {#if !isSingle}
      <a href="/compare?ids={closelink}"
      class:hidden={!closelink}
      class="text-sm text-gray-500 no-underline relative left-2
      flex items-center justify-center w-5 h-5 rounded-full border border-gray-500">
        X
      </a>
    {/if}
  {:else}
    {@render children?.()}
  {/if}
  {#if cms.rank && typeof cms.rank === 'number' && isSingle}
    <span class="flex-grow"></span>
    <span class="font-bold text-stone-600 dark:text-stone-400">#{cms.rank}</span>
  {/if}
</h2>

{#each fieldsAndHeadings as {id,label}, idx}
  {#if idx < 1} <!-- unused fields -->
  {:else if sections.hasOwnProperty(id)} <!-- heading -->
    <h3 id="{kebabCase(id)}"
      style="grid-row:{idx+1}; grid-column:{column};"
      class="flex items-center sticky top-10 z-10 bg-white dark:bg-stone-900"
    >
      {#if isSingle || fieldsOnly}
        {label}
      {/if}
    </h3>
  {:else}
    {#if id.endsWith('summary')}
      <div style="grid-row:{idx+1}; grid-column:{column};">
        {#if fieldsOnly}
          summary
        {:else}
          <p class="my-2 leading-snug {isSingle ? 'p-3' : 'text-sm'}">{get(cms, id)}</p>
        {/if}
      </div>
    {:else}
      <div class="my-2 flex items-center" style="grid-row:{idx+1}; grid-column:{column};">
        {#if isSingle || fieldsOnly}
          <div class="w-40 pr-4 sm:w-56 leading-tight font-bold">
            {label}:
          </div>
        {/if}
        {#if !fieldsOnly}
          <div>
            {normalizeFieldValue(get(cms, id))}
          </div>
        {/if}
      </div>
    {/if}
  {/if}
{/each}

