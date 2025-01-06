<script lang="ts">
  import { settings } from '$lib/state.svelte'
  import { allFields, normalizeFieldName, sections } from '$lib';
  let { view } = $props()
  let isOpen = $state(false)
</script>

<div class="relative">
  <button
    aria-label="Show fields"
    class="text-2xl p-2 relative z-50"
    onclick={() => isOpen = !isOpen}
  >
    ☰
  </button>

  {#if isOpen}
    <div
      role="dialog"
      aria-label="Field list"
      class="absolute top-12 left-0 z-40 w-72 h-[500px] overflow-scroll bg-white dark:bg-stone-800 shadow-lg p-4 rounded-bl-lg"
    >

      <h2 class="text-lg font-bold">Show Fields</h2>
      {#each allFields as f,i}
        {#if f.section && f.section !== allFields[i-1]?.section}
          <h3 class="text-lg mt-2 mb-1 font-bold">{sections[f.section]}</h3>
        {/if}
        <label
          class="block p-1"
          class:hidden={f.field === 'title'}
          title={normalizeFieldName(f.field)}>
          <input
            type="checkbox"
            disabled={f.field === 'title'}
            value={f.field}
            bind:group={settings.selectedFields}
            onchange={()=>view.toggle(f.field)}
          />
          {f.label || normalizeFieldName(f.field)}
        </label>
      {/each}
    </div>
  {/if}
</div>
