import formGenerator, { FormItem, FromComponent } from '@/shared/lib/formGenerator/formGenerator'
import { useTranslation } from 'react-i18next'
import { Payment } from '../../model/types/Payment'
import { AppButton, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { VStack } from '@/shared/ui/Stack'
import cls from './PaymentForm.module.scss'

interface PaymentFormProps {
data: Partial<Payment>,
errors: Record<string, string>,
onChangeDate: (val: string) => void,
onChangeNumber: (val: string) => void,
onChangeMethod: (val: string) => void,
onChangeOrder: (val: string) => void,
onChangeAmount: (val: string) => void,
onChangeNotes: (val: string) => void,
onSavePayment: () => void
}
                                        
export const PaymentForm = ({
    errors,
    data,
    onChangeAmount,
    onChangeDate,
    onChangeMethod,
    onChangeNotes,
    onChangeNumber,
    onChangeOrder,
    onSavePayment
} : PaymentFormProps) => {
    const {t} = useTranslation('payment')  
    const formSchema: Array<FormItem> = [{
        label: t('Номер платежа в системе'),
        valuePath: 'number',
        name: 'number',
        onChange: onChangeNumber,
        component: FromComponent.INPUT,
        otherProps: {
            error: errors?.number,
            type: 'text'
        }
    }, 
    {
        label: t('Дата платежа'),
        valuePath: 'date',
        name: 'date',
        onChange: onChangeDate,
        component: FromComponent.INPUT,
        otherProps: {
            error: errors?.date,
            type: 'date'
        }
    },
    {
        label: t('Метод оплаты'),
        valuePath: 'method',
        name: 'method',
        onChange: onChangeMethod,
        component: FromComponent.PAYMENT_METHOD,
    },
    {
        label: t('Номер заказа'),
        valuePath: 'order',
        name: 'order',
        onChange: onChangeOrder,
        component: FromComponent.INPUT,
        otherProps: {
            type: 'text',
            error: errors?.order
        }
    },
    {
        label: t('Сумма'),
        valuePath: 'amount',
        name: 'amount',
        onChange: onChangeAmount,
        component: FromComponent.INPUT,
        otherProps: {
            type: 'text',
            error: errors?.amount
        }
    },
    {
        label: t('Примечания'),
        valuePath: 'notes',
        name: 'notes',
        onChange: onChangeNotes,
        component: FromComponent.INPUT,
        otherProps: {
            type: 'text',
            error: errors?.notes
        }
    }
    ]


    return ( 
        <VStack max>
            <form className={cls.form}>
                {formGenerator(formSchema, data, errors)}
                <AppButton 
                    theme={ButtonTheme.OUTLINED} 
                    onClick={onSavePayment} 
                    disabled={Object.values(errors).filter((item) => item !== '').length > 0 ? true : false}
                >
                    {t('Сохранить')}
                </AppButton>
            </form>
        </VStack>
    )
}