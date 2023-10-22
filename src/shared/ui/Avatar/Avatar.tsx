import cls from './Avatar.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import AVATAR from '../../assets/img/default-avatar.png'

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
export const Avatar = ({className, size = AvatarSize.M, alt='avatar', src = AVATAR} : AvatarProps) => {
    return (
        <img className={classNames(cls.Avatar, {}, [className, cls[size]])} alt={alt} src={src} />
    )
}