import type { FullCMSRecord } from "$lib";
import type { LayoutLoad } from "./$types";

export const load:LayoutLoad = async ({ fetch }) => {
  const cmslist = await (await fetch('/data.json')).json()
  return { cmslist } as { cmslist:FullCMSRecord[] }
}
