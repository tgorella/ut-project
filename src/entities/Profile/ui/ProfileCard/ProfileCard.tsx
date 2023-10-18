import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData'
import { getProfileLoadingError } from 'entities/Profile/model/selectors/getProfileLoadingError/getProfileLoadingError'
import { getProfileLoadingStatus } from 'entities/Profile/model/selectors/getProfileLoadingStatus/getProfileLoadingStatus'
import { useSelector } from 'react-redux'
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader'
import cls from './ProfileCard.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { useTranslation } from 'react-i18next'

interface ProfileCardProps {
  className?: string;
}
export const ProfileCard = ({className} : ProfileCardProps) => {
    const {t} = useTranslation('profile')
    const data = useSelector(getProfileData)
    const isLoading = useSelector(getProfileLoadingStatus)
    const error = useSelector(getProfileLoadingError)

    if (isLoading) {
        return <PageLoader />
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className])}>
                {error}
            </div>
        )
    }
    return ( 
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <h1>{t('Profile page')}</h1>
            <div className={cls.wrapper} >
                <img src={data?.avatar} className={cls.avatar}/>
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
