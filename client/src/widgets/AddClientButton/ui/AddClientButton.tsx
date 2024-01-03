import { AppButton, ButtonSize, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import cls from './AddClientButton.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { useTranslation } from 'react-i18next'
import ADD_CLIENT from 'shared/assets/img/add-client.svg'
import { useCallback, useState } from 'react'
import { AddClientForm } from 'features/AddClient'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { getAddClientAddedStatus, getAddClientError } from '../module/selectors/addClient/addClient'
import { addClient } from '../module/services/AddClient/addClient'
import { addClientReducer } from 'features/AddClient/model/slice/AddClientSlice'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { addClientButtonReducer } from '../module/slice/AddClientButtonSlice'
import { PreviewWindow } from 'shared/ui/PreviewWindow'

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
    const added = useSelector(getAddClientAddedStatus)
    const newClientError = useSelector(getAddClientError)
    
    const handleAddClient = useCallback(() => {
        dispatch(addClient())
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
                        added={added} 
                        error={newClientError}/>
                </PreviewWindow>
            </div>
        </DynamicModuleLoader>
    )
}