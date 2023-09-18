import { StateSchema } from 'app/providers/StoreProvider'
import { DeepPartial } from '@reduxjs/toolkit'
import { getCounterValue } from './getCounterValue'

describe('getCounterValue.test', () => {
    test('get value of counter', () => {
        const state: DeepPartial<StateSchema> = {
            counter: {value: 10}
        }
        expect(getCounterValue(state as StateSchema)).toEqual(10)
    })
})