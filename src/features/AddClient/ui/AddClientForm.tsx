import cls from './AddClientForm.module.scss'
import {memo, useCallback, useState} from 'react'
import { t } from 'i18next'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { Input } from 'shared/ui/Input/Input'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useSelector } from 'react-redux'
import { getNewClientData } from '../model/selectors/getNewClientData/getNewClientData'
import { addClientAction, addClientReducer } from '../model/slice/AddClientSlice'
import { Alert, AlertTheme } from 'shared/ui/Alert'
import { PageLoader } from 'widgets/PageLoader'
import { Client } from 'entities/Clients'

const reducers: ReducersList = {
    addClient: addClientReducer
}

export interface AddClientProps {
  onAddClient: (newClient: Client) => void;
  added?: boolean,
  error?: string
}

const AddClientForm = memo(({onAddClient, added, error} : AddClientProps) => {
    const dispatch = useAppDispatch()
    const [errors] = useState({
        name: '',
        avatarUrls: '',
        email: '',
        phone: '',
        profession: '',
        telegram: '',
        instagram: '',
        address: ''
    })
    const data = useSelector(getNewClientData)

    const handleChangeClientName = useCallback((value: string) => {
        dispatch(addClientAction.updateNewClientData({name: value || ''}))
    }, [dispatch])

    const handleChangeClientAvatar = useCallback((value: string) => {
        dispatch(addClientAction.updateNewClientData({avatarUrls: value || ''}))
    }, [dispatch])

    const handleChangeClientAddress = useCallback((value: string) => {
        dispatch(addClientAction.updateNewClientData({address: value || ''}))
    }, [dispatch])

    const handleChangeClientEmail = useCallback((value: string) => {
        dispatch(addClientAction.updateNewClientData({email: value || ''}))
    }, [dispatch])

    const handleChangeClientProfession = useCallback((value: string) => {
        dispatch(addClientAction.updateNewClientData({profession: value || ''}))
    }, [dispatch])

    const handleChangeClientTelegram = useCallback((value: string) => {
        dispatch(addClientAction.updateNewClientData({telegram: value || ''}))
    }, [dispatch])

    const handleChangeClientInstagram = useCallback((value: string) => {
        dispatch(addClientAction.updateNewClientData({instagram: value || ''}))
    }, [dispatch])

    const handleChangeClientPhone = useCallback((value: string) => {
        dispatch(addClientAction.updateNewClientData({phone: value || ''}))
    }, [dispatch])

    const handleAddClient = () => {
        if (data) {
            onAddClient(data)
            dispatch(addClientAction.resetState())
        }
        
    }
    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <div className={cls.info_container}>
                {added && <Alert theme={AlertTheme.SUCCESS} text={t('Клиент успешно добавлен')} />}
                {error && <Alert theme={AlertTheme.ERROR} text={t('Что-то пошло не так... Клиент не добавлен')} />}
                {data === undefined 
                    ? <PageLoader />
                    :(<>
                        <Input  label={t('Ссылка на аватар')} 
                            value={data?.avatarUrls}  
                            onChange={handleChangeClientAvatar} 
                            name='avatar'
                            error={errors?.avatarUrls} />
                        <Input 
                            label={t('Имя')} 
                            value={data?.name}  
                            onChange={handleChangeClientName} 
                            name='name' 
                            error={errors.name}
                        />
                        <Input 
                            label={t('Почта')} 
                            value={data?.email}  
                            onChange={handleChangeClientEmail} 
                            name='email' 
                            error={errors.email}
                        />
                        <Input 
                            label={t('Телефон')} 
                            value={data?.phone}  
                            onChange={handleChangeClientPhone} 
                            name='phone' 
                            error={errors.phone}
                        />
                        <Input 
                            label={t('Адрес')} 
                            value={data?.address}  
                            onChange={handleChangeClientAddress} 
                            name='address' 
                            error={errors.address}
                        />
                        <Input 
                            label={t('Профессия')} 
                            value={data?.profession}  
                            onChange={handleChangeClientProfession} 
                            name='profession' 
                            error={errors.profession}
                        />
                        <Input 
                            label={t('Инстаграм')} 
                            value={data?.instagram}  
                            onChange={handleChangeClientInstagram} 
                            name='instagram' 
                            error={errors.instagram}
                        />
                        <Input 
                            label={t('Телеграм')} 
                            value={data?.telegram}  
                            onChange={handleChangeClientTelegram} 
                            name='telegram' 
                            error={errors.telegram}
                        />
                        <AppButton 
                            theme={ButtonTheme.OUTLINED} 
                            onClick={handleAddClient} 
                            disabled={Object.values(errors).filter((item) => item !== '').length > 0 ? true : false}
                        >
                            {t('Добавить клиента')}
                        </AppButton>
                    </>)}
            </div>
        </DynamicModuleLoader>
        
    )
})

export default AddClientForm