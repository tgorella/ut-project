import { lazy } from 'react'

export const PaymentMethodEditLazy = lazy(
    () => import('./PaymentMethodEdit'))