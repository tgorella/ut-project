/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from 'react-i18next'
import cls from './ClientCard.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { Avatar, AvatarSize } from 'shared/ui/Avatar/Avatar'
import { Box } from 'shared/ui/Box'
import { EditSwitcher } from 'widgets/EditeSwitcher'
import { memo, useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getClientById } from '../../model/services/getClientById/getClientById'
import { useSelector } from 'react-redux'
import { getClientDetailsIsLoading } from '../../model/selectors/getClientDetailsIsLoading/getClientDetailsIsLoading'
import { getClientDetailsError } from '../../model/selectors/getClientDetailsError/getClientDetailsError'
import { PageLoader } from 'widgets/PageLoader'
import { NoteBlock } from 'widgets/NoteBlock'
import { getClientDetailsForm } from '../../model/selectors/getClientDetailsForm/getClientDetailsForm'
import { updateClientData } from '../../model/services/updateClientData/updateClientData'
import { clientDetailsAction, clientDetailsReducer } from '../../model/slice/clientDetailsSlice'
import { Text } from 'shared/ui/Text'
import { TextAlign } from 'shared/ui/Text/ui/Text'
import { getUserAuthData } from 'entities/User'
import { Alert, AlertTheme } from 'shared/ui/Alert'
import FAV_ICON from 'shared/assets/img/fav.svg'
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ClientForm } from '../ClientForm/ClientForm'
import { ClientInfo } from '../ClientInfo/ClientInfo'

interface ClientCardProps {
  className?: string;
  id: string,
  withNotes?: boolean
  onlyRead?: boolean
}

const reducers = {
    clientDetails: clientDetailsReducer
}

export const ClientCard = memo((props : ClientCardProps) => {
    const {className, id, withNotes = true, onlyRead = false} = props
    const {t} = useTranslation('clients')
    const dispatch = useAppDispatch()
    const authData = useSelector(getUserAuthData)
    const isLoading = useSelector(getClientDetailsIsLoading)
    const data = useSelector(getClientDetailsForm)
    const error = useSelector(getClientDetailsError)
    const [edit, setEdit] = useState(false)
    const [noteEditMode, setNoteEditMode] = useState(false)
    let success = AlertTheme.SUCCESS
    const [saved, setSaved] = useState(false)
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
    
    useEffect(() => {
        if (authData) {
            if (__PROJECT__ !== 'storybook') {
                dispatch(getClientById({clientId: id, currentUserId: authData?._id}))
            }
        }
        
    }, [authData, dispatch, id])


    const toggleEditMode = useCallback(() => setEdit(!edit), [edit])

    const toggleNoteEditMode = useCallback(() => setNoteEditMode(!noteEditMode), [noteEditMode])

    const handleChangeClientName = useCallback((value: string) => {
        dispatch(clientDetailsAction.updateClient({name: value || ''}))
    }, [dispatch])

    const handleChangeClientAvatar = useCallback((value: string) => {
        dispatch(clientDetailsAction.updateClient({avatarUrls: value || ''}))
    }, [dispatch])

    const handleChangeClientAddress = useCallback((value: string) => {
        dispatch(clientDetailsAction.updateClient({address: value || ''}))
    }, [dispatch])

    const handleChangeClientEmail = useCallback((value: string) => {
        dispatch(clientDetailsAction.updateClient({email: value || ''}))
    }, [dispatch])

    const handleChangeClientProfession = useCallback((value: string) => {
        dispatch(clientDetailsAction.updateClient({profession: value || ''}))
    }, [dispatch])

    const handleChangeClientTelegram = useCallback((value: string) => {
        dispatch(clientDetailsAction.updateClient({telegram: value || ''}))
    }, [dispatch])

    const handleChangeClientInstagram = useCallback((value: string) => {
        dispatch(clientDetailsAction.updateClient({instagram: value || ''}))
    }, [dispatch])

    const handleChangeClientPhone = useCallback((value: string) => {
        dispatch(clientDetailsAction.updateClient({phone: value || ''}))
    }, [dispatch])

    const handleChangeClientNotes = useCallback((value: string) => {
        dispatch(clientDetailsAction.updateClient({notes: value || ''}))
    }, [dispatch])

    const handleChangeFavStatus = useCallback(() => {
        dispatch(clientDetailsAction.updateClient({isFav: !data?.isFav}))
        dispatch(updateClientData())
    }, [data?.isFav, dispatch])

    const saveUser = useCallback(async () => {
        try {
            await dispatch(updateClientData()).then(() => {
                success = AlertTheme.SUCCESS
                setSaved(true)
                setTimeout(() => {
                    setSaved(false)
                }, 2000)
            }).then(() => {
                toggleEditMode()
            })
        } catch (error) {
            success = AlertTheme.ERROR
            setSaved(true)
            setTimeout(() => {
                setSaved(false)
            }, 2000)
        }
        
    }, [dispatch, id, toggleEditMode])

    const saveNotes = useCallback((): void => {
        dispatch(updateClientData())
        toggleNoteEditMode()
    }, [dispatch, id, toggleNoteEditMode])

    const handleCancelEdit = useCallback(() => {
        dispatch(clientDetailsAction.cancelEdit())
        toggleEditMode()
    }, [dispatch, toggleEditMode])

    const handleNotesCancelEdit = useCallback(() => {
        dispatch(clientDetailsAction.cancelEdit())
        toggleNoteEditMode()
    }, [dispatch, toggleNoteEditMode])


    let content 

    if (isLoading) {
        content = <PageLoader />
    }

    else if (!data || error) {
        content = <Box className={cls.box}>
            <Avatar className={cls.avatar} size={AvatarSize.XL} alt={t('Клиент не найден')}/>
            <div className={cls.info_container}>
                <div className={cls.item}>
                    <p className={cls.name}>
                        {t('Клиент не найден')}
                    </p>
                </div>
                <div className={cls.item}>
                    <Text align={TextAlign.CENTER} text={t('Возможно, клиент был удален')} />
                </div>
            </div>
        </Box>
    }
    else {
        content = <div className={classNames(cls.ClientCard, {}, [className])}>
            <Box className={cls.box}>
                {!onlyRead &&
                <>
                    <div className={cls.fav_icon} onClick={handleChangeFavStatus} title={'Добавить в избранное'}>
                        <FAV_ICON className={data?.isFav ? cls.active : cls.fade}/>
                    </div>
   
                    <div className={cls.edit_icon}>
                        <EditSwitcher editMode={edit} onCancelEdit={handleCancelEdit} onEdit={toggleEditMode} />
                    </div>
                </>
                }
                {saved && <div className={cls.status}>
                    <Alert theme={success} text={success === AlertTheme.SUCCESS ? (t('Сохранено')) : (t('Ошибка сохранения'))}/>
                </div>}
    
                {!edit && <ClientInfo data={data} />}
                {edit && <ClientForm 
                    data={data}
                    errors={errors}
                    onChangeAvatar={handleChangeClientAvatar}
                    onChangeClientAddress={handleChangeClientAddress}
                    onChangeClientEmail={handleChangeClientEmail}
                    onChangeClientInstagram={handleChangeClientInstagram}
                    onChangeClientName={handleChangeClientName}
                    onChangeClientPhone={handleChangeClientPhone}
                    onChangeClientProfession={handleChangeClientProfession}
                    onChangeClientTelegram={handleChangeClientTelegram}
                    onSaveUser={saveUser}
                />}
            </Box>
            { withNotes && <NoteBlock 
                onlyRead={onlyRead}
                value={data?.notes || ''} 
                onCancelEdit={handleNotesCancelEdit} 
                onChange={handleChangeClientNotes} 
                onSave={saveNotes}/>}
        </div>
    }
    

    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true} >
            {content}
        </DynamicModuleLoader>
        
    )
})