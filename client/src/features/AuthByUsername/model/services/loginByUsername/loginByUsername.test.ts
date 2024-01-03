import { loginByUsername } from './loginByUsername'
import { userAction } from 'entities/User'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

describe('loginByUsername.test', () => {
    // let dispatch: Dispatch
    // let getState: () => StateSchema

    // beforeEach(() => {
    //     dispatch = jest.fn()
    //     getState = jest.fn()
    // })
    // test('success login', async() => {
    //     const user = {id: '1', username: 'Afonya'}
    //     mokedAxios.post.mockReturnValue(Promise.resolve({data: user}))
    //     const action = loginByUsername({username: 'Afonya', password: '123'})
    //     const result = await action(dispatch, getState, undefined)

    //     expect(dispatch).toHaveBeenCalledWith(userAction.setAuthData(user))
    //     expect(dispatch).toHaveBeenCalledTimes(3)
    //     expect(mokedAxios.post).toHaveBeenCalled()
    //     expect(result.meta.requestStatus).toBe('fulfilled')
    //     expect(result.payload).toEqual(user)

    // })
    // test('error login', async() => {
    //     mokedAxios.post.mockReturnValue(Promise.resolve({status: 403}))
    //     const action = loginByUsername({username: 'Afonya', password: '123'})
    //     const result = await action(dispatch, getState, undefined)
    //     console.log(result)

    //     expect(dispatch).toHaveBeenCalledTimes(2)
    //     expect(mokedAxios.post).toHaveBeenCalled()
    //     expect(result.meta.requestStatus).toBe('rejected')
    //     expect(result.payload).toBe('Неправильные логин или пароль')
    // })

    test('success login', async() => {
        const user = {id: '1', username: 'Afonya'}

        const thunk = new TestAsyncThunk(loginByUsername)
        thunk.api.post.mockReturnValue(Promise.resolve({data: user}))

        const result = await thunk.callThunk({username: 'Afonya', password: '123'})

        expect(thunk.dispatch).toHaveBeenCalledWith(userAction.setAuthData(user))
        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(user)

    })
    test('error login', async() => {
        
        const thunk = new TestAsyncThunk(loginByUsername)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk({username: 'Afonya', password: '123'})
        
        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('Неправильные логин или пароль')
    })
})