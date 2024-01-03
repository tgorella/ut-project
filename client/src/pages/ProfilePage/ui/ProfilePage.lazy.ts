import { lazy } from 'react'

export const ProfilePageLazy = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            resolve(import('./ProfilePage'))
        })
)
