import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import MainIcon from 'shared/assets/img/home.svg'
import AboutIcon from 'shared/assets/img/about.svg'
import ClientsIcon from 'shared/assets/img/client_icon.svg'

export interface SidebarItemType {
  path: string,
  text: string,
  icon: React.VFC<React.SVGProps<SVGSVGElement>>,
  isAuth: boolean
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        icon: MainIcon,
        text: 'Главная страница',
        isAuth: false
    },  
    {
        path: RoutePath.about,
        icon: AboutIcon,
        text: 'О сайте',
        isAuth: false
    },
    {
        path: RoutePath.profile,
        icon: AboutIcon,
        text: 'Профиль',
        isAuth: true
    },
    {
        path: RoutePath.clients,
        icon: ClientsIcon,
        text: 'Клиенты',
        isAuth: true,
        
    }
]