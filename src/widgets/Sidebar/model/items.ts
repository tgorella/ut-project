import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import MainIcon from 'shared/assets/img/home.svg'
import AboutIcon from 'shared/assets/img/about.svg'

export interface SidebarItemType {
  path: string,
  text: string,
  icon: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        icon: MainIcon,
        text: 'Главная страница'
    },  
    {
        path: RoutePath.about,
        icon: AboutIcon,
        text: 'О сайте'
    },
    {
        path: RoutePath.profile,
        icon: AboutIcon,
        text: 'Profile page'
    }
]