import { loginByEmail } from './loginByEmail'
// import { userAction } from 'entities/User'
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

describe('loginByEmail.test', () => {
    
    // test('success login', async() => {
    //     const user = {_id: '1', email: 'Afonya'}

    //     const thunk = new TestAsyncThunk(loginByEmail)
    //     thunk.api.post.mockReturnValue(Promise.resolve({data: user}))

    //     const result = await thunk.callThunk({email: 'Afonya', password: '123'})

    //     expect(thunk.dispatch).toHaveBeenCalledWith(userAction.setAuthData(user))
    //     expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    //     expect(thunk.api.post).toHaveBeenCalled()
    //     expect(result.meta.requestStatus).toBe('fulfilled')
    //     expect(result.payload).toEqual(user)

    // })
    test('error login', async() => {
        
        const thunk = new TestAsyncThunk(loginByEmail)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk({email: 'Afonya', password: '123'})
        
        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('Неправильные логин или пароль')
    })
})