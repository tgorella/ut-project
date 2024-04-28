import { getProfileRoles } from '@/entities/Profile'
import { UserRole } from '@/entities/Profile/model/types/profileSchema'
import { getIsLogged } from '@/entities/User'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

interface ProtectedRouteProps {
  children: JSX.Element,
  roles?: UserRole[]
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
    const isLogged = useSelector(getIsLogged)
    const location = useLocation()
    const userRoles = useSelector(getProfileRoles)

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true
        }

        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole)
            return hasRole
        })
    }, [roles, userRoles])

    if (!isLogged) {
        return <Navigate to={RoutePath.main}  state={{from: location}} replace/>
    }

    if (!hasRequiredRoles) {
        return <Navigate to={RoutePath.dashboard}  state={{from: location}} replace/>
    }
    
    return children
}
 
export default ProtectedRoute