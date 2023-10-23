import cls from './ProfileCard.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { useTranslation } from 'react-i18next'
import { Profile } from '../../model/types/profileSchema'
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader'
import { Text } from 'shared/ui/Text'
import { TextTheme } from 'shared/ui/Text/ui/Text'
import { Avatar, AvatarSize } from 'shared/ui/Avatar/Avatar'
import { Box } from 'shared/ui/Box'
import { EditSwitcher } from 'widgets/EditeSwitcher/ui/EditSwitcher'
import { useState } from 'react'
import { Input } from 'shared/ui/Input/Input'

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string
}
export const ProfileCard = ({className, data, isLoading, error} : ProfileCardProps) => {
    const {t} = useTranslation('profile')
    
    const [edit, setIsEdit] = useState(false)
    const toggleEdit = () => {
        setIsEdit(prev => !prev)
    }

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
            <Box>
                <div className={cls.edit_icon}>
                    <EditSwitcher editMode={edit} toggleEditMode={toggleEdit}/>
                </div>
                <Avatar src={data?.avatar} size={AvatarSize.XL} alt={data?.firstname + ' '+data?.lastname}/>
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
                            {t('Возраст')}: {data?.age}
                        </div>
                        <div className={cls.item}>
                            <p>{t('Страна')}: {data?.country}</p>
                        </div>
                        <div className={cls.item}>
                            <p>{t('Город')}: {data?.city}</p>
                        </div>
                        <div className={cls.item}>
                            <p>{t('Валюта')}: {data?.currency}</p>
                        </div>
                    </div>
                )}
                {edit && (
                    <div className={cls.info_container}>
                        <Input label={t('Имя')} value={data.firstname} />
                        <Input label={t('Фамилия')} value={data.lastname} />
                        <Input label={t('Логин')} value={data.username} />
                        <Input label={t('Возраст')} value={data.age}  type='number'/>



                    </div>
                )}
                
            </Box>
        </div>
    )
}
