import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { ClientDetailsSchema } from 'entities/Clients'
import { OrderDetailsSchema } from 'entities/Order'
import { ProfileSchema } from 'entities/Profile'
import { UserSchema } from 'entities/User'
import { AddClientSchema } from 'features/AddClient'
import { LoginSchema } from 'features/AuthByUsername'
import { ClientsPageSchema } from 'pages/ClientsPage'
import { OrdersPageSchema } from 'pages/OrdersPage/model/types/OrdersPageSchema'

export interface StateSchema {
  user: UserSchema,


  // Async reducers
  loginForm?: LoginSchema,
  profile?: ProfileSchema,
  clientDetails?: ClientDetailsSchema,
  clientsPage?: ClientsPageSchema,
  addClient?: AddClientSchema,
  orderDetails?: OrderDetailsSchema,
  ordersPage?: OrdersPageSchema
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) =>  void
  getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance,
}

export interface ThunkConfig<T> {
  rejectValue: T,
  extra: ThunkExtraArg,
  state: StateSchema
}