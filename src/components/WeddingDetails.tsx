import type { CSSProperties } from 'react'
import { ViewportReveal } from './ViewportReveal'

interface WeddingDetailsProps {
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
    name: 'ivory-flower-cluster',
    className: 'ivory-flower-cluster',
    delay: 0,
    width: 1330,
    height: 1183,
  },
  {
    name: 'coral-blossom-branch',
    className: 'coral-blossom-branch',
    delay: 550,
    width: 1391,
    height: 1131,
  },
  {
    name: 'yellow-daisy',
    className: 'yellow-daisy',
    delay: 1100,
    width: 1023,
    height: 1537,
  },
  {
    name: 'sage-leaf-sprig',
    className: 'sage-leaf-sprig',
    delay: 1650,
    width: 1254,
    height: 1254,
  },
  {
    name: 'golden-flower',
    className: 'golden-flower',
    delay: 2200,
    width: 1023,
    height: 1537,
  },
  {
    name: 'yellow-wildflower',
    className: 'yellow-wildflower',
    delay: 2750,
    width: 1023,
    height: 1537,
  },
]

const BUTTERFLIES = [
  {
    className: 'top',
    delay: 3100,
  },
  {
    className: 'lower',
    delay: 3350,
  },
] as const

export function WeddingDetails({ enabled }: WeddingDetailsProps) {
  return (
    <section
      className="wedding-details"
      aria-label="Wedding details"
      aria-hidden={!enabled}
    >
      <article className="wedding-details__card">
        <div className="wedding-details__paper" aria-hidden="true" />
        <svg
          className="wedding-details__panel"
          viewBox="0 0 786 1122"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 119C126 92 235 82 369 111C510 142 639 160 786 122V1122H0Z" />
        </svg>

        <div className="wedding-details__florals" aria-hidden="true">
          {FLORALS.map(({ className, delay, height, name, width }) => (
            <ViewportReveal
              className={`wedding-details__floral wedding-details__floral--${className}`}
              enabled={enabled}
              key={name}
              style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
            >
              <img
                src={`/assets/wedding-details/${name}.webp`}
                alt=""
                width={width}
                height={height}
                draggable="false"
                decoding="async"
                loading="lazy"
              />
            </ViewportReveal>
          ))}
        </div>

        <ViewportReveal
          className="wedding-details__heading wedding-details__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '150ms' } as CSSProperties}
        >
          <h2 aria-label="Wedding details">
            <span>wedding</span>
            <span>details</span>
          </h2>
        </ViewportReveal>

        <ViewportReveal
          className="wedding-details__gift wedding-details__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '210ms' } as CSSProperties}
        >
          <div>
            <h3>GIFT GUIDE</h3>
            <p>
              With all that we have, We’ve been truly blessed.
              <br />
              Your presence and prayers are all that we request.
              <br />
              But if you desire to give nonetheless, Monetary gift
              <br />
              is one we humbly request.
            </p>
          </div>
        </ViewportReveal>

        <ViewportReveal
          className="wedding-details__share wedding-details__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '270ms' } as CSSProperties}
        >
          <div>
            <h3>SNAP &amp; SHARE</h3>
            <p>
              Help us capture and share our precious moments
              <br />
              using our official wedding hashtag
            </p>
            <p className="wedding-details__hashtag">#yancompletesyang</p>
          </div>
        </ViewportReveal>

        <ViewportReveal
          className="wedding-details__rsvp wedding-details__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '330ms' } as CSSProperties}
        >
          <div>
            <h3>RSVP</h3>
            <p>
              We look forward to celebrating with you!
              <br />
              We have reserved <span className="wedding-details__seat">1</span>{' '}
              seat for you.
            </p>
            <p>
              We hope for your kind understanding
              <br />
              by not bringing plus ones to our event.
            </p>
            <p>
              The favor of your reply is requested
              <br />
              on or before October 10, 2026.
            </p>
          </div>
        </ViewportReveal>

        {BUTTERFLIES.map(({ className, delay }) => (
          <ViewportReveal
            className={`wedding-details__butterfly wedding-details__butterfly--${className}`}
            enabled={enabled}
            key={className}
            style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
          >
            <div className="wedding-details__butterfly-float" aria-hidden="true">
              <div className="wedding-details__butterfly-art">
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
        ))}
      </article>
    </section>
  )
}
