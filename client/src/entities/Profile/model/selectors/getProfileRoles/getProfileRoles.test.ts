import { StateSchema } from 'app/providers/StoreProvider'
import { UserRole } from '../../types/profileSchema'
import { getProfileRoles } from './getProfileRoles'

describe('getProfileRoles.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: {
                    roles: [UserRole.OWNER, UserRole.MANAGER]
                }
            }
        }

        expect(getProfileRoles(state as StateSchema)).toEqual([UserRole.OWNER, UserRole.MANAGER])
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileRoles(state as StateSchema)).toEqual(undefined)
    })
})