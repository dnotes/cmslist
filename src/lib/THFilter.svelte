<script lang="ts">
  let { table, field, check = undefined, isTernary=false, shaded=false } = $props();
  const filter = table.createFilter(field, check);
</script>

<th class:shaded class="text-xs text-stone-600 dark:text-stone-400">
  {#if isTernary}
    <select class="bg-inherit"
      bind:value={filter.value}
      onchange={() => filter.set()}>
      <option value="">All</option>
      <option value="no">☐</option>
      <option value="kinda">⚠︎</option>
      <option value="yes">☑︎</option>
    </select>
  {:else}
    <input
      class="bg-inherit w-full px-1 font-normal"
      type="text"
      placeholder={table.i18n.filter}
      spellcheck="false"
      bind:value={filter.value}
      oninput={() => filter.set()}
    />
  {/if}
</th>

<style>
</style>
