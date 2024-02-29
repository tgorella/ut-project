export const clientSchema = `

type Client {
    _id: ID!,
    name: String,
    email: String,
    notes: String,
    phone: String,
    avatarUrls: String,
    profession: String,
    telegram: String,
    instagram: String,
    address: String,
    isFav: Boolean,
    userId: String
}

input ClientInput {
    name: String!,
    email: String,
    notes: String,
    phone: String,
    avatarUrls: String,
    profession: String,
    telegram: String,
    instagram: String,
    address: String,
    isFav: Boolean,
    userId:String
 }

 input ClientNewDataInput {
    _id: ID!
    name: String,
    email: String,
    notes: String,
    phone: String,
    avatarUrls: String,
    profession: String,
    telegram: String,
    instagram: String,
    address: String,
    isFav: Boolean,
 }

`