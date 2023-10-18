import { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData'
import { profileAction, profileReducer } from './model/slice/profileSlice'
import { Profile, ProfileSchema } from './model/types/profileSchema'
import { ProfileCard } from './ui/ProfileCard/ProfileCard'

export {Profile, ProfileSchema, profileAction, profileReducer, fetchProfileData, ProfileCard}