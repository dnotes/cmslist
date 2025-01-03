<script lang="ts">
  import { sections, type FullCMSRecord } from "$lib";
  import { kebabCase, snakeCase } from "lodash-es";

  export let cms:FullCMSRecord
</script>

<div class="prose prose-stone dark:prose-invert mx-auto prose-sm sm:prose-lg">

  <h2 class="flex mt-5 mb-2 sticky top-0 h-10 bg-white dark:bg-stone-900 z-20">
    {cms.title}
    {#if cms.rank && typeof cms.rank === 'number'}
      <span class="flex-grow"></span>
      <span class="font-bold text-stone-600 dark:text-stone-400">#{cms.rank}</span>
    {/if}
  </h2>

  {#each (Object.entries(sections) as [keyof typeof sections, string][]) as [sec, heading]}
    <section id="{kebabCase(sec)}">
      <h3 class="flex items-center sticky top-10 z-10 bg-white dark:bg-stone-900">{heading}</h3>
      {#each Object.entries(cms[sec]) as [key, value]}
        {#if key === 'summary'}
          <p class="my-2 leading-snug p-3">{value}</p>
        {:else}
          <div class="my-2 flex items-center">
            <div class="w-40 pr-4 sm:w-56 leading-tight font-bold">{kebabCase(key).replace(/-/g,' ')}:</div>
            <div>
              {#if Array.isArray(value)}
                {value.join(', ')}
              {:else if typeof value === 'number'}
                {value}
              {:else if typeof value === 'boolean' || value?.match(/^(?:yes|no|true|false|kinda)$/i)}
                {value}
              {:else if !value || value?.match(/^(?:n\/a|not applicable|not available)$/i)}
                N/A
              {:else}
                {value}
              {/if}
            </div>
          </div>
        {/if}
      {/each}
    </section>
  {/each}


</div>