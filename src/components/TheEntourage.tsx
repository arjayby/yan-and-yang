import type { CSSProperties, ReactNode } from 'react'
import { ViewportReveal } from './ViewportReveal'

interface TheEntourageProps {
  enabled: boolean
}

interface EntourageFloral {
  className: string
  delay: number
  height: number
  src: string
  width: number
}

const PRINCIPAL_SPONSORS = [
  [
    'JOEL ANONYMOUS',
    'JUAN PAULO ANONYMOUS',
    'ROBERTOANONYMOUS',
    'ART ANONYMOUS',
    'JONATHAN ANONYMOUS',
    'ANTON ANONYMOUS',
    'JUAN ANONYMOUS',
    'JUANCHO ANONYMOUS',
    'WILMER ANONYMOUS',
    'FE DENCIDITA ANONYMOUS',
    'CORNELIO ANONYMOUS',
    'DARYL ANONYMOUS',
    'ARNOLD ANONYMOUS',
  ],
  [
    'SYLVIA ANONYMOUS',
    'MARIA ANONYMOUS',
    'LEONILA ANONYMOUS',
    'CHERRY ANONYMOUS',
    'MAI ANONYMOUS',
    'DAISY ANONYMOUS',
    'THELMA ANONYMOUS',
    'CASIMIRA ANONYMOUS',
    'ELMA ANONYMOUS',
    'ENRICO ANONYMOUS',
    'LIBRADA ANONYMOUS',
    'LORAINE ANONYMOUS',
    'SION ANONYMOUS',
  ],
] as const

const BRIDESMAIDS = [
  'REBEKAH PAULA BOY',
  'ANGEL BALAJADIA',
  'MARY JOY BULFA',
  'MARJORIE SOBERANO',
  'ARIANNE BALAJADIA',
  'CLARIE PATH LORICO',
  'AUBREY BALAJADIA',
  'JEWEL ANN VELOSO',
] as const

const FIRST_FLORALS: EntourageFloral[] = [
  {
    className: 'first-top-branch',
    delay: 0,
    src: '/assets/invitation-florals/green-branch.webp',
    width: 353,
    height: 497,
  },
  {
    className: 'first-coral-branch',
    delay: 550,
    src: '/assets/wedding-details/coral-blossom-branch.webp',
    width: 1391,
    height: 1131,
  },
  {
    className: 'first-yellow-wildflower',
    delay: 1100,
    src: '/assets/wedding-details/yellow-wildflower.webp',
    width: 1023,
    height: 1537,
  },
  {
    className: 'first-right-daisy',
    delay: 1650,
    src: '/assets/invitation-florals/yellow-daisy.webp',
    width: 231,
    height: 473,
  },
  {
    className: 'first-bottom-flower',
    delay: 2200,
    src: '/assets/wedding-details/golden-flower.webp',
    width: 1023,
    height: 1537,
  },
  {
    className: 'first-bottom-sprig',
    delay: 2750,
    src: '/assets/invitation-florals/sage-sprig.webp',
    width: 291,
    height: 497,
  },
  {
    className: 'first-right-branch',
    delay: 3300,
    src: '/assets/invitation-florals/green-branch.webp',
    width: 353,
    height: 497,
  },
]

const SECOND_FLORALS: EntourageFloral[] = [
  {
    className: 'second-top-daisy',
    delay: 0,
    src: '/assets/invitation-florals/yellow-daisy.webp',
    width: 231,
    height: 473,
  },
  {
    className: 'second-top-branch',
    delay: 550,
    src: '/assets/invitation-florals/green-branch.webp',
    width: 353,
    height: 497,
  },
  {
    className: 'second-right-bloom',
    delay: 1100,
    src: '/assets/invitation-florals/pink-bloom.webp',
    width: 359,
    height: 468,
  },
  {
    className: 'second-left-wildflowers',
    delay: 1650,
    src: '/assets/invitation-florals/pink-wildflowers.webp',
    width: 332,
    height: 498,
  },
  {
    className: 'second-left-cluster',
    delay: 2200,
    src: '/assets/wedding-details/ivory-flower-cluster.webp',
    width: 1330,
    height: 1183,
  },
  {
    className: 'second-left-daisy',
    delay: 2750,
    src: '/assets/wedding-details/yellow-daisy.webp',
    width: 1023,
    height: 1537,
  },
  {
    className: 'second-right-sprig',
    delay: 3300,
    src: '/assets/invitation-florals/sage-sprig.webp',
    width: 291,
    height: 497,
  },
]

function TextReveal({
  children,
  className,
  delay,
  enabled,
}: {
  children: ReactNode
  className: string
  delay: number
  enabled: boolean
}) {
  return (
    <ViewportReveal
      className={`entourage__text-reveal ${className}`}
      enabled={enabled}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </ViewportReveal>
  )
}

function Florals({
  enabled,
  florals,
}: {
  enabled: boolean
  florals: EntourageFloral[]
}) {
  return (
    <div className="entourage__florals" aria-hidden="true">
      {florals.map(({ className, delay, height, src, width }) => (
        <ViewportReveal
          className={`entourage__floral entourage__floral--${className}`}
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
  )
}

function Butterfly({
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
      className={`entourage__butterfly entourage__butterfly--${className}`}
      enabled={enabled}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      <div className="entourage__butterfly-float" aria-hidden="true">
        <div className="entourage__butterfly-art">
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

function Role({
  description,
  names,
  title,
}: {
  description?: string
  names: readonly string[]
  title: string
}) {
  return (
    <div className="entourage__role">
      <h3>{title}</h3>
      {description ? <p className="entourage__role-description">{description}</p> : null}
      {names.map((name) => (
        <p className="entourage__role-name" key={name}>{name}</p>
      ))}
    </div>
  )
}

export function TheEntourage({ enabled }: TheEntourageProps) {
  return (
    <section
      className="entourage"
      aria-label="The entourage"
      aria-hidden={!enabled}
    >
      <article className="entourage__card">
        <div className="entourage__page entourage__page--first">
          <div className="entourage__paper" aria-hidden="true" />
          <Florals enabled={enabled} florals={FIRST_FLORALS} />

          <TextReveal
            className="entourage__heading"
            delay={150}
            enabled={enabled}
          >
            <h2 aria-label="The entourage">
              <span>the</span>
              <span>entourage</span>
            </h2>
          </TextReveal>

          <TextReveal
            className="entourage__couple"
            delay={210}
            enabled={enabled}
          >
            <div>
              <p className="entourage__couple-names">Yan and Yang</p>
              <p className="entourage__nuptials">NUPTIALS</p>
              <p className="entourage__tagline">Glowing with Pride</p>
            </div>
          </TextReveal>

          <TextReveal
            className="entourage__parents"
            delay={270}
            enabled={enabled}
          >
            <div className="entourage__columns">
              <Role
                title="PARENTS OF THE GROOM"
                names={['JOEL BULFA', 'MA. GLORIA BULFA']}
              />
              <Role
                title="PARENTS OF THE BRIDE"
                names={['TOMMY JAVIER', 'SUSIE MAE JAVIER']}
              />
            </div>
          </TextReveal>

          <TextReveal
            className="entourage__principal"
            delay={330}
            enabled={enabled}
          >
            <div>
              <p className="entourage__intro">To Stand as Witness to Our Vows</p>
              <h3>PRINCIPAL SPONSORS</h3>
              <div className="entourage__principal-columns">
                {PRINCIPAL_SPONSORS.map((column, index) => (
                  <div key={index}>
                    {column.map((name) => <p key={name}>{name}</p>)}
                  </div>
                ))}
              </div>
            </div>
          </TextReveal>

          <TextReveal
            className="entourage__honor"
            delay={390}
            enabled={enabled}
          >
            <div>
              <p className="entourage__intro">
                To stand with us as we celebrate our commitment
              </p>
              <div className="entourage__columns">
                <Role title="BEST MAN" names={['JIRHEN PAPELERA']} />
                <Role title="MAID OF HONOR" names={['CANDY FLOR PANALIGAN']} />
              </div>
            </div>
          </TextReveal>

          <Butterfly className="first" delay={3600} enabled={enabled} />
        </div>

        <div className="entourage__page entourage__page--second">
          <div className="entourage__paper" aria-hidden="true" />
          <Florals enabled={enabled} florals={SECOND_FLORALS} />

          <TextReveal
            className="entourage__secondary-heading"
            delay={150}
            enabled={enabled}
          >
            <div>
              <p className="entourage__intro">To lay our love to each other</p>
              <h3>SECONDARY SPONSORS</h3>
            </div>
          </TextReveal>

          <TextReveal
            className="entourage__secondary-pairs"
            delay={210}
            enabled={enabled}
          >
            <div className="entourage__columns">
              <Role
                title="CANDLE"
                description="To light up our path"
                names={['EDWIN SUMALATAR', 'ANDREA NICOLE MAGBANUA']}
              />
              <Role
                title="CORD"
                description="To bind us together"
                names={['RYNER SUBIERRE', 'THERESA DIOQUINO']}
              />
            </div>
          </TextReveal>

          <TextReveal
            className="entourage__veil"
            delay={270}
            enabled={enabled}
          >
            <Role
              title="VEIL"
              description="To clothe us one"
              names={['JOHN CORTEJO', 'JUNADEL BENEDERIO']}
            />
          </TextReveal>

          <TextReveal
            className="entourage__wedding-party"
            delay={330}
            enabled={enabled}
          >
            <div>
              <p className="entourage__intro">
                To support us with love &amp; friendship on our special day
              </p>
              <div className="entourage__columns entourage__party-columns">
                <Role title="GROOMSMEN" names={[]} />
                <Role title="BRIDESMAIDS" names={BRIDESMAIDS} />
              </div>
            </div>
          </TextReveal>

          <TextReveal
            className="entourage__ring-bearer"
            delay={390}
            enabled={enabled}
          >
            <Role
              title="RING BEARER"
              description="To carry our symbol of love"
              names={['PAUL MATTHEW ANONYMOUS']}
            />
          </TextReveal>

          <TextReveal
            className="entourage__bearer-pairs"
            delay={450}
            enabled={enabled}
          >
            <div className="entourage__columns">
              <Role
                title="BIBLE BEARER"
                description="To carry our symbol of faith"
                names={['ANICA ANONYMOUS']}
              />
              <Role
                title="COIN BEARER"
                description="To carry our symbol of treasure"
                names={['JAKE ANONYMOUS']}
              />
            </div>
          </TextReveal>

          <TextReveal
            className="entourage__flower-girls"
            delay={510}
            enabled={enabled}
          >
            <Role
              title="FLOWER GIRLS"
              description="To shower our path with flowers"
              names={[
                'CHRISTELLE ANN BELOSILLO',
                'TRISHA LINN BULFA',
                'SAMARAH LINN SUOBIRON',
              ]}
            />
          </TextReveal>

          <TextReveal
            className="entourage__banner-bearer"
            delay={570}
            enabled={enabled}
          >
            <Role
              title="WEDDING BANNER BEARER"
              names={['ZAYARAH ZOEN GABITAN', 'LANZ GABRIEL BULFA']}
            />
          </TextReveal>

          <Butterfly className="second" delay={3850} enabled={enabled} />
        </div>
      </article>
    </section>
  )
}
