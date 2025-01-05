<script lang="ts">

  import type { FullCMSRecord } from '$lib';
  import { allFields, sections, sectionList, normalizeFieldName, normalizeFieldValue } from "$lib";
  import { Datatable, TableHandler } from '@vincjo/datatables'
  import ThSort from './THSort.svelte';
  import ThFilter from './THFilter.svelte';
  import { get, indexOf } from 'lodash-es';

  const { data }:{ data:FullCMSRecord[] } = $props()

  const table = new TableHandler(data)

  let selectedFields = $state([
    'title',
    'rank',
    'webMarketShare',
    'architecture.paradigm',
    'architecture.serverAdminRequired',
    'legal.softwareLicense',
    'legal.corporateStructure',
    'userManagement.paradigm',
    'contentEditing.paradigm',
    'contentDisplay.frontendDeveloperRequired',
    'contentDisplay.supportsPackagedThemes',
    'contentDisplay.themeMarketplace',
    'internationalization.multilingualContent',
    'extensibility.backendDeveloperRequired',
    'extensibility.extensionMarketplace',
    'commerce.isInCore',
    'commerce.isInExtensions',
    'costs.paradigm',
    'costs.estimatedYearOneTotal',
  ])

  let sectionCounts = $state(
    sectionList.reduce((acc, section) => {
      acc[section] = countFields(section)
      return acc
    }, {} as Partial<Record<keyof typeof sections, number>>) as Record<keyof typeof sections, number>
  )

  let sectionsVisible = $derived(sectionList.filter(k => sectionCounts[k] > 0))


  let viewFields = allFields.map((f,index) => ({
    index,
    name: f.label || normalizeFieldName(f.field),
    isVisible: selectedFields.includes(f.field),
    isFrozen: f.field === 'title',
  }))

  const view = table.createView(viewFields)

  function countFields(str:string) {
    return allFields
      .filter(f => str ? f.field.startsWith(str) : !f.field.match(/[\.\[]/))
      .filter(f => selectedFields.includes(f.field))
      .length
  }

  $effect(() => {
    console.log(sectionCounts)
  })

</script>

<Datatable {table}>
  <table>
    <thead class="opaque">
      <tr class="opaque">
        {#each selectedFields.filter(f => !f.match(/[\.\[]/)) as f}
          <th></th>
        {/each}
        {#each sectionsVisible as sec, i}
          <th class="text-xs text-stone-600 dark:text-stone-400"
            class:shaded={i%2 === 0}
            colspan={sectionCounts[sec]}>
            {sections[sec]}
          </th>
        {/each}
      </tr>
      <tr class="opaque">
        {#each allFields.filter(f => !f.field.match(/[\.\[]/)) as f}
          <ThSort field={f.field} {table}>{f.label || normalizeFieldName(f.field)}</ThSort>
        {/each}
        {#each Object.keys(sections) as sec, i}
          {#each allFields.filter(f => f.field.startsWith(sec + '.')) as f}
            <ThSort field={f.field} {table} isTernary={f.isTernary} shaded={indexOf(sectionsVisible, sec)%2===0}><span class="text-xs">{f.label || normalizeFieldName(f.field)}</span></ThSort>
          {/each}
        {/each}
      </tr>
      <tr class="opaque">
        {#each allFields.filter(f => !f.field.match(/[\.\[]/)) as f}
          <ThFilter field={(data:any)=>get(data, f.field)} {table} isTernary={f.isTernary} />
        {/each}
        {#each Object.keys(sections) as sec}
          {#each allFields.filter(f => f.field.startsWith(sec + '.')) as f}
            <ThFilter field={(data:any)=>get(data, f.field)} {table} isTernary={f.isTernary} shaded={indexOf(sectionsVisible, sec)%2===0}/>
          {/each}
        {/each}
      </tr>
    </thead>
    <tbody class="overflow-auto">
      {#each table.rows as row}
        <tr>
          {#each allFields as f, i}
            <td
              class="{f.isTernary ? 'text-2xl' : 'text-sm'}"
              class:text-center={f.isTernary || f.isNumber}
              class:opaque={viewFields[i].isFrozen}
              class:shaded={indexOf(sectionsVisible, f.field.split('.')[0])%2===0}>
              {#if f.field === 'title'}
                <a href="/detail/{row.id}">{row.title}</a>
              {:else}
                {f.transform ? f.transform(normalizeFieldValue(get(row, f.field))) : normalizeFieldValue(get(row, f.field))}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</Datatable>

<style lang="postcss">
  table .opaque {
    @apply bg-white dark:bg-stone-900 !important;
  }
  th {
    display: table-cell !important;
  }
  :global(th.shaded, td.shaded) {
    @apply bg-stone-100 dark:bg-stone-800 !important;
  }
  :global(tbody tr:hover, tbody tr:hover td, tbody tr:hover td.opaque) {
    @apply bg-cyan-100 dark:bg-cyan-800 !important;
  }
  :global(td) {
    @apply py-px px-2 sm:px-2 md:py-1 md:px-3 !important;
  }
</style>