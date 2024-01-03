import {memo} from 'react'
import { useSelector } from 'react-redux'
import { getOrderStatusesData } from '../../model/selectors/getOrderStatusesData/getOrderStatusesData'
import { Option } from 'shared/ui/Select/model/types/option'
import { Select } from 'shared/ui/Select'
import { useTranslation } from 'react-i18next'

interface OrderStatusSelectProps {
  value: string,
  onChange?: (value: string) => void
}
export const OrderStatusSelect = memo(({onChange, value} : OrderStatusSelectProps) => {
    const statuses = useSelector(getOrderStatusesData)
    const {t} = useTranslation()
    const options: Option[] = statuses!.map((status) => { 
        return {name: status.name, value: status.id}
    })

    if (!statuses) {
        return <>{t('Loading...')}</>
    }

    return <Select options={options} onChange={onChange} value={value} />
})