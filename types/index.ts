export type Locale = 'en' | 'es'

export interface Review {
  authorName: string
  rating: number
  text: string
  relativePublishTime: string
  avatarInitials: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
