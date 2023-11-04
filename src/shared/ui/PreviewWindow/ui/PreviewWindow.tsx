/* eslint-disable i18next/no-literal-string */
import { memo, useCallback, useEffect, useState } from 'react'
import cls from './PreviewWindow.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { CloseBtn } from 'shared/ui/CloseBtn'

interface PreviewWindowProps {
  className?: string;
  children?: React.ReactNode;
  isOpen: boolean,

}
export const PreviewWindow = memo(({className, children, isOpen} : PreviewWindowProps) => {
    const [visible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(isOpen)
    }, [isOpen])

    const handleClose = useCallback(
        () => {
            setIsVisible(false)
        }, [setIsVisible]
    )
    return (
        <div className={classNames(cls.PreviewWindow, {[cls.show]: visible}, [className])}>
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