export type Locale = 'en' | 'es'

export interface Review {
  author: string
  rating: number
  date: string
  text: string
  avatarInitials: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
