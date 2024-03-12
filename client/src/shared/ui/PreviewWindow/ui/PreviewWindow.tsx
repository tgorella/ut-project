/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react'
import cls from './PreviewWindow.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { CloseBtn } from '../../CloseBtn'

interface PreviewWindowProps {
  className?: string;
  children?: React.ReactNode;
  isOpen: boolean,
  onClose: () => void

}
export const PreviewWindow = memo(({className, children, isOpen, onClose} : PreviewWindowProps) => {

    const handleClose = useCallback(
        () => {
            onClose()
        }, [onClose]
    )
    return (
        <div className={classNames(cls.PreviewWindow, {[cls.show]: isOpen}, [className])}>
            <div className={cls.overlay} onClick={handleClose}></div>
            <div className={cls.window_container}>
                <CloseBtn  onClose={handleClose}/>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
})