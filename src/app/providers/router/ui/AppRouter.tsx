import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'

const AppRouter = () => {
    return (
        <Routes>
            {Object.values(routeConfig).map(({path, element}) => (
                <Route
                    path={path}
                    element={(
                        <Suspense fallback='Loading'>
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
 
export default AppRouter