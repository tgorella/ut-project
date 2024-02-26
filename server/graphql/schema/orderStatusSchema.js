export const orderStatusSchema = `
type OrderStatus {
  _id: ID!,
  userId: String,
  name: String!,
  color: String!,
  isDefault: Boolean,
}

input OrderStatusInput {
  name: String!,
  color: String!,
  isDefault: Boolean,
 }

 input OrderStatusNewDataInput {
  _id: ID!,
  name: String,
  color: String,
 
 }

`