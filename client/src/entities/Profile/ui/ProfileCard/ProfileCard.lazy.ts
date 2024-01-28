import { lazy } from 'react'

export const ProfileCardLazy = lazy(
    () => import('./ProfileCard'))