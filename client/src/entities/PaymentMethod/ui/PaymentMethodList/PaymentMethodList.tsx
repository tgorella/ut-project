import cls from './PaymentMethodList.module.scss'
import {memo, useState} from 'react'
import { useSelector } from 'react-redux'
import { getPaymentMethodsData } from '../../model/selectors/getPaymentMethodsData/getPaymentMethodsData'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { deletePaymentMethod } from '../../model/services/deletePaymentMethod/deletePaymentMethod'
import { AppButton, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import DEL_ICON from '@/shared/assets/img/delete.svg'
import FAV_ICON from '@/shared/assets/img/fav.svg'
import EDIT_ICON from '@/shared/assets/img/pencil.svg'
import { useTranslation } from 'react-i18next'
import { Box } from '@/shared/ui/Box'
import { isUserDeveloper } from '@/entities/Profile'
import classNames from '@/shared/lib/classNames/ClassNames'
import { Modal } from '@/shared/ui/Modal'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text, TextAlign } from '@/shared/ui/Text'
import {AlertTheme } from '@/shared/ui/Alert'
import { aLertInformerAction } from '@/widgets/ALertInformer'

export const PaymentMethodList = memo(() => {
    const items = useSelector(getPaymentMethodsData || [])
    const dispatch = useAppDispatch()
    const isDeveloper = useSelector(isUserDeveloper)
    const [openModal, setOpenModal]=useState(false)
    const [methodId, setMethodId] = useState('')
    const {t} = useTranslation()

    const toggleModal = () => setOpenModal((prev:boolean) => !prev)

    const handleOpenModal = (id: string) => {
        setMethodId(id)
        toggleModal()
    }
    const handleDeleteMethod = () => {
        dispatch(deletePaymentMethod(methodId))
            .then(() => {
                toggleModal()
                const id = Date.now().toString()
                dispatch(aLertInformerAction.addMessage({
                    message: t('Метод оплаты удален'),
                    type: AlertTheme.SUCCESS,
                    id: id
                }))
                setTimeout(() => {
                    dispatch(aLertInformerAction.removeMessage(id))
                }, 10000)
            })
            .catch(() => {
                toggleModal()
                const id = Date.now().toString()
                dispatch(aLertInformerAction.addMessage({
                    message: t('Произошла ошибка при удалении метода оплаты'),
                    type: AlertTheme.ERROR,
                    id: id.toString()
                }))
                setTimeout(() => {
                    dispatch(aLertInformerAction.removeMessage(id.toString()))
                }, 10000)
            })
    }

    const mods = {
        dev_mode: isDeveloper
    }

    return ( <div>
        <Box>
            {items?.map((item) => {
                return (
                    <div key={item._id} className={classNames(cls.list_item, mods, [])}  >
                        {item.icon_url ? (<img src={item.icon_url} alt={item.name}  className={cls.item__image}/>) : (<span></span>)}
                        <span>{item.name}</span>
                        <AppButton title={t('Добавить в избранное')} square={true} theme={ButtonTheme.CLEAR} ><FAV_ICON className={cls['icon_not-selected']} /></AppButton>
                        {isDeveloper && <AppButton title={t('Редактировать')} square={true} theme={ButtonTheme.CLEAR} ><EDIT_ICON className={cls.icon} /></AppButton>}
                        <AppButton title={t('Удалить')} square={true} theme={ButtonTheme.CLEAR} onClick={() => handleOpenModal(item._id)} ><DEL_ICON className={cls.icon} /></AppButton>
                    </div>
                )
            })}
        </Box>
        <Modal onClose={toggleModal} isOpen={openModal}>
            <VStack max gap='20'>
                <Text align={TextAlign.CENTER} text={t('Вы точно хотите удалить метод оплаты? Это действие необратимо')}/>
                <HStack max justify='between'>
                    <AppButton stretch theme={ButtonTheme.OUTLINED} onClick={handleDeleteMethod}>{t('Удалить')}</AppButton>
                    <AppButton stretch theme={ButtonTheme.SOLID} onClick={toggleModal}>{t('Отмена')}</AppButton>
                </HStack>
            </VStack>
        </Modal>
       

    </div>
    )
})