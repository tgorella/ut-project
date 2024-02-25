import { authSchema } from './authSchema.js'
import { clientSchema } from './clientSchema.js'
import { eventTypesSchema } from './eventTypesSchema.js'
import { eventsSchema } from './eventsSchema.js'
import { modulesSchema } from './modulesSchema.js'
import { orderSchema } from './orderSchema.js'
import { orderStatusSchema } from './orderStatusSchema.js'
import { projectSchema } from './projectSchema.js'

const graphqlSchema = `#graphql
${authSchema}
${clientSchema}
${eventTypesSchema}
${eventsSchema}
${modulesSchema}
${orderStatusSchema}
${orderSchema}
${projectSchema}

type Query {
  user: User
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
  modules: ModulesStatus
},

type Mutation {
  signUp(data: UserInput): User
  updateUser(data: ID): User
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
  addModules: ModulesStatus
  updateModules(data: ModulesNewDataInput): ModulesStatus
}
`
export default graphqlSchema
