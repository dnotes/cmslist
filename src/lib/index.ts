
type yesNoKinda = 'yes'|'no'|'kinda'

export type CMSRecord = {
  title: string
  webMarketShare?: number
  cmsMarketShare?: number
  architecture: {
    paradigm: 'SaaS'|'server install'|'static site generator'|'headless API'
    serverAdminRequired: boolean
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
  'internationalization': 'Internationalization',
  'extensibility': 'Extensibility',
  'commerce': 'Commerce',
  'costs': 'Costs',
} as const