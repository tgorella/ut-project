import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import cls from './Clients.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { clientsReducer } from '../../model/slice/ClientsSlice'

interface ClientsProps {
  className?: string;
}

const reducers: ReducersList = {
    clients: clientsReducer
}
export const Clients = ({className} : ClientsProps) => {

    return ( 
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.Clients, {}, [className])}>
      
            </div>
        </DynamicModuleLoader>
    
    )
}