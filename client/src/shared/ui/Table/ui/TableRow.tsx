import { memo } from 'react'
import { Column } from '../model/types/tableSchema'
import cls from './Table.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'

interface TableRowProps {
  className?: string;
  columns:Column[]
  data: Record<string, boolean | string | undefined>;
  index: string | number;
}
export const TableRow = memo(({className, columns, data, index} : TableRowProps) => {

    return ( 
        <tr className={classNames(cls.row, {}, [className])}>
            {columns.map((column) => {
                return (
                    <td key={column.path+index}>
                        <>
                            {!column.element && data[column.path]}
                            {column.element && column.element}
                        </>

                    </td>
                )
            })}
        </tr>
    )
})