import { lazy } from 'react'

export const ClientsPageLazy = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            resolve(import('./ClientsPage'))
        })
)