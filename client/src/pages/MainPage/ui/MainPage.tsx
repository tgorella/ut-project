import { addPaymentMethod,  fetchPaymentMethods, PaymentMethodForm, PaymentMethodList, paymentMethodReducer, PaymentMethodSelector } from '@/entities/PaymentMethod'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const reducers: ReducersList = {
    paymentMethods: paymentMethodReducer
}

const initialState = {
    name: '',
    icon_url: '',
}

const MainPage = memo(() => {
    const {t} = useTranslation('main')
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

    useEffect(() => {
        dispatch(fetchPaymentMethods())
    }, [dispatch])
   
    return (<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
        <div>
            <h1>{t('Главная страница')}</h1>
            <PaymentMethodList />
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
 
export default MainPage