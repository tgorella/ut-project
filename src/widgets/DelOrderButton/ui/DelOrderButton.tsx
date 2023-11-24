import cls from './DelOrderButton.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useState} from 'react'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { t } from 'i18next'
import { Modal } from 'shared/ui/Modal'
import { Text, TextAlign } from 'shared/ui/Text'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import DEL_ORDER from 'shared/assets/img/delete.svg'
import { useNavigate } from 'react-router-dom'
import { deleteOrder } from 'entities/Order'


interface DelOrderButtonProps {
  buttonTheme: ButtonTheme;
  buttonText: string;
  orderId: string;
  warningText: string;
}
export const DelOrderButton = memo(({buttonTheme, orderId, warningText = 'Это действие необратимо. Хотите продолжить?', buttonText} : DelOrderButtonProps) => {
    const [openModal, setOpenModal] = useState(false)
    const toggleModal = () => setOpenModal((prev:boolean) => !prev)
    const dispatch = useAppDispatch()
    const history = useNavigate()

    const handleDelete = () => {
        if (orderId) {
            dispatch(deleteOrder(orderId)).then(() => {
                history('/orders/')
            })
        }
    }

    return ( 
        <div className={classNames(cls.DelOrderButton, {}, [])}>
            <AppButton theme={buttonTheme} onClick={toggleModal}><DEL_ORDER className={cls.icon}/> {buttonText}</AppButton>
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