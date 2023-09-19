import classNames from 'shared/lib/classNames/ClassNames'
import cls from './Modal.module.scss'
import { useCallback, useEffect, useRef } from 'react'
import { Portal } from 'shared/ui/Portal/Portal'
import { useTheme } from 'app/providers/ThemeProvider'

interface ModalProps {
  className?: string;
  children?: React.ReactNode;
  isOpen: boolean;
  autoOpen?: boolean;
  delay?: number;
  onClose: () => void
  onOpen: () => void
}
export const Modal = ({className, children, isOpen,autoOpen, delay, onClose, onOpen } : ModalProps) => {

    const Mods = {
        [cls.closed]: !isOpen
    }

    const OPEN_DELAY = useRef(delay)
    const { theme } = useTheme()

    const handleClose = useCallback(() => {
        if (onClose) {
            onClose()
        }
    },[onClose])


    const handleOpen = useCallback(() => {
        if (onOpen) {
            onOpen()
        }
    }, [onOpen])


    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const timerRef = useRef<ReturnType<typeof setTimeout>>()
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }, [onClose])


    
    useEffect(() => {
        if (autoOpen && delay) {
            timerRef.current = setTimeout(() => {handleOpen()}, OPEN_DELAY.current)
        }

        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [autoOpen, delay, handleOpen, onKeyDown])
       
    

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', onKeyDown)
        }

    }, [isOpen, onKeyDown])

    return ( 
        <Portal>
            <div className={classNames(cls.Modal,Mods, [className, theme])}>
                <div className={cls.overlay} onClick={handleClose}>
                    <div className={cls.content} onClick={onContentClick}>
                        { /* eslint-disable-next-line i18next/no-literal-string */}
                        <div className={cls['close-btn']} onClick={handleClose}>✕</div>
                        {children ? children : 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro, dolor debitis! Dolor ut consectetur optio, nisi repellat sint quasi inventore amet dignissimos quidem voluptate, quisquam voluptatum rem, officiis et animi!'}
                    </div>
                </div>
            </div>
        </Portal>
       
    )
}