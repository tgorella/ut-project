import { Country, CountrySelect } from 'entities/Country'
import { Currency, CurrencySelect } from 'entities/Currency'
import { Input } from 'shared/ui/Input/Input'
import { Option, Select } from 'shared/ui/Select'

export enum FromComponent {
  INPUT = 'input',
  SELECT = 'select',
  BUTTON = 'button',
  COUNTRY = 'country',
  CURRENCY = 'currency'
  }

export interface FormItem {
    label?: string,
    valuePath?: string,
    selectOptions?: Option[],
    type?: string,
    rounded?: boolean,
    onChange: (val: string | Country | Currency) => void, 
    name: string,
    component: FromComponent,
    otherProps?: Record<string, string | boolean>
  }

export default function formGenerator (
    schema: Array<FormItem>, 
    data: Record<string, string>, 
    errors: Record<string, string>
): JSX.Element {
    function setElement (item: FormItem) {
        let component = null
        switch (item.component) {
        case FromComponent.INPUT:
            component = <Input 
                label={item.label} 
                onChange={item.onChange} 
                rounded={item.rounded}
                type={item.type}
                value={data[item.valuePath as keyof typeof data]}
                name={item.name}
                key= {item.name}
                {...item?.otherProps}
                error={errors[item.name as keyof typeof errors]}
            />
            break
        case FromComponent.SELECT:
            component = <Select 
                label={item.label} 
                onChange={item.onChange} 
                value={data[item.valuePath as keyof typeof data]}
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
        }
        return component 
    }
    return <>{schema.map((el) => setElement(el))}</>
}