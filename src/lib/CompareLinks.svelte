<script lang="ts">
  type Link = {
    id: string;
    title: string;
    [key:string]: any;
  }
  type Props = {
    current: Link[]
    cmslist: Link[]
  }

  import { sortBy } from 'lodash-es'

  const { current, cmslist }:Props = $props();

  let items:Link[] = $state([])

  $effect(() => {
    items = sortBy(cmslist.filter(item => {
      return !current.find(f => f.id === item.id)
    }), ['id'])
  })
</script>

<h4>Compare:</h4>
{#each items as item}
<a href="/compare?ids={([item.id, ...current.map(c => c.id)]).sort().join(',')}">
  +{item.title}<i>,</i>
</a>
{/each}

<style lang="postcss">
  a {
    @apply no-underline hover:underline text-xs;
  }
  i { margin-right:4px; }
  a:last-child i { display:none; }
</style>