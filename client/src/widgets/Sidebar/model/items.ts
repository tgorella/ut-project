import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import MainIcon from 'shared/assets/img/home.svg'
import AboutIcon from 'shared/assets/img/about.svg'
import ClientsIcon from 'shared/assets/img/client_icon.svg'
import OrdersIcon from 'shared/assets/img/orders.svg'
import Calendar from 'shared/assets/img/calendar.svg'
import ProjectIcon from 'shared/assets/img/projects.svg'
import { LucideIcon } from 'lucide-react'

export interface SidebarItemType {
  path: string,
  text: string,
  icon: React.VFC<React.SVGProps<SVGSVGElement>> | LucideIcon,
  isAuth: boolean,
  module: boolean,
  moduleName?: string
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        icon: MainIcon,
        text: 'Главная страница',
        isAuth: false,
        module: false
    },
    {
        path: RoutePath.dashboard,
        icon: MainIcon,
        text: 'Dashboard',
        isAuth: true,
        module: false
    },  
    {
        path: RoutePath.about,
        icon: AboutIcon,
        text: 'О сайте',
        isAuth: false,
        module: false
    },
    {
        path: RoutePath.clients,
        icon: ClientsIcon,
        text: 'Клиенты',
        isAuth: true,
        module: true,
        moduleName: 'clients'

    },
    {
        path: RoutePath.orders,
        icon: OrdersIcon,
        text: 'Заказы',
        isAuth: true,
        module: true,
        moduleName: 'orders'
    },
    {
        path: RoutePath.calendar,
        icon: Calendar,
        text: 'Календарь',
        isAuth: true,
        module: true,
        moduleName: 'calendar'
    },
    {
        path: RoutePath.projects,
        icon: ProjectIcon,
        text: 'Проекты',
        isAuth: true,
        module: true,
        moduleName: 'projects'
    }
]