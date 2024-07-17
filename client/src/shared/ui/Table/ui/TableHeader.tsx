import { memo } from 'react'
import { Column } from '../model/types/tableSchema'
import cls from './Table.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'

interface TableHeaderProps {
  className?: string;
  columns:Column[]
}
export const TableHeader = memo(({className, columns} : TableHeaderProps) => {

    return ( 
        <thead className={classNames(cls.header, {}, [className])}>
            <tr>
                {columns.map((column) => {
                    return (
                        <th key={column.path}>{column.name}</th>
                    )
                })}
            </tr>
        </thead>
    )
})