import cls from './EditSwitcher.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import EditIcon from '@/shared/assets/img/pencil.svg'
import CloseIcon from '@/shared/assets/img/close.svg'
import { memo } from 'react'

interface EditSwitcherProps {
  className?: string;
  editMode: boolean;
  onEdit: () => void;
  onCancelEdit: () => void
}
export const EditSwitcher = memo(({className, editMode, onEdit, onCancelEdit} : EditSwitcherProps) => {
  
    return ( 
        <div className={classNames(cls.EditSwitcher, {}, [className])} >
            {editMode 
                ? <CloseIcon className={cls.icon} onClick={onCancelEdit} />
                : <EditIcon className={cls.icon} onClick={onEdit} />
            }
        </div>
    )
})