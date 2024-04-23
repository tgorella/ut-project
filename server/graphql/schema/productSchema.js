export const productSchema = `
type Product {
  _id: ID,
  userId: String,
  name: String,
  price: Int,
  discount: Int,
  count: Int,
  productType:String,
  description:String,
  img:String,
  category: String,
  subcategory: String
}

input ProductInput {
  userId: String,
  name: String,
  price: Int,
  discount: Int,
  count: Int,
  productType:String,
  description:String,
  img:String,
  category: String,
  subcategory: String
}

input ProductNewDataInput {
  _id: ID,
  name: String,
  price: Int,
  discount: Int,
  count: Int,
  productType:String,
  description:String,
  img:String,
  category: String,
  subcategory: String
}

input FilterProductInput {
  search: String
}
`