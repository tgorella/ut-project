import { AboutPage } from 'pages/AboutPage'
import { ClientDetailPageLazy } from 'pages/ClientDetailPage/ui/ClientDetailPage/ClientDetailPage.lazy'
import { ClientsPage } from 'pages/ClientsPage'
import { MainPage } from 'pages/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { OrderDetailsPage } from 'pages/OrderDetailsPage'
import { OrdersPage } from 'pages/OrdersPage'
import { ProfilePage } from 'pages/ProfilePage'
import { RouteProps } from 'react-router-dom'

export type AppRoutesProp = RouteProps & {
  authOnly?: boolean
}

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  CLIENTS = 'clients',
  CLIENT_DETAILS = 'client_details',
  ORDERS ='orders',
  ORDERS_DETAILS = 'order_details',
  NOTFOUND = 'not_found'
}
export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.CLIENTS]: '/clients',
    [AppRoutes.CLIENT_DETAILS]: '/clients/',
    [AppRoutes.ORDERS]: '/orders',
    [AppRoutes.ORDERS_DETAILS]: '/orders/',
    [AppRoutes.NOTFOUND]: '*'
}

export const routeConfig: Record<AppRoutes, AppRoutesProp> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
        authOnly: false
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
        authOnly: false

    },
    [AppRoutes.CLIENTS]: {
        path: RoutePath.clients,
        element: <ClientsPage />,
        authOnly: true
    },
    [AppRoutes.CLIENT_DETAILS]: {
        path: RoutePath.client_details+':id',
        element: <ClientDetailPageLazy />,
        authOnly: true
    },
    [AppRoutes.ORDERS]: {
        path: RoutePath.orders,
        element: <OrdersPage />,
        authOnly: true
    },
    [AppRoutes.ORDERS_DETAILS]: {
        path: RoutePath.order_details+':id',
        element: <OrderDetailsPage />,
        authOnly: true
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authOnly: true
    },
    [AppRoutes.NOTFOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
        authOnly: false

    },
}
