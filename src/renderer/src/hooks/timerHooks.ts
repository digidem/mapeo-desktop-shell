import { useEffect, useRef } from 'react'

export const useTimeout = (callback: () => void, delay: number | null) => {
  const timeoutRef = useRef<number | null>(null)
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => savedCallback.current()
    if (delay !== null) {
      timeoutRef.current = window.setTimeout(tick, delay)
      return () => {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [delay])
  return timeoutRef
}
