import cls from './AddClientForm.module.scss'
import {memo, useCallback, useState} from 'react'
import { t } from 'i18next'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { getNewClientData } from '../model/selectors/getNewClientData/getNewClientData'
import { addClientAction } from '../model/slice/AddClientSlice'
import { Alert, AlertTheme } from '@/shared/ui/Alert'
import { PageLoader } from '@/widgets/PageLoader'
import { ClientForm } from '@/entities/Clients'
import { Text } from '@/shared/ui/Text'

export interface AddClientProps {
  onAddClient: () => void;
  added?: boolean,
  error?: string,
  withButton?: boolean
}

const AddClientForm = memo(({onAddClient, added, error, withButton = true} : AddClientProps) => {
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
        onAddClient()
        dispatch(addClientAction.resetState())
    }
    
    return ( 
        <div>
            <Text title={t('Добавить нового клиента')} />
            <div className={cls.info_container}>
                {added && <Alert theme={AlertTheme.SUCCESS} text={t('Клиент успешно добавлен')} />}
                {error && <Alert theme={AlertTheme.ERROR} text={t('Что-то пошло не так... Клиент не добавлен')} />}
                {data === undefined 
                    ? <PageLoader />
                    :(<>
                        <ClientForm 
                            data={data}
                            errors={errors}
                            withButton={withButton}
                            onChangeAvatar={handleChangeClientAvatar}
                            onChangeClientAddress={handleChangeClientAddress}
                            onChangeClientEmail={handleChangeClientEmail}
                            onChangeClientInstagram={handleChangeClientInstagram}
                            onChangeClientName={handleChangeClientName}
                            onChangeClientPhone={handleChangeClientPhone}
                            onChangeClientProfession={handleChangeClientProfession}
                            onChangeClientTelegram={handleChangeClientTelegram}
                            onSaveUser={handleAddClient}
                        />
                    </>)}
            </div>
        </div>
    )
})

export default AddClientForm