import cls from './Dropdown.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import { Fragment, ReactNode, memo } from 'react'
import { Menu } from '@headlessui/react'
import { DropdownDirection } from '@/shared/types/ui'
import { AppLink } from '@/shared/ui/AppLink/AppLink'

export interface DropDownItem {
  content: ReactNode
  disabled?: boolean
  onClick?: () => void
  href?: string
}

interface DropdownProps {
  className?: string
  items: DropDownItem[]
  trigger: ReactNode
  position: DropdownDirection
}
export const Dropdown = memo(
    ({ className, items, trigger, position = 'bottom-right' }: DropdownProps) => {
        return (
            <Menu
                as='div'
                className={classNames(cls.Dropdown, {}, [className])}
            >
                <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
                <Menu.Items className={cls.menu + ' ' + cls[position]}>
                    {items.map((item, index) => {
                        if (item.href) {
                            return (
                                <Menu.Item
                                    key={'menu_item_' + index}
                                    as={AppLink}
                                    to={item.href}
                                >
                                    {({ active }) => (
                                        <button
                                            className={`${cls.item} ${active ? cls.active : ''}`}
                                        >
                                            {item.content}
                                        </button>
                                    )}
                                </Menu.Item>
                            )
                        }
                        return (
                            <Menu.Item
                                key={'menu_item_' + index}
                                as={Fragment}
                            >
                                {({ active }) => (
                                    <button
                                        type='button'
                                        onClick={item.onClick}
                                        className={`${cls.item} ${active ? cls.active : ''}`}
                                    >
                                        {item.content}
                                    </button>
                                )}
                            </Menu.Item>
                        )
                    })}
                </Menu.Items>
            </Menu>
        )
    }
)
