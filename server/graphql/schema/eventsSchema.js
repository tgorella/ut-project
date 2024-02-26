export const eventsSchema = `

type Event {
    _id: ID!,
    title: String!,
		userId: String,
    eventType:EventType,
    eventDate: String,
    startTime:String,
    endTime:String,
    place:String,
    notes:String,
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
`
