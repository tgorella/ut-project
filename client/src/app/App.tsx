import classNames from '@/shared/lib/classNames/ClassNames'
import { AppRouter } from './providers/router'
import { Sidebar } from '@/widgets/Sidebar'
import { Suspense, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIsMounted, getUserAuthData, userAction } from '@/entities/User'
import { Navbar } from '@/widgets/Navbar'
import { fetchProfileData } from '@/entities/Profile'
import { fetchUserModules } from '@/entities/AppModules/model/services/fetchUserModules/fetchUserModules'

const App = () => {
    const dispatch = useDispatch()
    const mounted = useSelector(getIsMounted)
    const userData = useSelector(getUserAuthData)
    
    useEffect(() => {
        dispatch(userAction.initAuthData())
        if (userData?._id) {
            dispatch(fetchProfileData())
            dispatch(fetchUserModules())
        }
    } , [dispatch, userData?._id])
    
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
