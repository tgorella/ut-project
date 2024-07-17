import cls from './Avatar.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import AVATAR from '../../assets/img/default-avatar.png'
import { memo } from 'react'

export enum AvatarSize {
  S = 'small',
  M = 'medium',
  L = 'large',
  XL = 'xlarge'
}

interface AvatarProps {
  className?: string;
  size?: AvatarSize;
  alt?: string;
  src?: string
}
export const Avatar = memo(({className, size = AvatarSize.M, alt='avatar', src = AVATAR} : AvatarProps) => {
    return (
        <div className={classNames(cls.Avatar, {}, [className, cls[size]])} title={alt} style={{backgroundImage: `url(${src})`}}>
        </div>
    )
})