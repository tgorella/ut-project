import classNames from '@/shared/lib/classNames/ClassNames'
import cls from './AppLink.module.scss'
import { ReactNode, memo } from 'react'
import { Link, LinkProps } from 'react-router-dom'

interface AppLinkProps extends LinkProps {
  className?: string
  children: ReactNode
}
export const AppLink = memo((props: AppLinkProps) => {
    const { className, children, to, ...otherProps } = props
    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, {}, [className])}
            {...otherProps}
        >
            {children}
        </Link>
    )
})
