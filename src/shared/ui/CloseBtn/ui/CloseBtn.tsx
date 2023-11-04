import { memo } from 'react'
import cls from './CloseBtn.module.scss'

interface CloseBtnProps {
  className?: string;
  onClose: () =>void
}
export const CloseBtn = memo(({onClose} : CloseBtnProps) => {

    return ( 
        // eslint-disable-next-line i18next/no-literal-string
        <div className={cls.CloseBtn} onClick={onClose}>
            ✕
        </div>
    )
})