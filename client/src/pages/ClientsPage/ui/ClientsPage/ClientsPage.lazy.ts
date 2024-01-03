import { lazy } from 'react'

export const ClientsPageLazy = lazy(
    () => import('./ClientsPage'))