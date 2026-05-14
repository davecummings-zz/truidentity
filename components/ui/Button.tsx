import { cn } from '@/lib/utils'
import Link from 'next/link'
import { type ComponentPropsWithoutRef } from 'react'

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

type ButtonProps = ButtonBaseProps & ComponentPropsWithoutRef<'button'>
type LinkButtonProps = ButtonBaseProps & ComponentPropsWithoutRef<typeof Link> & { href: string }

const base =
  'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  primary: 'bg-navy text-white hover:bg-navy-600 focus-visible:ring-navy',
  secondary: 'bg-accent-orange text-navy hover:bg-accent-orange/90 focus-visible:ring-accent-orange',
  outline: 'border-2 border-navy text-navy hover:bg-navy hover:text-white focus-visible:ring-navy',
  ghost: 'text-navy hover:bg-navy/5 focus-visible:ring-navy',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2',
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
}

export function LinkButton({ variant = 'primary', size = 'md', className, href, ...props }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
}
