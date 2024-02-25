export const projectSchema = `
type Project {
  _id: ID,
  name: String!,
userId: String,
stages: [Stage]
}

type Stage {
_id: ID,
userId: String,
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

`