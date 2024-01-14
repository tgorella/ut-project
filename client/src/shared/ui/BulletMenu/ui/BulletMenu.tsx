import cls from './BulletMenu.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { bulletMenuItemSchema } from '../model/types/bulletMenuItemSchema'


interface BulletMenuProps {
  className?: string;
  items: bulletMenuItemSchema[],
  path: string,
  onClick: (val: string) => void
}
export const BulletMenu = memo(({className, items, path, onClick} : BulletMenuProps) => {
    return ( 
        <div className={classNames(cls.BulletMenu, {}, [className])}>
            {items.map((el) => {
                return <div
                    key={el.elementName}
                    onClick={() => onClick(el.elementName)}
                    className={path === el.elementName ? cls.active + ' ' + cls.item : cls.item}>
                    {el.text}
                </div>
            } )}
        </div>
    )
})