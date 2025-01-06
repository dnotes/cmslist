<script lang="ts">
  import { numberFields } from '$lib';
  import { get } from 'lodash-es';
  type Fn = (p:any)=>any

  let { table, field, children, shaded=false, isTernary=false } = $props();
  let sortField:string|Fn = field
  if (isTernary) sortField = (row) => {
    let value = get(row, field)
    switch (value) {
      case "kinda":
        return 1
      case true:
      case "yes":
        return 2
      default:
        return 0
    }
  }
  else if (field.match(/[\.\[]/)) sortField = (row:any) => get(row, field)

  const sort = table.createSort(sortField);

  let width:string = $state('w-36')
  if (field === 'rank') width = 'w-12'
  else if (field === 'title') width='w-17 sm:w-36 md:w-48'
  else if (field.endsWith('summary')) width = 'w-96'
  else if (isTernary || numberFields.includes(field)) width = 'w-20'

</script>

<th onclick={() => sort.set()}
  class:active={sort.isActive}
  class:shaded
  class="cursor-pointer">
  <div class="flex items-center {width}">
    <i class="w-3 flex-grow-0 flex-shrink-0"
      class:asc={sort.direction === 'asc'}
      class:desc={sort.direction === 'desc'}>
    </i>
    <span class="line-clamp-2 text-left block leading-[.75em] flex-grow overflow-visible">
      {@render children()}
    </span>
  </div>
</th>


<style>
    i:before,
    i:after {
        border: 4px solid transparent;
        content: '';
        display: block;
        height: 0;
        width: 0;
    }
    i:before {
        border-bottom-color: var(--grey, #e0e0e0);
        margin-top: 2px;
    }
    i:after {
        border-top-color: var(--grey, #e0e0e0);
        margin-top: 2px;
    }
    th.active i.asc:before {
        border-bottom-color: var(--font-grey, #9e9e9e);
    }
    th.active i.desc:after {
        border-top-color: var(--font-grey, #9e9e9e);
    }
</style>