import { addPaymentMethod, fetchPaymentMethods, PaymentMethodList, PaymentMethodForm, paymentMethodReducer } from '@/entities/PaymentMethod'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {memo, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import cls from './PaymentMethodEdit.module.scss'

const reducers: ReducersList = {
    paymentMethods: paymentMethodReducer
}

const initialState = {
    name: '',
    icon_url: '',
}

const PaymentMethodEdit = memo(() => {

    const {t} = useTranslation('main')
    const dispatch = useAppDispatch()
    const [newMethod, setNewMethod] = useState(initialState)

    const handleChangeName = (val: string) => {
        setNewMethod(prev => ({...prev, name: val}))
    }

    const handleChangeLink = (val: string) => {
        setNewMethod(prev => ({...prev, icon_url: val}))
    }

    const handleSave = () => {
        dispatch(addPaymentMethod({name: newMethod.name, icon_url: newMethod.icon_url})).then(() => {
            setNewMethod(initialState)
        })
    }


    useEffect(() => {
        dispatch(fetchPaymentMethods())
    }, [dispatch])
   
    return (<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
        <div className={cls.page_wrapper}>
            <h1>{t('Методы платежей')}</h1>
            <PaymentMethodList />
            <PaymentMethodForm
                data={newMethod}
                errors={{}}
                onChangeLogoLink={handleChangeLink}
                onChangeName={handleChangeName}
                onSave={handleSave} />
        </div>
       
    </DynamicModuleLoader>  )
})
export default PaymentMethodEdit