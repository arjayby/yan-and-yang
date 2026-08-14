import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

interface ViewportRevealProps {
  children: ReactNode
  className: string
  enabled: boolean
  style?: CSSProperties
}

export function ViewportReveal({
  children,
  className,
  enabled,
  style,
}: ViewportRevealProps) {
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
