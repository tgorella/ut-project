import cls from './ProfilePage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ProfileCard, fetchProfileData, getProfileForm, getProfileLoadingError, getProfileLoadingStatus, getProfileReadOnly, profileAction, profileReducer, updateProfileData } from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { memo, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { getUserAuthData } from 'entities/User'
import { Box } from 'shared/ui/Box'
import { AppModulesBlock } from 'entities/AppModules'

const reducers: ReducersList = {
    profile: profileReducer
}
interface ProfilePageProps {
  className?: string;
}
const ProfilePage = memo(({className} : ProfilePageProps) => {
    const dispatch = useAppDispatch()
    const userData = useSelector(getUserAuthData)
    
    useEffect(() => {
        if (userData) {
            if (__PROJECT__ !== 'storybook') {
                dispatch(fetchProfileData(userData._id))
            }
        }
        
    }, [dispatch, userData])
  
    const data = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileLoadingStatus)
    const error = useSelector(getProfileLoadingError)
    const readonly = useSelector(getProfileReadOnly)
    
    const {t} = useTranslation('profile')

    const onChangeProfileName = useCallback((value: string) => {
        dispatch(profileAction.updateProfile({firstname: value || ''}))
    }, [dispatch])

    const onChangeProfileLastName = useCallback((value: string) => {
        dispatch(profileAction.updateProfile({lastname: value || ''}))
    }, [dispatch])

    const onChangeProfileCity = useCallback((value: string) => {
        dispatch(profileAction.updateProfile({city: value || ''}))
    }, [dispatch])

    const onChangeProfileAge = useCallback((value: string) => {
        dispatch(profileAction.updateProfile({age: Number(value) || 0}))
    }, [dispatch])

    const onChangeProfileUsername = useCallback((value: string) => {
        dispatch(profileAction.updateProfile({username: value}))
    }, [dispatch])

    const onChangeProfileAvatar = useCallback((value: string) => {
        dispatch(profileAction.updateProfile({avatar: value}))
    }, [dispatch])

    const onChangeCurrency = useCallback((value: Currency) => {
        dispatch(profileAction.updateProfile({currency: value}))
    }, [dispatch])

    const onChangeCountry = useCallback((value: Country) => {
        dispatch(profileAction.updateProfile({country: value}))
    }, [dispatch])

    const saveProfile = useCallback(() => {
        dispatch(updateProfileData())
        dispatch(profileAction.setReadOnly(true))
    }, [dispatch])

    return ( 
        <DynamicModuleLoader reducers={reducers} >
            <div className={cls.page_wrapper}>
                <h1 className={cls.title}>{t('Profile page')}</h1>
                <div className={classNames(cls.ProfilePage, {}, [className])}>
                    <div className={cls.small_column} >
                        <ProfileCard 
                            data={data} 
                            isLoading={isLoading} 
                            error={error} 
                            readonly={readonly}
                            onChangeProfileCity={onChangeProfileCity}
                            onChangeProfileLastName={onChangeProfileLastName}
                            onChangeProfileName={onChangeProfileName}
                            onChangeProfileUsername={onChangeProfileUsername}
                            onChangeProfileAge={onChangeProfileAge}
                            onChangeAvatar={onChangeProfileAvatar}
                            onChangeCurrency={onChangeCurrency}
                            onChangeCountry={onChangeCountry}
                            saveProfile={saveProfile}
                        />
                    </div>
                    <div className={cls.big_column}>
                        <Box header={t('Настройка пунктов меню')}>
                            <AppModulesBlock />
                        </Box>
                    </div>
                </div>
            </div>
            
        </DynamicModuleLoader>
        
    )
  
})

export default ProfilePage