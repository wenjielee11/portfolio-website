'use client'
import { useEffect, useState } from 'react'

export default function GesturePrompt({
  loops = 4,
  storageKey = 'seen_gesture_hint',
  bottom = 'clamp(16px, 6vh, 96px)',
  right = 'clamp(16px, 4vw, 48px)',
}) {
  const [render, setRender] = useState(false)

  useEffect(() => {
    const seen = typeof window !== 'undefined' && localStorage.getItem(storageKey)
    if (seen) return

    setRender(true)

    const dismiss = () => {
      try {
        localStorage.setItem(storageKey, '1')
      } catch {}
      cleanup()
      setRender(false)
    }
    const cleanup = () => {
      window.removeEventListener('wheel', dismiss)
      window.removeEventListener('pointerdown', dismiss)
      window.removeEventListener('touchstart', dismiss)
    }

    window.addEventListener('wheel', dismiss, { passive: true })
    window.addEventListener('pointerdown', dismiss, { passive: true })
    window.addEventListener('touchstart', dismiss, { passive: true })

    const timer = setTimeout(dismiss, loops * 4000 + 500)
    return () => {
      clearTimeout(timer)
      cleanup()
    }
  }, [loops, storageKey])

  if (!render) return null

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', zIndex: 60, right, bottom }}>
      <div className='rounded-xl border border-white/10 bg-black/60 text-white shadow-lg backdrop-blur-md px-3 py-2 animate-fade-hint'>
        <div className='flex items-center gap-2'>
          <PinchIcon className='h-6 w-6 animate-pulse-slow' />
          <span className='text-sm'>Pinch to zoom</span>
        </div>
        <div className='mt-1 flex items-center gap-2'>
          <TiltIcon className='h-6 w-6 animate-tilt' />
          <span className='text-sm'>Drag to tilt</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-hint {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          8% {
            opacity: 1;
            transform: translateY(0);
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-6px);
          }
        }
        .animate-fade-hint {
          animation: fade-hint 12s ease-in-out ${loops} forwards;
        }
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 1.6s ease-in-out infinite;
        }
        @keyframes tilt {
          0% {
            transform: rotate(0);
          }
          40% {
            transform: rotate(-12deg);
          }
          80% {
            transform: rotate(10deg);
          }
          100% {
            transform: rotate(0);
          }
        }
        .animate-tilt {
          animation: tilt 2.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-hint,
          .animate-pulse-slow,
          .animate-tilt {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

function PinchIcon({ className }) {
  return (
    <svg
      viewBox='0 0 24 24'
      className={className}
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <path d='M8 6V3M8 6H5M8 6L5 3' />
      <path d='M16 18v3M16 18h3M16 18l3 3' />
      <circle cx='9' cy='9' r='1' />
      <circle cx='15' cy='15' r='1' />
      <path d='M9 9c1.5 1.5 4.5 4.5 6 6' />
    </svg>
  )
}

function TiltIcon({ className }) {
  return (
    <svg
      viewBox='0 0 24 24'
      className={className}
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <rect x='6' y='4' width='12' height='16' rx='2' />
      <path d='M3 12c3-3 8-3 11 0' />
      <path d='M21 12c-3 3-8 3-11 0' />
    </svg>
  )
}
