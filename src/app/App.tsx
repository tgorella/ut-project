import classNames from 'shared/lib/classNames/ClassNames'
import { AppRouter } from './providers/router'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsMounted, userAction } from 'entities/User'
import { Navbar } from 'widgets/Navbar'

const App = () => {
    const dispatch = useDispatch()
    const mounted = useSelector(getIsMounted)
    useEffect(() => {
        dispatch(userAction.initAuthData())
    } , [dispatch])
    
    return (
        <div className={classNames('app', {}, [])} id='app'>
            <Suspense fallback=''>
                <Navbar />
                <div className='content-page'>
                    <Sidebar className={''} />
                    {mounted && <AppRouter />}
                </div>
            </Suspense>
        </div>
    )
}

export default App
