import cls from './ProjectRow.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useState} from 'react'
import {OrderExtended, updateOrderSteps } from 'entities/Order'
import { OrderStatusDetails } from 'entities/OrderStatus'
import { ProjectStepSelect } from '../ProjectStepSelect/ProjectStepSelect'
import { Link } from 'react-router-dom'
import { Client } from 'entities/Clients'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'


interface ProjectRowProps {
  className?: string;
  order: OrderExtended,
  client?: Client,
  status?: OrderStatusDetails,
  totalSteps: number
}
export const ProjectRow = memo(({className, order, client, status, totalSteps} : ProjectRowProps) => {
    const [steps, setSteps] = useState(order.steps || [])
    const dispatch = useAppDispatch()

    if (steps.length < totalSteps) {
        const newArr = new Array(totalSteps-steps.length).fill('')
        const totalArr = [...steps, ...newArr]
        setSteps(totalArr)
        dispatch(updateOrderSteps({_id: order._id, steps: totalArr}))
    }

    if (steps.length > totalSteps) {
        const newArr = [...steps]
        newArr.pop()
        setSteps(newArr)
        dispatch(updateOrderSteps({_id: order._id, steps: newArr}))
    }

    const handleChange = (index: number, value: string) => {
        const newArr = [...steps]
        newArr[index] = value
        setSteps(newArr)
        dispatch(updateOrderSteps({_id: order._id, steps: newArr}))
    }

    return ( 
        <div className={classNames(cls.ProjectRow, {}, [className])}>
            <div className={cls.project_info}>
                <div className={cls.project_title}><Link to={`/orders/${order._id}`}>{order.title}</Link></div>
                {status &&
                <div className={cls.status_wrapper}>
                    <div className={cls.color_bullet} style={{backgroundColor: status?.color}}></div>
                    <div className={cls.status}>{status.name}</div>
                </div>
                }
                {client && <div>{client.name}</div>}
                
            </div>
            <div className={cls.step_wrapper} style={{gridTemplateColumns: `repeat(${steps.length}, minmax(110px, ${window.innerWidth/totalSteps}px)`}}>
                {steps?.map((step, index) => {
                    return <ProjectStepSelect key={index} stepValue={step} onChange={handleChange} index={index}/>
                })}
      
            </div>
           
        </div>
    )
})