const graphqlSchema = `#graphql
type Event {
  _id: ID!,
  title: String!,
		userId: User,
    eventType:EventType,
    eventDate: String,
    startTime:String,
    endTime:String,
    place:String,
    notes:String,
}
type EventType {
  _id: ID,
  name: String!,
  color: String!,
  userId: User,
  isDefault: Boolean
}
type ModulesStatus {
  userId: String,
  clients: Boolean,
  orders: Boolean,
  calendar: Boolean,
  workflow: Boolean,
  projects: Boolean
}
type Client {
    _id: ID!,
    name: String,
    email: String,
    notes: String,
    phone: String,
    avatarUrls: String,
    profession: String,
    address: String,
    isFav: Boolean,
    userId: User
}
type Order {
  _id: ID,
  clientId: Client,
  userId: User,
  title: String
  projectType: Project,
  status: OrderStatus,
  notes: String,
  eventData: String,
  eventType: EventType,
  orderNumber: Int,
  place: String
  startTime: String,
  endTime: String
  total: String
  steps: [String]
}

type OrderStatus {
  _id: ID!,
  userId: User,
  name: String!,
  color: String!,
  isDefault: Boolean,
}

type Project {
  _id: ID,
  name: String!,
userId: User,
stages: [Stage]
}

type Stage {
_id: ID,
userId: User,
projectId:Project,
name: String,
index: Int,
steps: [Step]
}

type Step {
_id: ID!,
userId: User,
stageId: Stage,
projectId: Project,
name: String!,
index: Int
}

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
  lastOrderNumber: String
}
input UserInput {
  email: String,
  password: String,
  username: String
 }

 input OrderInput {
  clientId: String!,
  userId: String!,
  title: String,
  projectType: String!,
  status: String!,
  notes: String,
  eventData: String,
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
  eventData: String,
  eventType: String,
  place: String
  startTime: String,
  endTime: String
  total: String
  steps: [String]
 }

 input ClientInput {
  name: String!,
    email: String,
    notes: String,
    phone: String,
    avatarUrls: String,
    profession: String,
    address: String,
    isFav: Boolean,
    userId:String!
 }

 input ClientNewDataInput {
  _id: ID!
  name: String,
    email: String,
    notes: String,
    phone: String,
    avatarUrls: String,
    profession: String,
    address: String,
    isFav: Boolean,
 }

 input OrderStatusInput {
  userId: String!,
  name: String!,
  color: String!,
  isDefault: Boolean,
 }

 input OrderStatusNewDataInput {
  _id: ID!,
  name: String,
  color: String,
 }

 input EventInput {
  title: String!,
		userId: String,
    eventType:String,
    eventDate: String,
    startTime:String,
    endTime:String,
    place:String,
    notes:String,
 }

 input EventNewDataInput {
  _id: ID!,
  title: String!,
    eventType:String,
    eventDate: String,
    startTime:String,
    endTime:String,
    place:String,
    notes:String,
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

input UserSignInInput {
  email: String,
  password: String
}

input FilterOrderInput {
  search: String
}

type Query {
  users: [User]
  user(id: ID!): User
  signInWithPassword(data: UserSignInInput): AuthData
  orders: [Order]
  order(id: ID): Order
  filteredOrders(data: String): [Order]
  projects: [Project]
  project(id: ID): Project
  clients: [Client]
  client(id: ID): Client
  filteredClients(data: String): [Client]
  events: [Event]
  event(id: ID): Event
  eventTypes: [EventType]
  orderStatuses: [OrderStatus]
  modules(userId: ID): [ModulesStatus]
},

type Mutation {
  addUser(data: UserInput): User
  updateUser(data: ID): User # check it later
  deleteUser(id: ID): String
  updateToken(token: String): AuthData
  addOrder(data: OrderInput): Order
  deleteOrder(id: ID): String
  updateOrder(data: OrderNewDataInput): Order
  addClient(data: ClientInput): Client
  updateClient(data: ClientNewDataInput): Client
  deleteClient(id: ID): String
  addOrderStatus(data: OrderStatusInput): OrderStatus
  updateOrderStatus(data: OrderStatusNewDataInput): OrderStatus
  deleteOrderStatus(id: ID): String
  addEvent(data: EventInput): Event
  updateEvent(data: EventNewDataInput): Event
  deleteEvent(id: ID): String
  addEventType(data: EventTypeInput): EventType
  updateEventType(data: EventTypeNewDataInput): EventType
  deleteEventType(id: ID): String
  # addProjectType(data: ProjectTypeInput): ProjectType
  # updateProjectType(data: ProjectTypeNewDataInput): ProjectType
  # deleteProjectType(id: ID): string
  # addProject(data: ProjectInput): Project
  # updateProject(data: ProjectNewDataInput): Project
  # deleteProject(id: ID): string
  # addProjectStage(data: ProjectStageInput): ProjectStage
  # updateProjectStage(data: ProjectStageNewDataInput): ProjectStage
  # deleteProjectStage(id: ID): string
  # addProjectStep(data: ProjectStepInput): ProjectStep
  # updateProjectStep(data: ProjectStepNewDataInput): ProjectStep
  # deleteProjectStep(id: ID): string
  # addModules(data: ModulesInput): Modules
  # updateModules(data: ModulesNewDataInput): Modules
},

`

export default graphqlSchema
