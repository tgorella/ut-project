import cls from './ProfileCard.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { useTranslation } from 'react-i18next'
import { Profile } from '../../model/types/profileSchema'
import { PageLoader } from 'widgets/PageLoader'
import { Text } from 'shared/ui/Text'
import { TextAlign, TextTheme } from 'shared/ui/Text/ui/Text'
import { Avatar, AvatarSize } from 'shared/ui/Avatar/Avatar'
import { Box } from 'shared/ui/Box'
import { EditSwitcher } from 'widgets/EditeSwitcher/ui/EditSwitcher'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { profileAction } from 'entities/Profile/model/slice/profileSlice'
import profileFormValidation from 'entities/Profile/lib/profileFormValidation/profileFormValidation'
import { memo, useEffect, useState } from 'react'
import { ProfileForm } from './ProfileForm'

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeProfileName: (value: string) => void;
  onChangeProfileLastName: (value: string) => void;
  onChangeProfileUsername: (value: string) => void;
  onChangeProfileCity: (value: string) => void;
  onChangeAvatar: (value: string) => void;
  onChangeCurrency: (value: string) => void;
  onChangeCountry: (value: string) => void;
  onChangeProfileEmail: (value: string) => void,
  onChangePassword: (val: string) => void,
  onRepeatPassword: (val: string) => void,
  saveProfile: () => void
}
const ProfileCard = memo((props : ProfileCardProps) => {

    const {
        className, 
        data, 
        isLoading,
        readonly,
        onChangeProfileCity,
        onChangeProfileLastName,
        onChangeProfileName,
        onChangeProfileUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
        onChangeProfileEmail,
        onChangePassword,
        onRepeatPassword,
        saveProfile
    } = props
    const {t} = useTranslation('profile')
    
    
    const [errors, setErrors] = useState({
        age: '',
        firstname: '',
        lastname: '',
        avatar: '',
        city: ''
    })

    const edit = !readonly || false
    const dispatch = useAppDispatch()
    const onEdit = () => {
        dispatch(profileAction.setReadOnly(false))
    }

    const onChancelEdit = () => {
        dispatch(profileAction.chancelEdit())
    }


    useEffect(() => {
        if (data) {
            setErrors(profileFormValidation(data))   
        }
    }, [data])


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
                <Text align={TextAlign.CENTER} text={t('Попробуйте обновить страницу')} title={t('Произошла ошибка при загрузке профиля')} theme={TextTheme.WARNING}/>
            </div>
        )
    }
    return ( 
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <Box className={cls.box}>
                <div className={cls.edit_icon}>
                    <EditSwitcher editMode={edit} onChancelEdit={onChancelEdit} onEdit={onEdit} />
                </div>
                <Avatar className={cls.avatar} src={data?.avatar} size={AvatarSize.XL} alt={data?.firstname + ' '+data?.lastname}/>
                {!edit && (
                    <div className={cls.info_container}>
                        <div className={cls.item}>
                            <p className={cls.name}>
                                {data?.firstname+' '+ data?.lastname }
                            </p>
                        </div>
                        <div className={cls.item}>
                            {t('Имя пользователя')}: {data?.username}
                        </div>
                        <div className={cls.item}>
                            {t('Email')}: {data?.email}
                        </div>
                        {data.country && <div className={cls.item}>
                            <p>{t('Страна')}: {data?.country}</p>
                        </div>}
                        {data.city && <div className={cls.item}>
                            <p>{t('Город')}: {data?.city}</p>
                        </div>}
                        {data.currency && <div className={cls.item}>
                            <p>{t('Валюта')}: {data?.currency}</p>
                        </div>}
                    </div>
                )}
                {edit && <ProfileForm
                    data={data}
                    errors={errors}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency} 
                    onChangeCountry={onChangeCountry}
                    onChangeProfileCity={onChangeProfileCity}
                    onChangeProfileLastName={onChangeProfileLastName}
                    onChangeProfileName={onChangeProfileName}
                    onChangeProfileUsername={onChangeProfileUsername}
                    onChangeProfileEmail={onChangeProfileEmail}
                    onChangePassword={onChangePassword}
                    onRepeatPassword={onRepeatPassword}
                    saveProfile={saveProfile}
                />}
                
            </Box>
        </div>
    )
})
export default ProfileCard