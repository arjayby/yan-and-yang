import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

interface SaveTheDateProps {
  enabled: boolean
  sectionRef: RefObject<HTMLElement | null>
}

interface RevealProps {
  children: ReactNode
  className: string
  enabled: boolean
  style?: CSSProperties
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

function ViewportReveal({
  children,
  className,
  enabled,
  style,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setIsVisible(false)
      return
    }

    const element = elementRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        rootMargin: '0px',
        threshold: 0,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [enabled])

  return (
    <div
      ref={elementRef}
      className={className}
      style={style}
    >
      <div
        className={`reveal-item${
          isVisible ? ' reveal-item--visible' : ''
        }`}
      >
        {children}
      </div>
    </div>
  )
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

        <div className="save-date__florals" aria-hidden="true">
          {FLORALS.map(({ className, delay, height, name, width }) => (
            <ViewportReveal
              className={`save-date__floral save-date__floral--${className}`}
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
