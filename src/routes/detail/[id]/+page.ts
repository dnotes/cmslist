import type { FullCMSRecord } from "$lib"
import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"

export const load:PageLoad = async ({ fetch, params, parent }) => {
  const { cmslist } = await parent()

  const cms = cmslist.find((item:FullCMSRecord) => item.id === params.id.toLowerCase())

  if (!cms) {
    error(404, 'Not found')
  }

  return {
    cms
  }
}
