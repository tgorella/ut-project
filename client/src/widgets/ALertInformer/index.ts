import { ALertInformerSchema, ALertDetails } from './model/types/ALertInformer'
export { getAlerts } from './model/selectors/getAlerts/getAlerts'
export { aLertInformerAction, aLertInformerReducer } from './model/slice/ALertInformerSlice'
export {ALertInformer} from './ui/ALertInformer'

export type {ALertInformerSchema, ALertDetails}