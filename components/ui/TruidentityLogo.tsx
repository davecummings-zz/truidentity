import { cn } from '@/lib/utils'

interface TruidentityLogoProps {
  className?: string
}

export function TruidentityLogo({ className }: TruidentityLogoProps) {
  return (
    <svg
      viewBox="0 0 220 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-auto', className)}
      role="img"
      aria-label="TruIdentity Screening Solutions"
    >
      {/* Shield icon */}
      <path
        d="M4 6L22 2L40 6V18C40 28 32 36 22 40C12 36 4 28 4 18V6Z"
        fill="#1B3A5C"
      />
      <path
        d="M4 6L22 2L40 6V18C40 28 32 36 22 40C12 36 4 28 4 18V6Z"
        fill="url(#shieldGrad)"
        opacity="0.3"
      />
      {/* Fingerprint arcs */}
      <path d="M16 20C16 16.686 18.686 14 22 14C25.314 14 28 16.686 28 20" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M13 20C13 15.029 17.029 11 22 11C26.971 11 31 15.029 31 20" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M19 22C19 20.343 20.343 19 22 19C23.657 19 25 20.343 25 22C25 23.657 23.657 25 22 25" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Wordmark */}
      <text
        x="48"
        y="26"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="16"
        fontWeight="700"
        fill="#1B3A5C"
        letterSpacing="-0.3"
      >
        TruIdentity
      </text>
      <text
        x="48"
        y="38"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="8.5"
        fontWeight="500"
        fill="#2E75B6"
        letterSpacing="0.5"
      >
        SCREENING SOLUTIONS
      </text>

      <defs>
        <linearGradient id="shieldGrad" x1="4" y1="2" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2E75B6" />
          <stop offset="1" stopColor="#1B3A5C" />
        </linearGradient>
      </defs>
    </svg>
  )
}
