import cls from './DeleteProductButton.module.scss'
import classNames from  'shared/lib/classNames/ClassNames'
import {memo, useState} from 'react'
import { AppButton, ButtonTheme } from  'shared/ui/AppButton/AppButton'
import { Modal } from  'shared/ui/Modal'
import { Text, TextAlign } from  'shared/ui/Text'
import { useAppDispatch } from  'shared/lib/hooks/useAppDispatch/useAppDispatch'
import DEL_ORDER from  'shared/assets/img/delete.svg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { deleteProduct } from  'entities/Product'


interface DelProductButtonProps {
  buttonTheme: ButtonTheme;
  buttonText: string;
  productId: string;
}
export const DeleteProductButton = memo(({buttonTheme, productId, buttonText} : DelProductButtonProps) => {
    const [openModal, setOpenModal] = useState(false)
    const toggleModal = () => setOpenModal((prev:boolean) => !prev)
    const dispatch = useAppDispatch()
    const history = useNavigate()
    const {t} = useTranslation('product')

    const handleDelete = () => {
        if (productId) {
            dispatch(deleteProduct(productId)).then(() => {
                history(-1)
            })
        }
    }

    return ( 
        <div className={classNames(cls.DelProductButton, {}, [])}>
            <AppButton theme={buttonTheme} onClick={toggleModal} stretch={true}><DEL_ORDER className={cls.icon}/> {buttonText}</AppButton>
            <Modal onClose={toggleModal} isOpen={openModal}>
                <Text align={TextAlign.CENTER} title={t('Внимание! Это действие нельзя будет отменить! Вы точно хотите удалить этот товар?')} />
                <div className={cls.modal_btns_wrapper}>
                    <AppButton theme={ButtonTheme.OUTLINED} onClick={handleDelete}>{t('Удалить')}</AppButton>
                    <AppButton theme={ButtonTheme.SOLID} onClick={toggleModal}>{t('Отмена')}</AppButton>
                </div>
            </Modal>
        </div>
    )
})