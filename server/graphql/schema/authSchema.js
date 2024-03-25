export const authSchema = `
type AuthData {
  userId: String,
  accessToken: String 
  refreshToken: String
}

type Token {
  _id: ID!
  user: User
  refreshToken: String
}

type User {
  _id: ID,
  firstname: String,
  lastname: String,
  currency: String,
  country: String,
  city: String,
  username: String,
  email: String,
  avatar: String,
  password: String,
  lastOrderNumber: String,
  roles: [String],
  ownerId: String
}

input UserInput {
  email: String,
  password: String,
  username: String,
  lastname: String,
  firstname: String,
  roles: [String]
 }

 input UserNewDataInput {
  _id: ID,
  firstname: String,
  lastname: String,
  currency: String,
  country: String,
  city: String,
  username: String,
  email: String,
  avatar: String,
  password: String,
  lastOrderNumber: String,
  roles: [String]
 }

 input UserSignInInput {
  email: String,
  password: String
}

`