'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import GesturePrompt from '@/components/dom/GesturePrompt'

const LandingOverlay = () => {
  // Start with no footer; only show it if we decide we need it as a fallback.
  const [showFooterFallback, setShowFooterFallback] = useState(false)
  const [opacity, setOpacity] = useState(0)

  // Optional: show the old footer ONLY if localStorage is unavailable
  // (very rare) or user has reduced motion (so we skip gesture animation).
  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    let wantsFooter = false
    try {
      const seen = localStorage.getItem('seen_gesture_hint')
      // If they’ve already seen the gesture hint, we don’t need a footer.
      // If they prefer reduced motion, give the static footer text.
      wantsFooter = reduceMotion && !seen
    } catch {
      // If localStorage throws, fall back to footer.
      wantsFooter = true
    }

    if (!wantsFooter) return
    setShowFooterFallback(true)
    const t1 = setTimeout(() => setOpacity(0.8), 100)
    const t2 = setTimeout(() => {
      setOpacity(0)
      setTimeout(() => setShowFooterFallback(false), 500)
    }, 8000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const Introduction = () => {
    const router = useRouter()
    return (
      <div
        className='welcome-container'
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          marginTop: '15vh',
          marginLeft: '3vw',
          top: '0%',
          left: '0%',
        }}
      >
        <h1
          style={{
            fontSize: 'calc(4vh + 3.5vw)',
            fontWeight: 330,
            letterSpacing: '0.05em',
            background: 'linear-gradient(174deg, #c850c0, #ffcc70)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Hello, <br /> I&apos;m Wen Jie.
        </h1>

        <div className='text-md md:text-lg lg:text-lg text-white md:text-gray-400 my-4 md:max-w-[30%]'>
          I am a Software Development Engineer - ML @{' '}
          <a href='https://amazon.jobs/content/en/teams/agi' style={{ pointerEvents: 'auto' }}>
            <u>Amazon AGI</u>
          </a>
          . Welcome to my Space!
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-0 gap-4 md:max-w-[30%]'>
          <button
            className='py-2 pointer-events-auto button-primary text-center text-white md:text-gray-400 hover:text-white rounded-lg max-w-[150px]'
            onClick={() => router.push('/projects')}
          >
            Learn More!
          </button>
          <button
            className='py-2 pointer-events-auto button-primary text-center text-white md:text-gray-400 hover:text-white rounded-lg max-w-[200px]'
            onClick={() => window.open('/WenJieLee_cResume.pdf', '_blank')}
          >
            Download Resume
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Introduction />
      <GesturePrompt/>

      {showFooterFallback && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'black',
            textAlign: 'center',
            padding: '10px',
            opacity,
            zIndex: 1000,
            color: 'white',
            transition: 'opacity 500ms ease-in-out',
          }}
        >
          Pinch, pan and zoom for a better view!
        </div>
      )}
    </>
  )
}

export default LandingOverlay
