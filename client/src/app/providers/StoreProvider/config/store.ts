import { CombinedState, Reducer, ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { userReducer } from '@/entities/User'
import { createReducerManager } from './reducerManager'
import { http } from '@/shared/api/api'
import { profileReducer } from '@/entities/Profile'
import { appModulesReducer } from '@/entities/AppModules/model/slice/AppModulesSlice'

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>) {

    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        profile: profileReducer,
        userModules: appModulesReducer
    }

    const reducerManager = createReducerManager(rootReducer)

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: ISDEV,
        preloadedState: initialState,
        middleware: curryGetDefaultMiddleware => curryGetDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: http
                }
            }
        })
    })

    // @ts-ignore
    store.reducerManager = reducerManager
    
    return store
}


export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']