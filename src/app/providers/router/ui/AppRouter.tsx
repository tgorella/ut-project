import { Suspense, memo, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppRoutesProp, routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader'
import ProtectedRoute from './ProtectedRoute'

const AppRouter = () => {

    const renderWithWrapper = useCallback((route : AppRoutesProp) => {
        const el = (
            <Suspense fallback={<PageLoader />}>
                <div className="page-wrapper">
                    {route.element}
                </div>
            </Suspense>
        )

        return (
            <Route
                path={route.path}
                element={ route.authOnly ? <ProtectedRoute>{el}</ProtectedRoute> : el}
                key={route.path}
            />

        )
    },[])

    return (
        <Routes>
            {Object.values(routeConfig).map((route) => 
                renderWithWrapper(route)
            )}
        </Routes>)
}
 
export default memo(AppRouter)