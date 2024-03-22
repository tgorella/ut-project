import cls from './OrderStatusInput.module.scss'
import {memo} from 'react'
import { OrderStatusDetails } from '../../../model/types/OrderStatus'
import { Input } from 'shared/ui/Input/Input'
import EDIT_ICON from 'shared/assets/img/pencil.svg'
import DELETE_ICON from 'shared/assets/img/delete.svg'
import CHECK_ICON from 'shared/assets/img/check.svg'
import CLOSE_ICON from 'shared/assets/img/close.svg'


interface OrderStatusInputProps {
  className?: string;
  itemData: OrderStatusDetails,
  editInputId: string,
  onColorChange: (val: string) => void,
  onNameChange: (val: string) => void,
  onSave: () => void,
  onEdit: (id: string, name: string, color: string) => void,
  onChancelEdit: () => void,
  onDelete?: (val: string) => void
}
export const OrderStatusInput = memo(({
    itemData = {_id: 'new', name: '', color: '#000', isDefault: false }, 
    editInputId, 
    onChancelEdit, 
    onEdit, 
    onColorChange, 
    onNameChange, 
    onSave,
    onDelete} : OrderStatusInputProps) => {

    const editMode = itemData._id === editInputId

    const handleEdit = () => {
        onEdit(itemData._id, itemData.name, itemData.color )
    }

    const handleDelete = () => {
        onDelete && onDelete(itemData._id)
    }

    console.log(itemData)

    return ( 
        <div className={cls.input_wrapper}>
            <div className={cls.info_wrapper}>
                {(!editMode) && <div className={cls.color_block} style={{backgroundColor: itemData.color}}></div>}
                {(!editMode || itemData.isDefault) && <div className={cls.name_block}>{itemData.name}</div>}
                {editMode && <Input className={cls.name_block} defaultValue={itemData.name} onChange={onNameChange} />}
                {(editMode) && <Input className={cls.color_input} defaultValue={itemData.color} type='color' onChange={onColorChange} style={{backgroundColor: itemData.color}} />}

            </div>
            {!itemData.isDefault && <>
                <div className={cls.button_wrapper}>
                    {editMode && 
                    <>
                        <button onClick={onSave}><CHECK_ICON className={cls.icon}/></button>
                        <button onClick={onChancelEdit}><CLOSE_ICON className={cls.icon}/></button>
                    </>}
                    {!editMode && <button onClick={handleEdit}><EDIT_ICON className={cls.icon}/></button>}
                    {onDelete && <button onClick={handleDelete}><DELETE_ICON className={cls.icon}/></button>}
                </div>
            </>}
            
        </div>
    )
})