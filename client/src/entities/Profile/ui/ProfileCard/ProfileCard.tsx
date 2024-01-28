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
import { Input } from 'shared/ui/Input/Input'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { profileAction } from 'entities/Profile/model/slice/profileSlice'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { Currency, CurrencySelect } from 'entities/Currency'
import { Country, CountrySelect } from 'entities/Country'
import profileFormValidation from 'entities/Profile/lib/profileFormValidation/profileFormValidation'
import { memo, useEffect, useState } from 'react'

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeProfileName?: (value: string) => void;
  onChangeProfileLastName?: (value: string) => void;
  onChangeProfileUsername?: (value: string) => void;
  onChangeProfileCity?: (value: string) => void;
  onChangeProfileAge?: (value: string) => void;
  onChangeAvatar?: (value: string) => void;
  onChangeCurrency: (value: Currency) => void;
  onChangeCountry: (value: Country) => void;
  saveProfile?: () => void
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
        onChangeProfileAge,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
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
                        {data.age && <div className={cls.item}>
                            {t('Возраст')}: {data?.age}
                        </div>}
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
                {edit && (
                    <div className={cls.info_container}>
                        <Input 
                            label={t('Имя')} 
                            value={data.firstname}  
                            onChange={onChangeProfileName} 
                            name='name' 
                            error={errors.firstname}
                        />
                        <Input 
                            label={t('Фамилия')} 
                            value={data.lastname} 
                            onChange={onChangeProfileLastName} 
                            name='lastname'
                            error={errors.lastname}
                        />
                        <Input 
                            label={t('Логин')} 
                            value={data.username} 
                            onChange={onChangeProfileUsername} 
                            name='login'
                        />
                        <CountrySelect 
                            value={data.country} 
                            onChange={onChangeCountry} 
                        />
                        <Input 
                            label={t('Город')} 
                            value={data.city}  
                            onChange={onChangeProfileCity} 
                            name='city'
                            error={errors.city}
                        />
                        <Input 
                            label={t('Возраст')} 
                            value={data?.age?.toString()}  
                            type='number' onChange={onChangeProfileAge} 
                            name='age'
                            error={errors.age}
                        />
                        <CurrencySelect 
                            value={data.currency} 
                            onChange={onChangeCurrency} 
                        />
                        <Input 
                            label={t('Ссылка на аватар')} 
                            value={data.avatar}  
                            onChange={onChangeAvatar} 
                            name='avatar'
                            error={errors.avatar}
                        />

                        <AppButton theme={ButtonTheme.OUTLINED} onClick={saveProfile} disabled={Object.values(errors).filter((item) => item !== '').length > 0 ? true : false}>{t('Сохранить')}</AppButton>


                    </div>
                )}
                
            </Box>
        </div>
    )
})
export default ProfileCard