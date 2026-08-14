import {
  type CSSProperties,
  type RefObject,
} from 'react'
import { InvitationFlorals } from './InvitationFlorals'
import { ViewportReveal } from './ViewportReveal'

interface SaveTheDateProps {
  enabled: boolean
  sectionRef: RefObject<HTMLElement | null>
}

export function SaveTheDate({ enabled, sectionRef }: SaveTheDateProps) {
  return (
    <section
      ref={sectionRef}
      className="save-date"
      aria-label="Save the date invitation"
      aria-hidden={!enabled}
    >
      <article className="save-date__card">
        <div className="save-date__paper" aria-hidden="true" />
        <svg
          className="save-date__panel"
          viewBox="0 0 786 1122"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 318C142 301 258 390 430 400C552 408 668 397 786 401V1122H0Z" />
        </svg>

        <InvitationFlorals enabled={enabled} />

        <ViewportReveal
          className="save-date__mark save-date__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '150ms' } as CSSProperties}
        >
          <p aria-label="Save the date">
            <span>save the</span>
            <span>date</span>
          </p>
        </ViewportReveal>

        <ViewportReveal
          className="save-date__message save-date__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '210ms' } as CSSProperties}
        >
          <p>
            In God&apos;s love &amp; perfect will,
            <br />
            He has called us to become one in Christ.
          </p>
        </ViewportReveal>

        <ViewportReveal
          className="save-date__names save-date__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '270ms' } as CSSProperties}
        >
          <h2>
            <span>YAN</span>
            <span className="save-date__and">
              <span className="save-date__and-word">and</span>
            </span>
            <span>YANG</span>
          </h2>
        </ViewportReveal>

        <ViewportReveal
          className="save-date__details save-date__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '330ms' } as CSSProperties}
        >
          <div>
            <p className="save-date__request">
              Request the honor of your presence
              <br />
              as they unite in marriage on
            </p>
            <p className="save-date__date">WEDNESDAY OCTOBER 28, 2026</p>
            <p className="save-date__time">at 2:00 in the afternoon</p>
            <p className="save-date__label">CEREMONY</p>
            <p className="save-date__venue">JARO METROPOLITAN CATHEDRAL</p>
            <p>Jaro Iloilo City</p>
            <p className="save-date__label">RECEPTION</p>
            <p>Solana Premier 3, Tabucan Mandurriao, Iloilo City</p>
          </div>
        </ViewportReveal>
      </article>
    </section>
  )
}
