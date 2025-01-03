import type { LayoutLoad } from "./$types";

export const load:LayoutLoad = async ({ fetch }) => {
  const cmslist = await (await fetch('/data.json')).json()
  return { cmslist }
}
