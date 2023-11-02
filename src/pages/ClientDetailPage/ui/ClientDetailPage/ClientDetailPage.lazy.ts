import { lazy } from 'react'

export const ClientDetailPageLazy = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            setTimeout(() => resolve(import('./ClientDetailPage')), 1500)
        })
)
