import cls from './EditSwitcher.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import EditIcon from 'shared/assets/img/pencil.svg'
import CloseIcon from 'shared/assets/img/close.svg'

interface EditSwitcherProps {
  className?: string;
  editMode: boolean;
  onEdit: () => void;
  onChancelEdit: () => void
}
export const EditSwitcher = ({className, editMode, onEdit, onChancelEdit} : EditSwitcherProps) => {
  
    return ( 
        <div className={classNames(cls.EditSwitcher, {}, [className])} >
            {editMode 
                ? <CloseIcon className={cls.icon} onClick={onChancelEdit} />
                : <EditIcon className={cls.icon} onClick={onEdit} />
            }
        </div>
    )
}