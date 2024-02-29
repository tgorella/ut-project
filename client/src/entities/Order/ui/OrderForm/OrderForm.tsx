import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { Input } from 'shared/ui/Input/Input'
import cls from './OrderForm.module.scss'
import { Order, OrderExtended} from 'entities/Order'
import { useTranslation } from 'react-i18next'
import { ProjectSelect } from 'entities/Project/ui/ProjectSelect/ProjectSelect'

interface OrderFormProps {
  data: OrderExtended,
  errors: Partial<Order>,
  withButton?: boolean,
  onChangeTitle: (value: string) => void,
  onChangeEventDate: (value: string) => void,
  onChangePlace: (value: string) => void,
  onChangeStartTime: (value: string) => void,
  onChangeEndTime: (value: string) => void,
  onChangeProjectType: (value: string) => void,
  onChangeTotal: (value: string) => void,
  OnSaveOrder: () => void

}
export const OrderForm = ({
    data, 
    errors, 
    withButton = true,
    onChangeEndTime, 
    onChangeEventDate, 
    onChangePlace, 
    onChangeProjectType,
    onChangeTitle,
    onChangeStartTime,
    onChangeTotal,
    OnSaveOrder

} : OrderFormProps) => {
    const {t} = useTranslation('orders')
    
    return ( 
        <div className={cls.info_container}>
            <Input 
                label={t('Заголовок')} 
                value={data.title}  
                onChange={onChangeTitle} 
                name='title'
                error={errors?.title}
            />
            {data.projectType &&
            <ProjectSelect 
                value={data.projectType._id} 
                onChange={onChangeProjectType} 
            />
            }
            <Input 
                label={t('Дата')} 
                value={data?.eventDate}  
                onChange={onChangeEventDate} 
                name='eventDate' 
                error={errors.eventDate}
                type='date'
            />
            <Input 
                label={t('Время начала')} 
                value={data?.startTime}  
                onChange={onChangeStartTime} 
                name='startTime' 
                error={errors.startTime}
                type='time'
            />
            <Input 
                label={t('Время окончания')} 
                value={data?.endTime}  
                onChange={onChangeEndTime} 
                name='endTime' 
                error={errors.endTime}
                type='time'
            />
            <Input 
                label={t('Адресс')} 
                value={data?.place}  
                onChange={onChangePlace} 
                name='place' 
                error={errors.place}
            />
            <Input 
                label={t('Стоимость')} 
                value={data?.total}  
                onChange={onChangeTotal} 
                name='telegram' 
                error={errors.total}
                type='number'
            />
            {withButton && <AppButton 
                theme={ButtonTheme.OUTLINED} 
                onClick={OnSaveOrder} 
                disabled={Object.values(errors).filter((item) => item !== '').length > 0 ? true : false}
            >
                {t('Сохранить')}
            </AppButton>}
        </div>
    )
}