import { memo, type CSSProperties, type ReactNode } from 'react'

export interface ButterflySpec {
  x: number
  y: number
  facing: number
  variant: number
  placement: 'field' | 'flower-tip'
  driftX: number
  driftY: number
  driftDelay: number
  flapDelay: number
  flightX1: string
  flightY1: string
  flightX2: string
  flightY2: string
  exitX: string
  exitY: string
  flightBank: number
  flightDuration: number
  delay: number
}

interface ButterflyProps {
  index: number
  spec: ButterflySpec
}

const palettes = [
  { primary: '#e6b83f', secondary: '#5e8a59', accent: '#d96732', body: '#875228' },
  { primary: '#e86d43', secondary: '#f0c64a', accent: '#668c55', body: '#8b4a31' },
  { primary: '#9a79bb', secondary: '#d68ca2', accent: '#67529d', body: '#69506c' },
  { primary: '#7da8d5', secondary: '#426fbb', accent: '#f1d77a', body: '#526281' },
  { primary: '#e7a3b5', secondary: '#b85e83', accent: '#789675', body: '#765461' },
  { primary: '#efd77d', secondary: '#9a79b8', accent: '#52775a', body: '#675c45' },
] as const

function WingArtwork({
  variant,
  primary,
  secondary,
  accent,
}: {
  variant: number
  primary: string
  secondary: string
  accent: string
}) {
  let artwork: ReactNode

  switch (variant) {
    case 0:
      artwork = (
        <>
          <path d="M31 30C26 9 9 5 7 20c-2 13 12 18 24 14Z" fill={primary} />
          <path d="M30 33c-12-1-21 6-18 17 10 2 17-6 20-14Z" fill={primary} />
          <ellipse cx="17" cy="21" rx="5.5" ry="4" fill={secondary} opacity=".9" />
          <circle cx="19" cy="42" r="3.4" fill={accent} opacity=".85" />
        </>
      )
      break
    case 1:
      artwork = (
        <>
          <path d="M31 31C27 11 14 7 10 16 6 26 18 33 31 34Z" fill={primary} />
          <path d="M30 34C18 32 10 38 13 47l-3 7 8-4c7-3 11-9 14-13Z" fill={secondary} />
          <path d="M27 30c-4-9-10-12-14-10 4 7 8 10 14 13Z" fill={accent} opacity=".95" />
          <circle cx="18" cy="42" r="2.8" fill={primary} />
        </>
      )
      break
    case 2:
      artwork = (
        <>
          <path d="M31 31C28 8 7 9 8 24c1 12 12 15 23 10Z" fill={primary} />
          <path d="M30 34C17 30 8 39 14 50c10-1 15-7 18-13Z" fill={secondary} />
          <path d="M27 28c-5-8-12-9-16-5 4 6 9 9 16 9Z" fill={accent} opacity=".72" />
          <path d="M26 37c-6 0-10 4-11 9 6-1 10-4 13-8Z" fill={accent} opacity=".78" />
        </>
      )
      break
    case 3:
      artwork = (
        <>
          <path d="M31 31C29 13 21 7 15 12c-7 7 2 18 16 22Z" fill={primary} />
          <path d="M30 34c-11 0-17 7-14 15 8 0 13-5 16-12Z" fill={secondary} />
          <ellipse cx="21" cy="23" rx="3.8" ry="8" fill={accent} opacity=".9" transform="rotate(-35 21 23)" />
          <circle cx="21" cy="42" r="2.7" fill={accent} />
        </>
      )
      break
    case 4:
      artwork = (
        <>
          <path d="M31 31C27 8 11 7 8 18c-2 7 3 11 8 12-5 3-3 9 2 10 5 1 9-2 13-6Z" fill={primary} />
          <path d="M29 36c-10 1-15 8-11 15 8-1 12-7 14-13Z" fill={secondary} />
          <circle cx="16" cy="20" r="3.4" fill={accent} opacity=".8" />
          <circle cx="22" cy="34" r="2.8" fill={accent} opacity=".72" />
        </>
      )
      break
    default:
      artwork = (
        <>
          <path d="M31 31C25 11 12 8 9 19 7 29 18 35 31 34Z" fill={primary} />
          <path d="M30 35c-9-2-17 2-18 10 6 6 15 1 20-7Z" fill={secondary} />
          <path d="M27 30c-5-6-11-8-15-5 4 5 9 8 15 8Z" fill={accent} opacity=".82" />
          <path d="M27 38c-6 0-10 3-12 7 5 1 10-2 13-6Z" fill={accent} opacity=".72" />
        </>
      )
  }

  return artwork
}

export const Butterfly = memo(function Butterfly({ index, spec }: ButterflyProps) {
  const palette = palettes[spec.variant % palettes.length]
  const style = {
    '--x': `${spec.x}%`,
    '--y': `${spec.y}%`,
    '--facing': `${spec.facing}deg`,
    '--drift-x': `${spec.driftX}px`,
    '--drift-x-small': `${spec.driftX * 0.25}px`,
    '--drift-x-reverse': `${spec.driftX * -0.55}px`,
    '--drift-y': `${spec.driftY}px`,
    '--drift-y-small': `${spec.driftY * 0.42}px`,
    '--drift-duration': `${4.7 + (index % 7) * 0.34}s`,
    '--drift-delay': `${spec.driftDelay}s`,
    '--flap-speed': `${0.56 + (index % 4) * 0.055}s`,
    '--flap-delay': `${spec.flapDelay}s`,
    '--flight-x-1': spec.flightX1,
    '--flight-y-1': spec.flightY1,
    '--flight-x-2': spec.flightX2,
    '--flight-y-2': spec.flightY2,
    '--exit-x': spec.exitX,
    '--exit-y': spec.exitY,
    '--flight-bank': `${spec.flightBank}deg`,
    '--flight-duration': `${spec.flightDuration}s`,
    '--exit-delay': `${spec.delay}s`,
  } as CSSProperties

  const wing = (
    <WingArtwork
      variant={spec.variant}
      primary={palette.primary}
      secondary={palette.secondary}
      accent={palette.accent}
    />
  )

  return (
    <div
      className="butterfly"
      data-placement={spec.placement}
      style={style}
    >
      <div className="butterfly__drift">
        <svg className="butterfly__svg" viewBox="0 0 64 64" aria-hidden="true">
          <g className="butterfly__wing butterfly__wing--left">{wing}</g>
          <g className="butterfly__wing butterfly__wing--right">
            <g transform="translate(64 0) scale(-1 1)">{wing}</g>
          </g>
          <path
            d="M31.9 25c-2.7 5-2.5 15 .1 22 2.7-7 2.8-17-.1-22Z"
            fill={palette.body}
          />
          <path
            d="M31.5 25C28 20 26 18 23 17M32.5 25c3.5-5 5.5-7 8.5-8"
            fill="none"
            stroke={palette.body}
            strokeLinecap="round"
            strokeWidth="1.4"
          />
          <circle cx="22.7" cy="16.8" r="1.2" fill={palette.body} />
          <circle cx="41.3" cy="16.8" r="1.2" fill={palette.body} />
        </svg>
      </div>
    </div>
  )
})
