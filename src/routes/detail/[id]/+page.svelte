<script lang="ts">
  import CmsFull from '$lib/CMSFull.svelte';
import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<CmsFull cms={data.cms} />