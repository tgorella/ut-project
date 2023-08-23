import classNames from 'shared/lib/classNames/ClassNames'
import cls from './AppLink.module.scss'
import { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'

interface AppLinkProps extends LinkProps {
  className?: string
}
export const AppLink: FC<AppLinkProps> = (props) => {
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
}
