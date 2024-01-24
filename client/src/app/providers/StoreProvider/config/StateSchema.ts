import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { AppModulesSchema } from 'entities/AppModules'
import { ClientDetailsSchema } from 'entities/Clients'
import { EventSchema } from 'entities/Event'
import { OrderDetailsSchema } from 'entities/Order'
import { OrderStatusesSchema } from 'entities/OrderStatus'
import { ProfileSchema } from 'entities/Profile'
import { UserSchema } from 'entities/User'
import { AddClientSchema } from 'features/AddClient'
import { AddOrderSchema } from 'features/AddOrder/model/types/addOrderSchema'
import { LoginSchema } from 'features/AuthByUsername'
import { ClientsPageSchema } from 'pages/ClientsPage'
import { OrdersPageSchema } from 'pages/OrdersPage/model/types/OrdersPageSchema'
import { ProjectsPageSchema } from 'pages/ProjectsPage'
import { AddClientButtonSchema } from 'widgets/AddClientButton/module/types/AddClientButtonSchema'
import { AddOrderButtonSchema } from 'widgets/AddOrderButton/model/types/AddOrderButton'
import { EventTypesEditSchema } from 'widgets/EventTypesEdit'
import { OrderStatusEditSchema } from 'widgets/OrderStatusEdit'

export interface StateSchema {
  user: UserSchema,
  profile: ProfileSchema,
  userModules: AppModulesSchema

  // Async reducers
  loginForm?: LoginSchema,
  clientDetails?: ClientDetailsSchema,
  clientsPage?: ClientsPageSchema,
  addClient?: AddClientSchema,
  addClientButton?: AddClientButtonSchema
  orderDetails?: OrderDetailsSchema,
  ordersPage?: OrdersPageSchema,
  addOrder?: AddOrderSchema,
  addOrderButton?: AddOrderButtonSchema,
  orderStatuses?: OrderStatusesSchema,
  OrderStatusEditSchema?: OrderStatusEditSchema,
  eventDetails?: EventSchema,
  eventTypesEditSchema?: EventTypesEditSchema,
  projectPage?: ProjectsPageSchema

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
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T,
  extra: ThunkExtraArg,
  state: StateSchema
}