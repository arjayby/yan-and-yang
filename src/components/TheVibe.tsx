import type { CSSProperties } from 'react'
import { InvitationFlorals } from './InvitationFlorals'
import { ViewportReveal } from './ViewportReveal'

interface TheVibeProps {
  enabled: boolean
}

const ATTIRE_COLORS = [
  { color: '#ece065', name: 'warm yellow' },
  { color: '#a9c05c', name: 'yellow green' },
  { color: '#e1a49b', name: 'coral' },
  { color: '#f4b8c6', name: 'blush pink' },
  { color: '#e3ca7e', name: 'muted gold' },
] as const

export function TheVibe({ enabled }: TheVibeProps) {
  return (
    <section
      className="the-vibe"
      aria-label="Wedding attire guide"
      aria-hidden={!enabled}
    >
      <article className="the-vibe__card">
        <div className="the-vibe__paper" aria-hidden="true" />
        <svg
          className="the-vibe__panel"
          viewBox="0 0 786 1122"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 298C137 286 251 313 381 296C530 277 628 211 786 220V1122H0Z" />
        </svg>

        <ViewportReveal
          className="the-vibe__top-art"
          enabled={enabled}
          style={{ '--reveal-delay': '30ms' } as CSSProperties}
        >
          <img
            src="/assets/the-vibe/top-floral-branch.webp"
            alt=""
            width="673"
            height="180"
            draggable="false"
            decoding="async"
            loading="lazy"
          />
        </ViewportReveal>

        <InvitationFlorals enabled={enabled} />

        <ViewportReveal
          className="the-vibe__heading the-vibe__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '150ms' } as CSSProperties}
        >
          <h2 aria-label="The vibe">
            <span>the</span>
            <span>vibe</span>
          </h2>
        </ViewportReveal>

        <ViewportReveal
          className="the-vibe__sponsors the-vibe__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '210ms' } as CSSProperties}
        >
          <div className="the-vibe__sponsor-layout">
            <img
              className="the-vibe__sponsor-art"
              src="/assets/the-vibe/principal-sponsors.webp"
              alt=""
              width="1054"
              height="1492"
              draggable="false"
              decoding="async"
              loading="lazy"
            />
            <div className="the-vibe__sponsor-copy">
              <h3>PRINCIPAL SPONSORS</h3>
              <p>
                <span>Ninong: Suit and Tie</span>
                <span>with Black Pants</span>
                <span>Ninang: Formal Long Dress</span>
              </p>
            </div>
          </div>
        </ViewportReveal>

        <ViewportReveal
          className="the-vibe__guests the-vibe__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '270ms' } as CSSProperties}
        >
          <div>
            <h3>GUESTS</h3>
            <p>SMART CASUAL / SEMI FORMAL</p>
          </div>
        </ViewportReveal>

        <ViewportReveal
          className="the-vibe__palette the-vibe__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '330ms' } as CSSProperties}
        >
          <div
            className="the-vibe__swatches"
            role="list"
            aria-label="Attire color palette"
          >
            {ATTIRE_COLORS.map(({ color, name }) => (
              <span
                className="the-vibe__swatch"
                key={name}
                role="listitem"
                aria-label={name}
                style={{ '--swatch-color': color } as CSSProperties}
              />
            ))}
          </div>
        </ViewportReveal>

        <ViewportReveal
          className="the-vibe__guest-art the-vibe__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '390ms' } as CSSProperties}
        >
          <img
            src="/assets/the-vibe/guest-attire.webp"
            alt=""
            width="1693"
            height="929"
            draggable="false"
            decoding="async"
            loading="lazy"
          />
        </ViewportReveal>

        <ViewportReveal
          className="the-vibe__butterfly the-vibe__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '2950ms' } as CSSProperties}
        >
          <div className="the-vibe__butterfly-float" aria-hidden="true">
            <div className="the-vibe__butterfly-art">
              <img
                src="/assets/the-vibe/pink-butterfly.webp"
                alt=""
                width="1254"
                height="1254"
                draggable="false"
                decoding="async"
                loading="lazy"
              />
            </div>
          </div>
        </ViewportReveal>
      </article>
    </section>
  )
}
