import { Input } from 'shared/ui/Input/Input'
import cls from './Searchbar.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import SearchIcon from 'shared/assets/img/search.svg'

interface SearchbarProps {
  className?: string;
  onChange: () => void;
  placeholder: string
}
export const Searchbar = ({className, placeholder, onChange} : SearchbarProps) => {


    return ( 
        <div className={classNames(cls.Searchbar, {}, [className])}>
            <SearchIcon className={cls.icon} />
            <Input rounded={true} onChange={onChange} placeholder={placeholder}/>
        </div>
    )
}