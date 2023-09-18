import { counterReducer, counterActions } from './CounterSlice'
import { CounterSchema } from '../types/counterSchema'

describe('counterSlice.test', () => {
    test('increment Counter', () => {
        const state: CounterSchema = {
            value: 10
        }
        expect(counterReducer(state, counterActions.increment())).toEqual({value: 11})
    }),
    test('decrement Counter', () => {
        const state: CounterSchema = {
            value: 10
        }
        expect(counterReducer(state, counterActions.decrement())).toEqual({value: 9})
    }),
    test('with empty state', () => {
        expect(counterReducer(undefined, counterActions.increment())).toEqual({value: 1})
    })
})