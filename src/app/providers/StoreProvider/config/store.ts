import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { counterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'

export function createReduxStore(initialState?: StateSchema) {

    const rootReducer: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer
    }
    return configureStore<StateSchema>({
        reducer: rootReducer,
        devTools: ISDEV,
        preloadedState: initialState

    })
}
