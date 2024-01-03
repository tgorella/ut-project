export interface User {
  id: string,
  username: string
}

export interface UserSchema {
  authData?: User,
  isLogged: boolean,
  mounted: boolean
}