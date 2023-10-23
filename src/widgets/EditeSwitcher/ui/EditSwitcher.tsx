import cls from './EditSwitcher.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import EditIcon from 'shared/assets/img/pencil.svg'
import CloseIcon from 'shared/assets/img/close.svg'

interface EditSwitcherProps {
  className?: string;
  editMode: boolean;
  toggleEditMode: () => void
}
export const EditSwitcher = ({className, editMode, toggleEditMode} : EditSwitcherProps) => {
  
    return ( 
        <div className={classNames(cls.EditSwitcher, {}, [className])} >
            {editMode 
                ? <CloseIcon className={cls.icon} onClick={toggleEditMode} />
                : <EditIcon className={cls.icon} onClick={toggleEditMode} />
            }
        </div>
    )
}