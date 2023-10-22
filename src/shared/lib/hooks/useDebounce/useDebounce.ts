import { MutableRefObject, useCallback, useRef } from 'react'

export function useDebounce(callback: () => void , delay: number) {

    const timer = useRef(null) as MutableRefObject<ReturnType<typeof setTimeout> | null>

    const debouncedCallback = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            callback()
        }, delay)
    }, [callback, delay])

    return debouncedCallback
}