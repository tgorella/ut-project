import { MutableRefObject, useCallback, useRef } from 'react'

export function useThrottle(callback: () => void, delay: number) {
    const isThrottled = useRef(null) as MutableRefObject<boolean | null>

    const throttledCallback = useCallback(() => {
        if (isThrottled.current) {
            return
        }
        callback()
        isThrottled.current = true
        setTimeout(() => {
            isThrottled.current = false
        }, delay)
    }, [callback, delay])

    return throttledCallback
}