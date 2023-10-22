import { Column } from '../model/types/tableSchema'
import cls from './Table.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { memo } from 'react'

interface TableProps {
  className?: string;
  columns:Column[]
  data: Array<Record<string, boolean | string | undefined>>
}
export const Table = memo(({className, columns, data} : TableProps) => {
    return ( 
        <table className={classNames(cls.Table, {}, [className])}>
            <TableHeader columns={columns} />
            <TableBody columns={columns} data={data} />
        </table>
    )
})