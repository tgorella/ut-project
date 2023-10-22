import cls from './ProfileCard.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { useTranslation } from 'react-i18next'
import { Profile } from '../../model/types/profileSchema'
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader'
import { Text } from 'shared/ui/Text'
import { TextTheme } from 'shared/ui/Text/ui/Text'
import { Avatar, AvatarSize } from 'shared/ui/Avatar/Avatar'

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string
}
export const ProfileCard = ({className, data, isLoading, error} : ProfileCardProps) => {
    const {t} = useTranslation('profile')
    
    console.log(data, error)

    if (isLoading) {
        return (
            <div>
                <PageLoader />
            </div>
        )
    }
    if (!data) {
        return (
            <div>
                <Text text={t('Попробуйте обновить страницу')} title={t('Произошла ошибка при загрузке профиля')} theme={TextTheme.WARNING}/>
            </div>
        )
    }
    return ( 
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <h1>{t('Profile page')}</h1>
            <div className={cls.wrapper} >
                <Avatar src={data?.avatar} size={AvatarSize.XL} alt={data?.firstname + ' '+data?.lastname}/>
                <div className={cls.info_container}>
                    <div className={cls.item}>
                        <p>{t('Имя')}: {data?.firstname}</p>
                    </div>
                    <div className={cls.item}>
                        <p>{t('Фамилия')}: {data?.lastname}</p>
                    </div>
                    <div className={cls.item}>
                        <p>{t('Возраст')}: {data?.age}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
