import cls from './ALertInformer.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { useSelector } from 'react-redux'
import { getAlerts } from '../model/selectors/getAlerts/getAlerts'
import { Alert} from '@/shared/ui/Alert'

interface ALertInformerProps {
  className?: string;
}
export const ALertInformer = memo(({className} : ALertInformerProps) => {
    const messages = useSelector(getAlerts)
    
    return ( 
        <div className={classNames(cls.ALertInformer, {}, [className])}>
            {messages.map((message) => <Alert theme={message.type} key={message.id} text={message.message}/>)}
        </div>
    )
})