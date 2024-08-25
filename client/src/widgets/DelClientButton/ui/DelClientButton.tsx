import cls from './DelClientButton.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {memo, useState} from 'react'
import { AppButton, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { t } from 'i18next'
import { Modal } from '@/shared/ui/Modal'
import { Text, TextAlign } from '@/shared/ui/Text'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { deleteClient } from '@/entities/Clients'
import DEL_CLIENT from '@/shared/assets/img/delete.svg'
import { useNavigate } from 'react-router-dom'
import { AlertTheme } from '@/shared/ui/Alert'
import { aLertInformerAction } from '@/widgets/ALertInformer'


interface DelClientButtonProps {
  buttonTheme: ButtonTheme;
  buttonText: string;
  clientId: string;
  warningText: string;
}
export const DelClientButton = memo(({buttonTheme, clientId, warningText = 'Это действие необратимо. Хотите продолжить?', buttonText} : DelClientButtonProps) => {
    const [openModal, setOpenModal] = useState(false)
    const toggleModal = () => setOpenModal((prev:boolean) => !prev)
    const dispatch = useAppDispatch()
    const history = useNavigate()

    const handleDelete = () => {
        if (clientId) {
            dispatch(deleteClient(clientId)).then((data) => {
                const id = Date.now().toString()
                if( data.meta.requestStatus === 'fulfilled') {
                    dispatch(aLertInformerAction.addMessage({
                        message: 'Клиент успешно удален',
                        type: AlertTheme.SUCCESS,
                        id: id
                    }))
                    setTimeout(() => {
                        dispatch(aLertInformerAction.removeMessage(id))
                    }, 10000)
                    history('/clients/')
                }
            })
        }
    }

    return ( 
        <div className={classNames(cls.DelClientButton, {}, [])}>
            <AppButton theme={buttonTheme} onClick={toggleModal}><DEL_CLIENT className={cls.icon}/> {buttonText}</AppButton>
            <Modal onClose={toggleModal} isOpen={openModal}>
                <Text align={TextAlign.CENTER} title={warningText} />
                <div className={cls.modal_btns_wrapper}>
                    <AppButton theme={ButtonTheme.OUTLINED} onClick={handleDelete}>{t('Удалить')}</AppButton>
                    <AppButton theme={ButtonTheme.SOLID} onClick={toggleModal}>{t('Отмена')}</AppButton>
                </div>
            </Modal>
        </div>
    )
})