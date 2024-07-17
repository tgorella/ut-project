import { Country, CountrySelect } from '@/entities/Country'
import { Currency, CurrencySelect } from '@/entities/Currency'
import { Input } from '@/shared/ui/Input/Input'
import { Option, Select } from '@/shared/ui/Select'
import { Textarea } from '@/shared/ui/Textarea'

export enum FromComponent {
  INPUT = 'input',
  SELECT = 'select',
  TEXTAREA = 'textarea',	
  BUTTON = 'button',
  COUNTRY = 'country',
  CURRENCY = 'currency',
  CHECKBOX = 'checkbox'
  }

export interface FormItem {
    label?: string,
    valuePath?: string,
    selectOptions?: Option[],
    onChange: (val: string | Country | Currency ) => void, 
    name: string,
    component: FromComponent,
    otherProps?: Record<string, string | boolean | undefined>
  }

export default function formGenerator (
    schema: Array<FormItem>, 
    data: Record<string, string | number | string[]>, 
    errors: Record<string, string>
): JSX.Element {
    function setElement (item: FormItem) {
        let component = null
        switch (item.component) {
        case FromComponent.INPUT:
            component = <Input 
                label={item.label} 
                onChange={item.onChange} 
                value={data[item.valuePath as keyof typeof data] as string}
                name={item.name}
                key= {item.name}
                {...item?.otherProps}
                error={errors[item.name as keyof typeof errors]}
            />
            break
        case FromComponent.CHECKBOX:
            component = <Input 
                label={item.label} 
                onChange={item.onChange} 
                value={data[item.valuePath as keyof typeof data] as string}
                name={item.name}
                key= {item.name}
                type='checkbox'
                checked={data[item.valuePath as keyof typeof data] ? true : false}
                {...item?.otherProps}
                error={errors[item.name as keyof typeof errors]}
            />
            break
        case FromComponent.SELECT:
            component = <Select 
                label={item.label} 
                onChange={item.onChange} 
                value={data[item.valuePath as keyof typeof data] as string}
                options={item.selectOptions || []}
                key= {item.name}
                {...item?.otherProps}
            />
            break
        case FromComponent.COUNTRY:
            component = <CountrySelect 
                value={data[item.valuePath as keyof typeof data] as Country} 
                onChange={item.onChange}
                key= {item.name} 
            />
            break
        case FromComponent.CURRENCY:
            component = <CurrencySelect 
                value={data[item.valuePath as keyof typeof data] as Currency} 
                onChange={item.onChange}
                key= {item.name} 
            />
            break
        case FromComponent.TEXTAREA:
            component = <Textarea 
                value={data[item.valuePath as keyof typeof data] as Currency} 
                onChange={item.onChange}
                key= {item.name}
                name={item.name}
                label={item.label}
                {...item?.otherProps}
            />
        }
        return component 
    }
    return <>{schema.map((el) => setElement(el))}</>
}