import { getUserAuthData } from 'entities/User'
import { Suspense, memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader'

const AppRouter = () => {

    const isAuth = useSelector(getUserAuthData)

    const routes = useMemo(()=> {
        return Object.values(routeConfig).filter((item) => {
            if (item.authOnly && !isAuth?.username) {
                return false
            }
            return true
        })
    }, [isAuth])

    return (
        <Routes>
            {routes.map(({path, element}) => (
                <Route
                    path={path}
                    element={(
                        <Suspense fallback={<PageLoader />}>
                            <div className="page-wrapper">
                                {element}
                            </div>
                        </Suspense>
                    )}
                    key={path}
                />
            ))}
        </Routes>)
}
 
export default memo(AppRouter)