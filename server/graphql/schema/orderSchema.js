export const orderSchema = `
type Order {
  _id: ID,
  clientId: Client,
  userId: String,
  title: String
  projectType: Project,
  status: OrderStatus,
  notes: String,
  eventDate: String,
  eventType: EventType,
  orderNumber: Int,
  place: String
  startTime: String,
  endTime: String
  total: String
  steps: [String]
  createdAt: String
}

input OrderInput {
  clientId: String!,
  userId: String!,
  title: String,
  projectType: String!,
  status: String!,
  notes: String,
  eventDate: String,
  eventType: String,
  orderNumber: Int,
  place: String
  startTime: String,
  endTime: String
  total: String
  steps: [String]
 }

 input OrderNewDataInput {
  _id: ID
  title: String,
  projectType: String,
  status: String,
  notes: String,
  eventDate: String,
  eventType: String,
  place: String
  startTime: String,
  endTime: String
  total: String
  steps: [String]
 }
 
 input FilterOrderInput {
  search: String
}

`
