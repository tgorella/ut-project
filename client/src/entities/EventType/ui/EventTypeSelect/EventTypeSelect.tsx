import {memo} from 'react'
import { EventType } from 'entities/EventType/model/types/EventType'
import { useTranslation } from 'react-i18next'
import { Select } from 'shared/ui/Select'
import { Option } from 'shared/ui/Select/model/types/option'


interface EventTypeSelectProps {
  eventTypes: EventType[],
  value: string,
  onChange: (value: string) => void
}
export const EventTypeSelect = memo(({eventTypes, value, onChange} : EventTypeSelectProps) => {
    const {t} = useTranslation()
    const options: Option[] = eventTypes.map((type) => {
        return {name: type.name, value: type._id}
    })
    options.unshift({name: 'Выберите категорию..', value: ''})
    if (!eventTypes) {
        return <>{t('Loading...')}</>
    }
    return <Select options={options} value={value} onChange={onChange} />
})