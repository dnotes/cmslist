import { kebabCase } from 'lodash-es'

type yesNoKinda = 'yes'|'no'|'kinda'

export type CMSRecord = {
  title: string
  webMarketShare?: number
  cmsMarketShare?: number
  architecture: {
    paradigm: 'SaaS'|'server install'|'static site generator'|'headless API'
    serverAdminRequired: yesNoKinda
    backendLanguage: 'PHP'|'Java'|'Javascript'|'Ruby'|'Python'|'Go'|'Rust'|string
    extensionLanguageTech: ('PHP'|'Java'|'Javascript'|'Ruby'|'Python'|'Go'|'Rust'|string)[]
    frontendLanguageTech: ('Javascript'|'React'|'Vue'|'Svelte'|'jQuery'|string)[]
    contentStorage: ('SQL'|'NoSQL'|'Graph'|'Markdown'|string)[]
    hostingOptions: ('shared'|'vps'|'managed'|'serverless'|'container')[]
    apiOptions: ('REST'|'GraphQL'|'custom'|'other'|'none'|string)[]
    summary: string
  }
  targetUsers: {
    individualHobbyist: yesNoKinda
    singleDeveloper: yesNoKinda
    smallDevelopmentTeam: yesNoKinda
    largeDevelopmentTeam: yesNoKinda
    singleContentEditor: yesNoKinda
    smallContentTeam: yesNoKinda
    largeContentTeam: yesNoKinda
    enterpriseCorporation: yesNoKinda
    summary: string
  }
  legal: {
    softwareLicense: 'open-source: copyleft'|'open-source: permissive'|'proprietary'
    corporateStructure: 'non-profit'|'commercial'|'community'|'none'
    summary: string
  }
  userManagement: {
    paradigm: ('self-contained'|'oauth'|'none')[]
    summary: string
  }
  contentEditing: {
    paradigm: 'web form'|'in-place editor'|'drag and drop'|'text editor'
    onSiteEditing: yesNoKinda
    customFields: yesNoKinda
    customContentTypes: yesNoKinda
    versioning: yesNoKinda
    previewing: yesNoKinda
    editingWorkflows: yesNoKinda
    realTimeCollaboration: yesNoKinda
    summary: string
  }
  contentDisplay: {
    frontendDeveloperRequired: yesNoKinda
    supportsPackagedThemes: yesNoKinda
    themeMarketplace: yesNoKinda
    paidThemes: yesNoKinda
    supportsOnSiteDisplayCustomization: yesNoKinda
    summary: string
  }
  mobileSupport: {
    isResponsiveDesign: yesNoKinda
    createsPWA: yesNoKinda
    createsNativeApp: yesNoKinda
    summary: string
  }
  internationalization: {
    multilingualContent: yesNoKinda
    multilingualUI: yesNoKinda
    multilingualEditor: yesNoKinda
    summary: string
  }
  extensibility: {
    backendDeveloperRequired: yesNoKinda
    extensionMarketplace: yesNoKinda
    paidExtensions: yesNoKinda
    summary: string
  }
  commerce: {
    isInCore: yesNoKinda
    isInExtensions: yesNoKinda
    integratedPlatforms: string[]
    integratedPaymentGateways: string[]
    summary: string
  }
  costs: {
    paradigm: ('per site'|'per content item'|'per transaction'|'per content type'|'per developer'|'per editor'|'free tier'|'free')[]
    subscription: number
    softwareLicense: number
    estimatedYearOneTotal: number
    summary: string
  }
}

export type FullCMSRecord = Omit<CMSRecord, 'webMarketShare'|'cmsMarketShare'> & {
  id:string
  webMarketShare: number|'N/A'
  cmsMarketShare: number|'N/A'
  rank: number|'N/A'
}

export const sections = {
  'architecture': 'Architecture',
  'targetUsers': 'Target Users',
  'legal': 'Legal',
  'userManagement': 'User Management',
  'contentEditing': 'Content Editing',
  'contentDisplay': 'Content Display',
  'mobileSupport': 'Mobile Support',
  'internationalization': 'Multilingual Support',
  'extensibility': 'Extensibility',
  'commerce': 'Commerce',
  'costs': 'Costs',
} as const

export const sectionList: (keyof typeof sections)[] = Object.keys(sections) as (keyof typeof sections)[]

export type FieldDefinition = {
  field: string
  label?: string
  isTernary?: boolean
  isFalseGood?: boolean
  isNumber?: boolean
  transform?: (value:any) => string
}

export const allFields:FieldDefinition[] = [
  {
    field: 'title',
    label: 'CMS Name',
  },
  {
    field: 'rank',
    isNumber: true,
  },
  {
    field: 'webMarketShare',
    label: 'web %',
    isNumber: true,
    transform: (v) => v ? `${v}%` : 'N/A',
  },
  {
    field: 'cmsMarketShare',
    label: 'cms %',
    isNumber: true,
    transform: (v) => v ? `${v}%` : 'N/A',
  },
  {
    field: 'architecture.paradigm',
    label: 'paradigm',
  },
  {
    field: 'architecture.serverAdminRequired',
    label: 'server admin req.',
    isTernary: true,
    isFalseGood: true,
  },
  {
    field: 'architecture.backendLanguage',
    label: 'backend lang.',
  },
  {
    field: 'architecture.extensionLanguageTech',
    label: 'extension lang/tech',
  },
  {
    field: 'architecture.frontendLanguageTech',
    label: 'frontend lang/tech',
  },
  {
    field: 'architecture.contentStorage',
  },
  {
    field: 'architecture.hostingOptions',
  },
  {
    field: 'architecture.apiOptions',
  },
  {
    field: 'architecture.summary',
  },
  {
    field: 'targetUsers.individualHobbyist',
    label: 'hobbyist',
    isTernary: true,
  },
  {
    field: 'targetUsers.singleDeveloper',
    label: 'single dev',
    isTernary: true,
  },
  {
    field: 'targetUsers.smallDevelopmentTeam',
    label: 'small dev team',
    isTernary: true,
  },
  {
    field: 'targetUsers.largeDevelopmentTeam',
    label: 'large dev team',
    isTernary: true,
  },
  {
    field: 'targetUsers.singleContentEditor',
    label: 'single content editor',
    isTernary: true,
  },
  {
    field: 'targetUsers.smallContentTeam',
    label: 'small content team',
    isTernary: true,
  },
  {
    field: 'targetUsers.largeContentTeam',
    label: 'large content team',
    isTernary: true
  },
  {
    field: 'targetUsers.enterpriseCorporation',
    label: 'enterprise',
    isTernary: true,
  },
  {
    field: 'targetUsers.summary',
  },
  {
    field: 'legal.softwareLicense',
    label: 'license',
    transform: (v) => v.replace(/^open-source: /, '')
  },
  {
    field: 'legal.corporateStructure',
    label: 'corp. structure',
  },
  {
    field: 'legal.summary',
  },
  {
    field: 'userManagement.paradigm',
    label: 'paradigm',
  },
  {
    field: 'userManagement.summary',
  },
  {
    field: 'contentEditing.paradigm',
    label: 'paradigm',
  },
  {
    field: 'contentEditing.onSiteEditing',
    label: 'on-site editing',
    isTernary: true,
  },
  {
    field: 'contentEditing.customFields',
    isTernary: true,
  },
  {
    field: 'contentEditing.customContentTypes',
    isTernary: true,
  },
  {
    field: 'contentEditing.versioning',
    isTernary: true,
  },
  {
    field: 'contentEditing.previewing',
    isTernary: true,
  },
  {
    field: 'contentEditing.realTimeCollaboration',
    label: 'real-time collaboration',
    isTernary: true,
  },
  {
    field: 'contentEditing.editingWorkflows',
    isTernary: true,
  },
  {
    field: 'contentEditing.summary',
  },
  {
    field: 'contentDisplay.frontendDeveloperRequired',
    label: 'frontend dev req.',
    isTernary: true,
    isFalseGood: true,
  },
  {
    field: 'contentDisplay.supportsPackagedThemes',
    label: 'packaged themes',
    isTernary: true,
  },
  {
    field: 'contentDisplay.themeMarketplace',
    label: 'theme market',
    isTernary: true,
  },
  {
    field: 'contentDisplay.paidThemes',
    isTernary: true,
  },
  {
    field: 'contentDisplay.supportsOnSiteDisplayCustomization',
    label: 'on-site customization',
    isTernary: true,
  },
  {
    field: 'contentDisplay.summary',
  },
  {
    field: 'mobileSupport.isResponsiveDesign',
    label: 'responsive',
    isTernary: true,
  },
  {
    field: 'mobileSupport.createsPWA',
    label: 'creates PWA',
    isTernary: true,
  },
  {
    field: 'mobileSupport.createsNativeApp',
    isTernary: true,
  },
  {
    field: 'mobileSupport.summary',
  },
  {
    field: 'internationalization.multilingualContent',
    isTernary: true,
  },
  {
    field: 'internationalization.multilingualUI',
    label: 'multilingual UI',
    isTernary: true,
  },
  {
    field: 'internationalization.multilingualEditor',
    isTernary: true,
  },
  {
    field: 'internationalization.summary',
  },
  {
    field: 'extensibility.backendDeveloperRequired',
    label: 'backend dev req.',
    isTernary: true,
    isFalseGood: true,
  },
  {
    field: 'extensibility.extensionMarketplace',
    label: 'extension market',
    isTernary: true,
  },
  {
    field: 'extensibility.paidExtensions',
    isTernary: true,
  },
  {
    field: 'extensibility.summary',
  },
  {
    field: 'commerce.isInCore',
    isTernary: true,
  },
  {
    field: 'commerce.isInExtensions',
    isTernary: true,
  },
  {
    field: 'commerce.integratedPlatforms',
  },
  {
    field: 'commerce.integratedPaymentGateways',
  },
  {
    field: 'commerce.summary',
  },
  {
    field: 'costs.paradigm',
  },
  {
    field: 'costs.subscription',
    isNumber: true,
    transform: (v) => v ? `$ ${v.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')}` : '-'
  },
  {
    field: 'costs.softwareLicense',
    label: 'software',
    isNumber: true,
    transform: (v) => v ? `$ ${v.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')}` : '-'
  },
  {
    field: 'costs.estimatedYearOneTotal',
    label: 'first year estimate',
    isNumber: true,
    transform: (v) => v ? `$ ${v.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')}` : '-'
  },
  {
    field: 'costs.summary',
  }
]

export const numberFields = allFields.filter(f => f.isNumber).map(f => f.field)

export function normalizeFieldName(field: string) {
  return kebabCase(field.replace(/.+\./,''))
    .replace(/-/g, ' ')
    .toLowerCase()
}

export function normalizeFieldValue(value:any) {
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'number') return value
  if (typeof value === 'boolean' || value?.match(/^(?:yes|no|true|false|kinda)$/i)) return ternaryField(value)
  if (!value || value?.match(/^(?:n\/a|not applicable|not available)$/i)) return 'N/A'
  return value
}

export function ternaryField(value:true|false|'kinda'|'yes'|'no') {
  if (value === 'kinda') return '⚠︎'
  if (value === true || value === 'yes') return '☑︎'
  return '☐'
}