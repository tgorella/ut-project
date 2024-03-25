import { createSelector } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { UserRole } from '../../types/profileSchema'

export const getProfileRoles = (state: StateSchema) => state.profile.data?.roles

export const isUserOwner = createSelector(getProfileRoles, (roles) => Boolean(roles?.includes(UserRole.OWNER)))
export const isUserManager = createSelector(getProfileRoles, (roles) => Boolean(roles?.includes(UserRole.OWNER)))