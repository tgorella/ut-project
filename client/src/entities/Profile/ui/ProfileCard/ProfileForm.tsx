import { t } from 'i18next'
import { AppButton, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import cls from './ProfileCard.module.scss'
import { Profile } from '../../model/types/profileSchema'
import formGenerator, { FormItem, FromComponent } from '@/shared/lib/formGenerator/formGenerator'

interface ProfileFormProps {
  className?: string;
  errors: Record<string, string>,
  data: Partial<Profile>,
  full?: boolean,
  onChangeProfileName: (val: string) => void,
  onChangeProfileLastName: (val: string) => void,
  onChangeProfileUsername: (val: string) => void,
  onChangeCountry: (val: string) => void,
  onChangeProfileCity: (val: string) => void,
  onChangeCurrency: (val: string) => void,
  onChangeAvatar: (val: string) => void,
  onChangeProfileEmail: (val: string) => void,
  onChangePassword: (val: string) => void,
  onRepeatPassword: (val: string) => void,
  saveProfile: () => void
}
export const ProfileForm = ({
    errors, 
    data, 
    full = true,
    onChangeAvatar, 
    onChangeCountry, 
    onChangeCurrency,
    onChangeProfileCity, 
    onChangeProfileLastName, 
    onChangeProfileName, 
    onChangeProfileUsername,
    onChangeProfileEmail,
    onChangePassword,
    onRepeatPassword,
    saveProfile
} : ProfileFormProps) => {

  

    const formSchema : Array<FormItem>= [
        {
            label: t('Логин'),
            valuePath: 'username',
            onChange: onChangeProfileUsername,
            name: 'username',
            component: FromComponent.INPUT,
            otherProps: {
                autoComplete: 'username'
            }
        },
        {
            label: t('Email'),
            valuePath: 'email',
            onChange: onChangeProfileEmail,
            name: 'email',
            
            component: FromComponent.INPUT,
            otherProps: {
                autoComplete: 'email',
                type: 'email',
            }
        },
        {
            label: t('Новый пароль'),
            valuePath: '',
            onChange: onChangePassword,
            name: 'newPassword',
            component: FromComponent.INPUT,
            otherProps: {
                autoComplete: 'new-password',
                type: 'password'
            }
        },
        {
            label: t('Повторите пароль'),
            valuePath: '',
            onChange: onRepeatPassword,
            name: 'repeatPassword',
            component: FromComponent.INPUT,
            otherProps: {
                autoComplete: 'new-password',
                type: 'password'
            }
        }
    ]

    if (full) {
        formSchema.push(
            {
                label: t('Имя'),
                valuePath: 'firstname',
                onChange: onChangeProfileName,
                name: 'name',
                component: FromComponent.INPUT,
                otherProps: {
                    autoComplete: 'given-name',
                    type: 'text'
                }
            },
            {
                label: t('Фамилия'),
                valuePath: 'lastname',
                onChange: onChangeProfileLastName,
                name: 'lastname',
                component: FromComponent.INPUT,
                otherProps: {
                    autoComplete: 'family-name',
                    type: 'text'
                }
            },
            {
                label: t('Ссылка на аватар'),
                valuePath: 'avatar',
                onChange: onChangeAvatar,
                name: 'avatar',
                component: FromComponent.INPUT,
                otherProps: {
                    autoComplete: 'photo'
                }
            },
            {
                label: t('Страна'),
                valuePath: 'country',
                onChange: onChangeCountry,
                name: 'country',
                component: FromComponent.COUNTRY
            },{
                label: t('Город'),
                valuePath: 'city',
                onChange: onChangeProfileCity,
                name: 'city',
                component: FromComponent.INPUT,
                otherProps: {
                    autoComplete: 'address-level2'
                }
            },
            {
                valuePath: 'currency',
                component: FromComponent.CURRENCY,
                name: 'currency',
                onChange: onChangeCurrency
            }  )
    }

    return ( 
        <div  className={cls.info_container}>
            <form>
                {formGenerator(formSchema, data, errors)}
                <AppButton 
                    theme={ButtonTheme.OUTLINED} 
                    stretch={true}
                    onClick={saveProfile} 
                    type='button'
                    disabled={Object.values(errors).filter((item) => item !== '').length > 0 ? true : false}
                >{t('Сохранить')}</AppButton>
            </form>
         
        </div>
    )
}