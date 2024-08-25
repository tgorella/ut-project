import { AppButton, ButtonSize, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import cls from './AddClientButton.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import { useTranslation } from 'react-i18next'
import ADD_CLIENT from '@/shared/assets/img/add-client.svg'
import { useCallback, useState } from 'react'
import { AddClientForm } from '@/features/AddClient'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { addClient } from '../module/services/AddClient/addClient'
import { addClientReducer } from '@/features/AddClient/model/slice/AddClientSlice'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { addClientButtonReducer } from '../module/slice/AddClientButtonSlice'
import { PreviewWindow } from '@/shared/ui/PreviewWindow'
import { aLertInformerAction } from '@/widgets/ALertInformer'
import { AlertTheme } from '@/shared/ui/Alert'

const reducers: ReducersList = {
    addClient: addClientReducer,
    addClientButton: addClientButtonReducer
}

interface AddClientButtonProps {
  className?: string;
}
export const AddClientButton = ({className} : AddClientButtonProps) => {
    const {t} = useTranslation('clients')
    const [openPreview, setOpenPreview] = useState(false)
    const togglePreview = () => setOpenPreview(!openPreview)
    const dispatch = useAppDispatch()
    
    const handleAddClient = useCallback(() => {
        dispatch(addClient()).then((data) => {
            console.log(data.meta.requestStatus)
            const id = Date.now().toString()
            if( data.meta.requestStatus === 'fulfilled') {
                dispatch(aLertInformerAction.addMessage({
                    message: 'Клиент успешно добавлен',
                    type: AlertTheme.SUCCESS,
                    id: id
                }))
                setTimeout(() => {
                    dispatch(aLertInformerAction.removeMessage(id))
                }, 10000)
            }
            if(data.meta.requestStatus === 'rejected') {
                dispatch(aLertInformerAction.addMessage({
                    message: 'Клиент не добавлен',
                    type: AlertTheme.ERROR,
                    id: id
                }))
                setTimeout(() => {
                    dispatch(aLertInformerAction.removeMessage(id))
                }, 10000)
            }
        })
    }, [dispatch])

    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <div className={classNames(cls.AddClientButton, {}, [className])}>
                <AppButton 
                    size={ButtonSize.S} 
                    theme={ButtonTheme.SOLID}
                    onClick={togglePreview}
                >
                    <ADD_CLIENT className={cls.icon}/>{t('Добавить клиента')}
                </AppButton>
                <PreviewWindow onClose={togglePreview} isOpen={openPreview}>
                    <AddClientForm
                        onAddClient={handleAddClient}
                    />
                </PreviewWindow>
            </div>
        </DynamicModuleLoader>
    )
}