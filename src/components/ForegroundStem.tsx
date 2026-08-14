import type { CSSProperties } from 'react'

interface ForegroundStemProps {
  x: number
  delay: number
  variant: number
}

const stemPalettes = [
  { petals: '#df8faa', center: '#d4693d', leaf: '#6f9471' },
  { petals: '#9b82c1', center: '#e1b64b', leaf: '#789776' },
  { petals: '#7fa6d1', center: '#e5b84d', leaf: '#688d71' },
  { petals: '#efd77a', center: '#d96b37', leaf: '#739276' },
] as const

export function ForegroundStem({ x, delay, variant }: ForegroundStemProps) {
  const colors = stemPalettes[variant % stemPalettes.length]
  const style = {
    '--stem-x': `${x}%`,
    '--stem-delay': `${delay}s`,
  } as CSSProperties

  return (
    <div className="foreground-stem" style={style}>
      <svg className="foreground-stem__svg" viewBox="0 0 58 230" aria-hidden="true">
        <path
          d="M30 232C31 187 22 149 31 110c6-27 4-58 1-89"
          fill="none"
          stroke={colors.leaf}
          strokeLinecap="round"
          strokeWidth="2.2"
          opacity=".78"
        />
        <ellipse cx="24" cy="157" rx="7" ry="15" fill={colors.leaf} opacity=".64" transform="rotate(-44 24 157)" />
        <ellipse cx="35" cy="132" rx="6" ry="14" fill={colors.leaf} opacity=".6" transform="rotate(42 35 132)" />
        <ellipse cx="26" cy="92" rx="5.5" ry="13" fill={colors.leaf} opacity=".62" transform="rotate(-42 26 92)" />
        <g opacity=".88">
          <ellipse cx="32" cy="20" rx="7" ry="13" fill={colors.petals} />
          <ellipse cx="32" cy="20" rx="7" ry="13" fill={colors.petals} transform="rotate(72 32 20)" />
          <ellipse cx="32" cy="20" rx="7" ry="13" fill={colors.petals} transform="rotate(144 32 20)" />
          <ellipse cx="32" cy="20" rx="7" ry="13" fill={colors.petals} transform="rotate(216 32 20)" />
          <ellipse cx="32" cy="20" rx="7" ry="13" fill={colors.petals} transform="rotate(288 32 20)" />
          <circle cx="32" cy="20" r="4" fill={colors.center} />
        </g>
      </svg>
    </div>
  )
}
