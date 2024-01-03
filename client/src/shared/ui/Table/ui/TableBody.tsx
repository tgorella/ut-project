import { Column } from '../model/types/tableSchema'
import cls from './Table.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { TableRow } from './TableRow'
import { memo } from 'react'

interface TableBodyProps {
  className?: string;
  columns:Column[]
  data: Array<Record<string, boolean | string | undefined>>
}
export const TableBody = memo(({className, columns, data} : TableBodyProps) => {

    return ( 
        <tbody className={classNames(cls.body, {}, [className])}>
            {data.map((item, index) => {
                return (
                    <TableRow index={index}  data={item} columns={columns} key={index} />
                )
            })}
        </tbody>
    )
})