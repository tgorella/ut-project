import { AboutPageLazy } from 'pages/AboutPage'
import { MainPageLazy } from 'pages/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { ProfilePageLazy } from 'pages/ProfilePage'
import { RouteProps } from 'react-router-dom'

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  NOTFOUND = 'not_found'
}
export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.NOTFOUND]: '*'
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPageLazy />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPageLazy />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePageLazy />,
    },
    [AppRoutes.NOTFOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
}
