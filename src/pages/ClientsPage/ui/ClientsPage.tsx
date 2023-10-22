import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const ClientsPage: FC = () => {
    const {t} = useTranslation('clients')

    return (
        <h1>
            {t('Клиенты')}
        </h1>
    )
}
 
export default ClientsPage