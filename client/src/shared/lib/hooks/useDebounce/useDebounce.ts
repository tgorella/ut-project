import { MutableRefObject, useCallback, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number) {

    const timer = useRef(null) as MutableRefObject<ReturnType<typeof setTimeout> | null>
    // @ts-ignore
    const debouncedCallback = useCallback((...args) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])

    return debouncedCallback
}