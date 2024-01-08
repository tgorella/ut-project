export interface User {
  _id: string,
  email: string
}

export interface UserSchema {
  authData?: User,
  isLogged: boolean,
  mounted: boolean
}