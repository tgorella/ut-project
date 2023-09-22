import classNames from 'shared/lib/classNames/ClassNames'
import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar/ui/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { userAction } from 'entities/User'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userAction.initAuthData())
    } , [dispatch])
    
    return (
        <div className={classNames('app', {}, [])} id='app'>
            <Suspense fallback=''>
                <Navbar />
                <div className='content-page'>
                    <Sidebar className={''} />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )
}

export default App
