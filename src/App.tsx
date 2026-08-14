import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { Butterfly, type ButterflySpec } from './components/Butterfly'
import { ForegroundStem } from './components/ForegroundStem'
import { SaveTheDate } from './components/SaveTheDate'
import { TheVibe } from './components/TheVibe'

const TRANSITION_DURATION_MS = 4400
const SCROLL_UNLOCK_DELAY_MS = 3000
const FLORAL_ASSET_PATH = '/assets/watercolor-floral-border.webp'
const MIN_DESKTOP_BUTTERFLIES = 256
const MIN_MOBILE_BUTTERFLIES = 128
const MAX_BUTTERFLIES = 384
const BUTTERFLY_VARIANT_COUNT = 6
const POSITION_CANDIDATE_COUNT = 32
const FLOWER_TIP_RATIO = 0.2

function createSeededRandom(seed: number) {
  let state = seed % 2147483647

  return () => {
    state = (state * 48271) % 2147483647
    return (state - 1) / 2147483646
  }
}

function createRandomPosition(
  random: () => number,
  isMobile: boolean,
  width: number,
  height: number,
  positions: Array<{ x: number; y: number }>,
  placement: ButterflySpec['placement'],
) {
  const minimumY = placement === 'flower-tip' ? (isMobile ? 54 : 43) : 1
  const maximumY =
    placement === 'flower-tip' ? (isMobile ? 61 : 57) : isMobile ? 62 : 58
  const centerGapX = isMobile ? 17 : 8
  const centerGapY = isMobile ? 11 : 10
  let bestPosition: { x: number; y: number } | null = null
  let bestDistance = -1

  for (let attempt = 0; attempt < POSITION_CANDIDATE_COUNT; attempt += 1) {
    const x = 1 + random() * 98
    const y = minimumY + random() * (maximumY - minimumY)
    const overlapsButton =
      Math.abs(x - 50) < centerGapX && Math.abs(y - 50) < centerGapY

    if (overlapsButton) continue

    let closestDistance = Number.POSITIVE_INFINITY

    for (const position of positions) {
      const deltaX = ((x - position.x) / 100) * width
      const deltaY = ((y - position.y) / 100) * height
      const distance = deltaX * deltaX + deltaY * deltaY

      closestDistance = Math.min(closestDistance, distance)
    }

    if (closestDistance > bestDistance) {
      bestDistance = closestDistance
      bestPosition = { x, y }
    }
  }

  return bestPosition ?? {
    x: centerGapX / 2,
    y: minimumY + (maximumY - minimumY) / 2,
  }
}

function createFlightPath(facing: number, random: () => number) {
  const radians = (facing * Math.PI) / 180
  const directionX = Math.sin(radians)
  const directionY = -Math.cos(radians)
  const perpendicularX = -directionY
  const perpendicularY = directionX
  const distance = 130 + random() * 45
  const curveDirection = random() < 0.5 ? -1 : 1
  const curve = curveDirection * (7 + random() * 11)
  const firstDistance = distance * (0.25 + random() * 0.05)
  const secondDistance = distance * (0.58 + random() * 0.07)

  const point = (forward: number, sideways: number) => ({
    x: `${(directionX * forward + perpendicularX * sideways).toFixed(2)}vmax`,
    y: `${(directionY * forward + perpendicularY * sideways).toFixed(2)}vmax`,
  })

  const first = point(firstDistance, curve)
  const second = point(secondDistance, curve * -0.65)
  const exit = point(distance, 0)

  return {
    flightX1: first.x,
    flightY1: first.y,
    flightX2: second.x,
    flightY2: second.y,
    exitX: exit.x,
    exitY: exit.y,
    flightBank: curveDirection * (7 + random() * 9),
    flightDuration: 2.8 + random() * 0.7,
  }
}

function createShuffledVariants(count: number, random: () => number) {
  const variants = Array.from(
    { length: count },
    (_, index) => index % BUTTERFLY_VARIANT_COUNT,
  )

  for (let index = variants.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[variants[index], variants[swapIndex]] = [
      variants[swapIndex],
      variants[index],
    ]
  }

  return variants
}

function createButterflyScatter(width: number, height: number, seed: number) {
  const isMobile = width <= 680
  const minimumCount = isMobile
    ? MIN_MOBILE_BUTTERFLIES
    : MIN_DESKTOP_BUTTERFLIES
  const count = Math.min(
    MAX_BUTTERFLIES,
    Math.max(minimumCount, Math.round((width * height) / 4500)),
  )
  const flowerTipCount = Math.round(count * FLOWER_TIP_RATIO)
  const viewportSeed = seed + width * 31 + height * 17
  const positionRandom = createSeededRandom(viewportSeed)
  const colorRandom = createSeededRandom(viewportSeed + 7919)
  const detailRandom = createSeededRandom(viewportSeed + 15401)
  const variants = createShuffledVariants(count, colorRandom)
  const positions: Array<{ x: number; y: number }> = []

  return Array.from({ length: count }, (_, index): ButterflySpec => {
    const placement = index < flowerTipCount ? 'flower-tip' : 'field'
    const position = createRandomPosition(
      positionRandom,
      isMobile,
      width,
      height,
      positions,
      placement,
    )
    positions.push(position)
    const facing = Math.round(detailRandom() * 359)
    const flightPath = createFlightPath(facing, detailRandom)

    return {
      x: position.x,
      y: position.y,
      facing,
      variant: variants[index],
      placement,
      driftX: 3 + Math.round(detailRandom() * 10),
      driftY: 3 + Math.round(detailRandom() * 8),
      driftDelay: -(detailRandom() * 5.8),
      flapDelay: -(detailRandom() * 1.4),
      ...flightPath,
      delay: 0.1 + detailRandom() * 0.65,
    }
  })
}

function useButterflyScatter() {
  const [scatterSeed] = useState(
    () => Math.floor(Math.random() * 2147483646) + 1,
  )
  const [butterflies, setButterflies] = useState(() =>
    createButterflyScatter(window.innerWidth, window.innerHeight, scatterSeed),
  )

  useEffect(() => {
    let frame = 0

    const updateCurtain = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        setButterflies(
          createButterflyScatter(
            window.innerWidth,
            window.innerHeight,
            scatterSeed,
          ),
        )
      })
    }

    window.addEventListener('resize', updateCurtain)

    return () => {
      window.removeEventListener('resize', updateCurtain)
      window.cancelAnimationFrame(frame)
    }
  }, [scatterSeed])

  return butterflies
}

type Phase = 'waiting' | 'departing' | 'open'

function App() {
  const [phase, setPhase] = useState<Phase>('waiting')
  const [assetsReady, setAssetsReady] = useState(false)
  const [scrollReady, setScrollReady] = useState(false)
  const destinationHeadingRef = useRef<HTMLHeadingElement>(null)
  const saveDateRef = useRef<HTMLElement>(null)
  const butterflies = useButterflyScatter()

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration

    window.history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  const openInvitation = useCallback(() => {
    if (!assetsReady) return

    setPhase((currentPhase) =>
      currentPhase === 'waiting' ? 'departing' : currentPhase,
    )
  }, [assetsReady])

  useEffect(() => {
    let cancelled = false
    const floralImage = new Image()
    const floralReady = new Promise<void>((resolve) => {
      floralImage.onload = () => resolve()
      floralImage.onerror = () => resolve()
      floralImage.src = FLORAL_ASSET_PATH

      if (floralImage.complete) resolve()
    })
    const fontsReady = document.fonts
      ? Promise.all([
          document.fonts.load('600 16px Montserrat'),
          document.fonts.load('400 16px "Alex Brush"'),
        ])
      : Promise.resolve()

    Promise.allSettled([floralReady, fontsReady]).then(() => {
      if (!cancelled) setAssetsReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (phase !== 'departing') return

    const timer = window.setTimeout(() => {
      setPhase('open')
    }, TRANSITION_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'open') return

    const frame = window.requestAnimationFrame(() => {
      destinationHeadingRef.current?.focus({ preventScroll: true })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [phase])

  useEffect(() => {
    if (phase !== 'open') return

    const timer = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      setScrollReady(true)
    }, SCROLL_UNLOCK_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    document.documentElement.classList.toggle('is-scroll-ready', scrollReady)

    return () => {
      document.documentElement.classList.remove('is-scroll-ready')
    }
  }, [scrollReady])

  const scrollToInvitation = useCallback(() => {
    saveDateRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <main
      className={`invitation${scrollReady ? ' invitation--scrollable' : ''}`}
    >
      <section
        className={`destination${
          phase !== 'waiting' ? ' destination--revealing' : ''
        }${phase === 'open' ? ' destination--open' : ''}`}
        aria-hidden={phase !== 'open'}
        aria-label="Wedding invitation"
      >
        <div className="destination__paper" aria-hidden="true" />
        <div className="destination__body" aria-hidden="true" />

        <div className="destination__copy">
          <h1
            ref={destinationHeadingRef}
            className="destination__heading"
            tabIndex={-1}
            aria-label="We decided on forever"
          >
            <span className="destination__eyebrow">We decided on</span>
            <span className="destination__forever">forever</span>
          </h1>
        </div>

        <div className="destination__florals" aria-hidden="true">
          {(['left', 'center', 'right'] as const).map((group) => (
            <div
              className={`destination__floral-slice destination__floral-slice--${group}`}
              key={group}
            >
              <img
                className="destination__floral-image"
                src={FLORAL_ASSET_PATH}
                alt=""
                width="1823"
                height="863"
                draggable="false"
              />
            </div>
          ))}
        </div>

        <button
          className="destination__scroll-cue"
          type="button"
          onClick={scrollToInvitation}
          tabIndex={scrollReady ? 0 : -1}
          aria-hidden={!scrollReady}
          aria-label="Scroll to the save the date invitation"
        >
          <span>Scroll to continue</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </section>

      <SaveTheDate enabled={scrollReady} sectionRef={saveDateRef} />
      <TheVibe enabled={scrollReady} />

      {phase !== 'open' ? (
        <section
          className={`opening opening--${phase}`}
          aria-label="Wedding invitation entrance"
        >
          <div className="butterfly-field" aria-hidden="true">
            {butterflies.map((butterfly, index) => (
              <Butterfly
                key={index}
                index={index}
                spec={butterfly}
              />
            ))}
          </div>

          <div className="meadow" aria-hidden="true">
            <img
              className="meadow__image"
              src="/assets/watercolor-meadow.webp"
              alt=""
              width="1774"
              height="887"
              fetchPriority="high"
              draggable="false"
            />
          </div>

          <div className="foreground-stems" aria-hidden="true">
            <ForegroundStem x={10} delay={-1.1} variant={0} />
            <ForegroundStem x={30} delay={-2.8} variant={1} />
            <ForegroundStem x={70} delay={-1.9} variant={2} />
            <ForegroundStem x={90} delay={-3.3} variant={3} />
          </div>

          <button
            className="open-button"
            type="button"
            onClick={openInvitation}
            disabled={!assetsReady || phase === 'departing'}
            aria-busy={!assetsReady}
            aria-label={
              assetsReady
                ? 'Tap to open the wedding invitation'
                : 'Preparing the wedding invitation'
            }
          >
            <span>Tap to open</span>
          </button>
        </section>
      ) : null}
    </main>
  )
}

export default App
