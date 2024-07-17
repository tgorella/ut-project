import { memo } from 'react'
import cls from './AppModules.module.scss'
import { ModulesKey } from '../model/types/AppModules'
import classNames from '@/shared/lib/classNames/ClassNames'

interface AppModulesItemProps {
  className?: string;
  item: {path: ModulesKey, name: string}
  onClick: (val: ModulesKey) => void,
  status: boolean
}
const AppModulesItem = memo(({className, item, status, onClick} : AppModulesItemProps) => {
    return ( <div className={cls.item} key={item.path}>
        <div className={classNames(cls.switcherWrapper, {}, [className])}>
            <div onClick={() => onClick(item.path)} className={classNames(cls.themeSwitcher, {}, [status ? cls.on : cls.off])}>
                <div className={classNames(cls.button)}></div>
            </div>
        </div>
        <div className={cls.item_name}>{item.name}</div>
    </div> )
}
)
export default AppModulesItem