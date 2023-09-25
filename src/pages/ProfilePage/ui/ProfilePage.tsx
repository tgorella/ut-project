import cls from './ProfilePage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { useTranslation } from 'react-i18next'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from 'entities/Profile'

const reducers: ReducersList = {
    profile: profileReducer
}
interface ProfilePageProps {
  className?: string;
}
const ProfilePage = ({className} : ProfilePageProps) => {
    const {t} = useTranslation()
    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                <h1>{t('Profile page')}</h1>
            </div>
        </DynamicModuleLoader>
        
    )
}

export default ProfilePage