import type { CSSProperties } from 'react'
import { ViewportReveal } from './ViewportReveal'

interface InvitationFloralsProps {
  enabled: boolean
}

interface FloralSpec {
  className: string
  delay: number
  height: number
  name: string
  width: number
}

const FLORALS: FloralSpec[] = [
  {
    name: 'yellow-daisy',
    className: 'yellow-daisy',
    delay: 0,
    width: 231,
    height: 473,
  },
  {
    name: 'golden-twig',
    className: 'golden-twig',
    delay: 550,
    width: 294,
    height: 467,
  },
  {
    name: 'pink-wildflowers',
    className: 'pink-wildflowers',
    delay: 1100,
    width: 332,
    height: 498,
  },
  {
    name: 'sage-sprig',
    className: 'sage-sprig',
    delay: 1650,
    width: 291,
    height: 497,
  },
  {
    name: 'green-branch',
    className: 'green-branch',
    delay: 2200,
    width: 353,
    height: 497,
  },
  {
    name: 'pink-bloom',
    className: 'pink-bloom',
    delay: 2750,
    width: 359,
    height: 468,
  },
]

export function InvitationFlorals({ enabled }: InvitationFloralsProps) {
  return (
    <div className="invitation-card__florals" aria-hidden="true">
      {FLORALS.map(({ className, delay, height, name, width }) => (
        <ViewportReveal
          className={`invitation-card__floral invitation-card__floral--${className}`}
          enabled={enabled}
          key={name}
          style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
        >
          <img
            src={`/assets/invitation-florals/${name}.webp`}
            alt=""
            draggable="false"
            decoding="async"
            width={width}
            height={height}
          />
        </ViewportReveal>
      ))}
    </div>
  )
}
