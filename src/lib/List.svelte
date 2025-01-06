<script lang="ts">

  import type { FullCMSRecord } from '$lib';
  import { allFields, sections, sectionList, normalizeFieldName, normalizeFieldValue } from "$lib";
  import { Datatable, TableHandler } from '@vincjo/datatables'
  import ThSort from './THSort.svelte';
  import ThFilter from './THFilter.svelte';
  import { get, indexOf } from 'lodash-es';
  import { settings } from './state.svelte';
  import ShowFields from './ShowFields.svelte';

  const { data }:{ data:FullCMSRecord[] } = $props()

  const table = new TableHandler(data)

  let sectionCounts = $derived.by(() => {
    let counts = Object.fromEntries(sectionList.map(l => [l, 0]))
    settings.selectedFields.forEach(f => {
      const section = f.split('.')[0]
      if (section) counts[section]++
    })
    return counts
  })

  let sectionsVisible = $derived(sectionList.filter(k => sectionCounts[k] > 0))

  const viewFields = allFields.map((f,index) => ({
    index,
    name: f.field,
    isVisible: settings.selectedFields.includes(f.field),
    isFrozen: f.field === 'title',
  }))

  const view = table.createView(viewFields)

</script>

<Datatable {table}>
  <table>
    <thead class="opaque">
      <tr class="opaque">
        {#each settings.selectedFields.filter(f => !f.match(/[\.\[]/)) as f}
          <th class="text-left z-50">
            {#if f === 'title'}
              <ShowFields {view} />
            {/if}
          </th>
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