import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {memo, useEffect, useState} from 'react'
import { paymentMethodReducer } from '../../slice/PaymentMethodsSlice'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getPaymentMethodsData } from '../../model/selectors/getPaymentMethodsData/getPaymentMethodsData'
import { addPaymentMethod } from '../../model/services/addPaymentMethod/addPaymentMethod'
import { deletePaymentMethod } from '../../model/services/deletePaymentMethod/deletePaymentMethod'
import { fetchPaymentMethods } from '../../model/services/fetchPaymentMethods/fetchPaymentMethods'
import { PaymentMethodForm } from '../PaymentMethodForm/PaymentMethodForm'
import { PaymentMethodSelector } from '../PaymentMethodSelector/PaymentMethodSelector'

const reducers: ReducersList = {
    paymentMethods: paymentMethodReducer
}

const initialState = {
    name: '',
    icon_url: '',
}


export const PaymentMethod = memo(() => {

    const {t} = useTranslation('main')
    const methods = useSelector(getPaymentMethodsData || [])
    const dispatch = useAppDispatch()
    const [newMethod, setNewMethod] = useState(initialState)
    const [selectedMethod, setSelectedMethod] = useState('')

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
    const handleChangeSelectedMethod = (val: string) => {
        setSelectedMethod(val)
    }

    const handleDeleteMethod = (id: string) => {
        dispatch(deletePaymentMethod(id))
    }
    useEffect(() => {
        dispatch(fetchPaymentMethods())
    }, [dispatch])
 
    return (<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
        <div>
            <h1>
                {t('Главная страница')}
            </h1>
            <div>
                {methods?.map(method => <div key={method._id}> {method.icon_url && <img src={method.icon_url} alt={method.name}/>} {method.name} <button onClick={() => handleDeleteMethod(method._id)}>{t('Удалить')}</button></div>)}
            </div>
            <PaymentMethodSelector  value={selectedMethod} onChange={handleChangeSelectedMethod}/>
            <PaymentMethodForm
                data={newMethod}
                errors={{}}
                onChangeLogoLink={handleChangeLink}
                onChangeName={handleChangeName}
                onSave={handleSave} />
        </div>
     
    </DynamicModuleLoader>  )
})