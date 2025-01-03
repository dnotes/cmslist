import { json } from '@sveltejs/kit';
import type { CMSRecord } from '$lib/index.d'
import { sortBy } from 'lodash-es'

const research = import.meta.glob('/research/*.json', { eager: true })
const survey = research['/research/w3techs-survey.json'] as {
  [key:string]: {
    webMarketShare: number
    cmsMarketShare: number
  }
}
const w3techsRanks = Object.keys(survey)

export async function GET() {
  const files:Record<string,CMSRecord> = import.meta.glob('/content/cms/*.json', { eager: true });

  const collatedData = sortBy(
    Object.entries(files).map(([filepath, content]) => ({
      id: filepath.split('/').pop()?.replace('.json', ''),
      webMarketShare: survey[content.title].webMarketShare || 0,
      cmsMarketShare: survey[content.title].cmsMarketShare || 0,
      w3techsRank: w3techsRanks.indexOf(content.title) + 1,
      ...content
    })),
    'webMarketShare'
  )
  .reverse()
  .map((record, idx) => ({
    ...record,
    rank: record.webMarketShare ? idx + 1 : "N/A",
    webMarketShare: record.webMarketShare || "N/A",
    cmsMarketShare: record.cmsMarketShare || "N/A",
  }))

  return json(collatedData);
}
