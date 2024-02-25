export const eventTypesSchema =  `
type EventType {
  _id: ID,
  name: String!,
  color: String!,
  userId: String,
  isDefault: Boolean
}

input EventTypeInput {
  name: String!,
  color: String!,
  userId: String!,
  isDefault: Boolean
 }

 input EventTypeNewDataInput {
  _id: ID,
  name: String,
  color: String,
 }

`