import { getIsLogged } from 'entities/User'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isLogged = useSelector(getIsLogged)
    const location = useLocation()

    if (!isLogged) {
        return <Navigate to={RoutePath.main}  state={{from: location}} replace/>
    }
    return children
}
 
export default ProtectedRoute