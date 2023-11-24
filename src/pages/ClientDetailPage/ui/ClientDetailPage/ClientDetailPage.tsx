import { useTranslation } from 'react-i18next'
import cls from './ClientDetailPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { useNavigate, useParams } from 'react-router-dom'
import { ClientCard, getClientDetailsError, getClientDetailsIsLoading } from 'entities/Clients'
import { memo, useCallback, useState } from 'react'
import { Box } from 'shared/ui/Box'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import ADD_ORDER from 'shared/assets/img/add_order.svg'
import DEL_CLIENT from 'shared/assets/img/delete.svg'
import BACK_ICON from 'shared/assets/img/undo.svg'
import { PreviewWindow } from 'shared/ui/PreviewWindow'
import { Modal } from 'shared/ui/Modal'
import { Text, TextAlign } from 'shared/ui/Text'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { deleteClient } from 'entities/Clients/model/services/deleteClient/deleteClient'
import { useSelector } from 'react-redux'
import { AddOrderButton } from 'widgets/AddOrderButton'

interface ClientDetailPageProps {
  className?: string;
}
const ClientDetailPage = memo(({className} : ClientDetailPageProps) => {
    const {t} = useTranslation()
    let id: string | undefined
    const params = useParams()
    const dispatch = useAppDispatch()

    if (__PROJECT__ !== 'storybook') {
        id = params.id
    } else {
        id = '643c5fe7013e22868a6eb63c'
    }
    
    const history = useNavigate()
    const [openPreview, setOpenPreview] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const error = useSelector(getClientDetailsError)
    const isLoading = useSelector(getClientDetailsIsLoading)

    const backHandel = () => history(-1)
    const togglePreview= () => setOpenPreview(!openPreview)
    const toggleModal= () => setOpenModal(!openModal)
    const handleDeleteClient = useCallback(() => {
        if (id) {
            dispatch(deleteClient(id)).then(() => {
                history('/clients/')
            })
            
        }
    }, [dispatch, history, id])
    
    if (id) {
        return ( 
            <div className={cls.page_wrapper}>
                <h1 className={cls.title}>{t('Информация о клиенте')}</h1>
                <div className={classNames(cls.ClientDetailPage, {}, [className])}>
                    <div className={cls.small_column} >
                        {!isLoading && <Box className={cls.button_wrapper}>
                            <AppButton theme={ButtonTheme.SOLID} onClick={backHandel}><BACK_ICON className={cls.icon}/> {t('Назад')}</AppButton>
                            <AddOrderButton withClient={false }/>
                            {!error && <AppButton theme={ButtonTheme.OUTLINED_GRAY} onClick={togglePreview}><ADD_ORDER className={cls.icon}/> {t('Добавить заказ')}</AppButton>}
                            {!error && <AppButton theme={ButtonTheme.OUTLINED_GRAY} onClick={toggleModal}><DEL_CLIENT className={cls.icon}/> {t('Удалить клиента')}</AppButton>}
                        </Box>}
                        <ClientCard id={id} />
                    </div>
                    <div className={cls.big_column}></div>
                    <PreviewWindow isOpen={openPreview} onClose={togglePreview}>
                        <p>{t('Место для формы добавления заказа')}</p>
                    </PreviewWindow>
                    <Modal onClose={toggleModal} isOpen={openModal}>
                        <Text align={TextAlign.CENTER} title={t('Внимание! Это действие нельзя будет отменить! Вы точно хотите удалить этого клиента?')} />
                        <div className={cls.modal_btns_wrapper}>
                            <AppButton theme={ButtonTheme.OUTLINED} onClick={handleDeleteClient}>{t('Удалить')}</AppButton>
                            <AppButton theme={ButtonTheme.SOLID} onClick={toggleModal}>{t('Отмена')}</AppButton>
                        </div>
                    </Modal>
                </div>
            </div>
        
        )
    }

    return  <div>{t('Something went wrong')}</div>
})

export default ClientDetailPage