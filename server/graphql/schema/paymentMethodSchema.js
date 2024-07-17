export const paymentMethodSchema = `
type PaymentMethod {
  _id: ID!,
  name: String!,
  icon_url: String
}

input PaymentMethodInput {
  name: String!,
  icon_url: String
 }

 input PaymentMethodNewDataInput {
  _id: ID!,
  name: String,
  icon_url: String
 }

`