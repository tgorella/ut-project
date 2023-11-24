import classNames from 'shared/lib/classNames/ClassNames'
import { AppRouter } from './providers/router'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsMounted, getUserAuthData, userAction } from 'entities/User'
import { Navbar } from 'widgets/Navbar'
import { fetchProfileData } from 'entities/Profile'

const App = () => {
    const dispatch = useDispatch()
    const mounted = useSelector(getIsMounted)
    const userData = useSelector(getUserAuthData)
    
    useEffect(() => {
        dispatch(userAction.initAuthData())
        if (userData?.username) {
            dispatch(fetchProfileData(userData?.username))
        }
    } , [dispatch, userData?.username])
    
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
