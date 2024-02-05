import { AboutPage } from 'pages/AboutPage'
import { CalendarPage } from 'pages/CalendarPage'
import { ClientDetailPageLazy } from 'pages/ClientDetailPage/ui/ClientDetailPage/ClientDetailPage.lazy'
import { ClientsPage } from 'pages/ClientsPage'
import { EventDetailPage } from 'pages/EventDetailPage'
import { MainPage } from 'pages/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { OrderDetailsPage } from 'pages/OrderDetailsPage'
import { OrdersPage } from 'pages/OrdersPage'
import { ProfilePage } from 'pages/ProfilePage'
import { ProjectsPage } from 'pages/ProjectsPage'
import { SettingPage } from 'pages/SettingPage'
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
  EVENT_EDIT = 'event_edit',
  SETTINGS = 'settings',
  NOTFOUND = 'not_found',
  PROJECTS = 'projects',
  CALENDAR = 'calendar'
}
export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.CLIENTS]: '/clients',
    [AppRoutes.CLIENT_DETAILS]: '/clients/',
    [AppRoutes.ORDERS]: '/orders',
    [AppRoutes.ORDERS_DETAILS]: '/orders/',
    [AppRoutes.SETTINGS]: '/settings/',
    [AppRoutes.PROJECTS]: '/projects',
    [AppRoutes.CALENDAR]: '/calendar',
    [AppRoutes.EVENT_EDIT]: '/events/',
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
    [AppRoutes.PROJECTS]: {
        path: RoutePath.projects,
        element: <ProjectsPage />,
        authOnly: true
    },
    [AppRoutes.ORDERS_DETAILS]: {
        path: RoutePath.order_details+':id',
        element: <OrderDetailsPage />,
        authOnly: true
    },
    [AppRoutes.EVENT_EDIT]: {
        path: RoutePath.event_edit+':id',
        element: <EventDetailPage />,
        authOnly: true
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authOnly: true
    },
    [AppRoutes.SETTINGS]: {
        path: RoutePath.settings,
        element: <SettingPage />,
        authOnly: true
    },
    [AppRoutes.CALENDAR]: {
        path: RoutePath.calendar,
        element: <CalendarPage />,
        authOnly: true
    },
    [AppRoutes.NOTFOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
        authOnly: false

    },
}
