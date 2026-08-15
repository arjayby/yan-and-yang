import type { CSSProperties } from 'react'
import { ViewportReveal } from './ViewportReveal'

interface SeeYouThereProps {
  enabled: boolean
}

interface FloralSpec {
  className: string
  delay: number
  height: number
  src: string
  width: number
}

const FLORALS: FloralSpec[] = [
  {
    className: 'top-branch',
    delay: 0,
    src: '/assets/see-you-there/yellow-buttercup.png',
    width: 1122,
    height: 1402,
  },
  {
    className: 'left-cluster',
    delay: 420,
    src: '/assets/wedding-details/ivory-flower-cluster.webp',
    width: 320,
    height: 386,
  },
  {
    className: 'left-wildflowers',
    delay: 840,
    src: '/assets/invitation-florals/pink-wildflowers.webp',
    width: 332,
    height: 498,
  },
  {
    className: 'right-golden-twig',
    delay: 1260,
    src: '/assets/invitation-florals/golden-twig.webp',
    width: 294,
    height: 467,
  },
  {
    className: 'right-sprig',
    delay: 1680,
    src: '/assets/invitation-florals/sage-sprig.webp',
    width: 291,
    height: 497,
  },
  {
    className: 'bottom-branch',
    delay: 2100,
    src: '/assets/invitation-florals/green-branch.webp',
    width: 353,
    height: 497,
  },
  {
    className: 'yellow-buttercup',
    delay: 2520,
    src: '/assets/see-you-there/yellow-buttercup.png',
    width: 1122,
    height: 1402,
  },
  {
    className: 'pink-clematis',
    delay: 2940,
    src: '/assets/see-you-there/pink-clematis.png',
    width: 1024,
    height: 1536,
  },
]

function ClosingButterfly({
  className,
  delay,
  enabled,
}: {
  className: string
  delay: number
  enabled: boolean
}) {
  return (
    <ViewportReveal
      className={`see-you-there__butterfly see-you-there__butterfly--${className}`}
      enabled={enabled}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      <div className="see-you-there__butterfly-flight">
        <div className="see-you-there__butterfly-wings">
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
  )
}

export function SeeYouThere({ enabled }: SeeYouThereProps) {
  return (
    <section
      className="see-you-there"
      aria-label="See you there"
      aria-hidden={!enabled}
    >
      <article className="see-you-there__card">
        <div className="see-you-there__florals" aria-hidden="true">
          {FLORALS.map(({ className, delay, height, src, width }) => (
            <ViewportReveal
              className={`see-you-there__floral see-you-there__floral--${className}`}
              enabled={enabled}
              key={className}
              style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
            >
              <img
                src={src}
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
          className="see-you-there__heading see-you-there__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '260ms' } as CSSProperties}
        >
          <h2>
            <span>see you</span>
            <span>there</span>
          </h2>
        </ViewportReveal>

        <ViewportReveal
          className="see-you-there__message see-you-there__text-reveal"
          enabled={enabled}
          style={{ '--reveal-delay': '720ms' } as CSSProperties}
        >
          <p>
            <span>Your presence will make</span>
            <span>our wedding day complete</span>
          </p>
        </ViewportReveal>

        <div className="see-you-there__butterflies" aria-hidden="true">
          <ClosingButterfly className="upper" delay={3260} enabled={enabled} />
          <ClosingButterfly className="lower" delay={3540} enabled={enabled} />
        </div>
      </article>
    </section>
  )
}
