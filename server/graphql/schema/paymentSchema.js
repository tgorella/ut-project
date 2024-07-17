export const paymentSchema = `
type Payment {
  _id: ID!,
  number: String
  date: String,
  method: PaymentMethod,
  order: Order,
  userId: String,
  amount: String,
  notes: String
}

input PaymentInput {
  date: String,
  number: String!,
  method: String!,
  order: String!,
  amount: String,
  notes: String,
  userId: String
 }

 input PaymentNewDataInput {
  _id: ID!,
  number: String,
  date: String,
  method: String!,
  order: String!,
  amount: String,
  notes: String
 }

`