import { useTranslation } from 'react-i18next'
import cls from './ClientDetailPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { useParams } from 'react-router-dom'
import { clientDetailsReducer } from 'entities/Clients/model/slice/clientDetailsSlice'
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ClientCard } from 'entities/Clients'

const reducers = {
    clientDetails: clientDetailsReducer
}
interface ClientDetailPageProps {
  className?: string;
}
const ClientDetailPage = ({className} : ClientDetailPageProps) => {
    const {t} = useTranslation()
    
    const {id} = useParams()
    
    if (id) {
        return ( 
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount >
                <div className={cls.page_wrapper}>
                    <h1 className={cls.title}>{t('Информация о клиенте')}</h1>
                    <div className={classNames(cls.ClientDetailPage, {}, [className])}>
                        <div className={cls.small_column} >
                            <ClientCard id={id} />
                        </div>
                        <div className={cls.big_column}></div>
                    </div>
                </div>
            </DynamicModuleLoader>
        
        )
    }

    return  <div>{t('Something went wrong')}</div>
}

export default ClientDetailPage