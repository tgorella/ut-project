import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'

export enum UserRole {
OWNER = 'OWNER',
MANAGER = 'MANAGER',
TEAM_MEMBER = 'TEAM_MEMBER',
}

export interface Profile {
  firstname?: string,
  lastname?: string,
  currency?: Currency,
  country?: Country,
  city?: string,
  username?: string,
  email?: string,
  avatar?: string,
  lastOrderNumber?: string
  roles?: UserRole[]
}

export interface ProfileWithPass extends Profile {
  newPassword?: string,
  repeatPassword?: string
}
export interface ProfileSchema {
  data?: Profile,
  form?: ProfileWithPass,
  isLoading: boolean,
  error?: string,
  readonly: boolean
}