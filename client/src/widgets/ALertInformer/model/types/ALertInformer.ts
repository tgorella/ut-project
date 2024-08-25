import { AlertTheme } from '@/shared/ui/Alert'

export interface ALertDetails {
message: string,
type: AlertTheme
id: string
}

export interface ALertInformerSchema {
  messages: ALertDetails[]
}