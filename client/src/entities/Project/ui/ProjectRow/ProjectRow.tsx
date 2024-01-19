import cls from './ProjectRow.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { Order } from 'entities/Order'
import { Client } from 'entities/Clients'
import { OrderStatusDetails } from 'entities/OrderStatus'
import { ProjectStepSelect } from '../ProjectStepSelect/ProjectStepSelect'
import { Link } from 'react-router-dom'


interface ProjectRowProps {
  className?: string;
  order: Order,
  status: OrderStatusDetails,
  client: Client
  onChange: (value: string) => void
}
export const ProjectRow = memo(({className, order, status, client, onChange} : ProjectRowProps) => {

    return ( 
        <div className={classNames(cls.ProjectRow, {}, [className])}>
            <div className={cls.project_info}>
                <div className={cls.project_title}><Link to={`/order/${order._id}`}>{order.title}</Link></div>
                <div className={cls.status_wrapper}>
                    <div className={cls.color_bullet} style={{backgroundColor: status.color}}></div>
                    <div className={cls.status}>{status.name}</div>
                </div>
                <div>{client.name}</div>
            </div>
            {order.steps?.map((step, index) => {
                return <ProjectStepSelect key={index} stepValue={step} onChange={onChange} />
            })}
      
        </div>
    )
})