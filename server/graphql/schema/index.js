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
userId: String,
stageId: String,
projectId: String,
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

input ProjectStepInput {
userId: String,
stageId: String,
projectId: String,
name: String!,
index: Int
}

input ProjectStepNewDataInput {
  _id: ID!,
name: String,
index: Int
}

input ProjectStageInput {
userId: String,
projectId:String,
name: String,
index: Int,
steps: [String]!
}

input ProjectStageNewDataInput {
  _id: ID,
name: String,
index: Int,
}

input ProjectInput {
  name: String!,
userId: String,
stages: [String]!
}

input ProjectNewDataInput {
  _id: ID!,
name: String,
}

type ProjectData {
  step: String,
  stage: String,
  project: String
}

type StageData {
  stage: String,
  project: String
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
  addProject(data: ProjectInput): Project
  updateProject(data: ProjectNewDataInput): Project
  deleteProject(id: ID): String
  addProjectStage(data: ProjectStageInput): Stage
  updateProjectStage(data: ProjectStageNewDataInput): Stage
  deleteProjectStage(id: ID): StageData
  addProjectStep(data: ProjectStepInput): Step
  updateProjectStep(data: ProjectStepNewDataInput): Step
  deleteProjectStep(id: ID): ProjectData
  # addModules(data: ModulesInput): Modules
  # updateModules(data: ModulesNewDataInput): Modules
},

`

export default graphqlSchema
