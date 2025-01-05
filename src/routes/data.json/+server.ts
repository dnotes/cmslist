import { json } from '@sveltejs/kit';
import type { CMSRecord, FullCMSRecord } from '$lib'
import { sortBy } from 'lodash-es'

export const prerender = true

const research = import.meta.glob('/research/*.json', { eager: true }) as Record<string,{default:any}>
const survey = research['/research/w3techs-survey.json'].default as {
  [key:string]: {
    webMarketShare: number
    cmsMarketShare: number
  }
}
const w3techsRanks = Object.keys(survey)

export async function GET() {

  const files:Record<string,CMSRecord> = import.meta.glob('/content/cms/*.json', { eager: true });
  const collatedData:FullCMSRecord[] = sortBy(
    Object.entries(files).map(([filepath, content]) => ({
      id: filepath.split('/').pop()!.replace('.json', ''),
      webMarketShare: survey[content.title]?.webMarketShare || 0,
      cmsMarketShare: survey[content.title]?.cmsMarketShare || 0,
      w3techsSort: -(content.cmsMarketShare ?? survey[content.title]?.cmsMarketShare ?? 0),
      w3techsRank: w3techsRanks.indexOf(content.title) + 1,
      ...content
    })),
    ['w3techsSort', 'w3techsRank']
  )
  .map((record, idx) => {
    return {
      ...record,
      rank: record.webMarketShare ? idx + 1 : "N/A",
    }
  })

  return json(collatedData);
}
