<script lang="ts">
  import { goto } from "$app/navigation";
  import type { FullCMSRecord } from "$lib";

  let { ids, cmslist }:{ ids:string[], cmslist:FullCMSRecord[] } = $props()

  let others = $derived(cmslist.filter(item => !ids.includes(item.id)))

  let addComparison:string = $state('')
</script>

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