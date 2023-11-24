import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'

export type Modules = {
  clients: boolean,
}
export interface Profile {
  firstname?: string,
  lastname?: string,
  age?: number,
  currency?: Currency,
  country?: Country,
  city?: string,
  username?: string,
  avatar?: string,
  lastOrderNumber?: string 
}

export interface ProfileSchema {
  data?: Profile,
  form?: Profile,
  modules?: Modules,
  isLoading: boolean,
  error?: string,
  readonly: boolean,

}