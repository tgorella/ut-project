import { ReactNode } from 'react'

export interface Column {
  name: string,
  path: string,
  element?: (data: string) => JSX.Element | ReactNode
}
