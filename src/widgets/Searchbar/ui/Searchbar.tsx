import { Input } from 'shared/ui/Input/Input'
import cls from './Searchbar.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import SearchIcon from 'shared/assets/img/search.svg'
import { memo } from 'react'

interface SearchbarProps {
  className?: string;
  onChange: (text: string) => void;
  placeholder: string
}
export const Searchbar = memo(({className, placeholder, onChange} : SearchbarProps) => {


    return ( 
        <div className={classNames(cls.Searchbar, {}, [className])}>
            <SearchIcon className={cls.icon} />
            <Input rounded={true} onChange={onChange} placeholder={placeholder}/>
        </div>
    )
})