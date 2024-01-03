export interface AppModules {
  id: string,
  userId?: string,
 clients: boolean,
 orders: boolean,
 calendar: boolean,
workFlow: boolean
}

export interface AppModulesSchema {
  isLoading: boolean,
  data?: AppModules,
  error?: string
}