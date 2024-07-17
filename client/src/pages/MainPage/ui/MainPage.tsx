import { FileUploadArea } from '@/shared/ui/FileUpload'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'



const MainPage = memo(() => {
    const {t} = useTranslation('main')
    const handleSubmit = (val: string |string[]) => {
        console.log(val)
    }
    return (<div>
        <h1>
            {t('Главная страница')}
        </h1>
        < FileUploadArea  
            dropDownArea={false}  
            onUpdateLinks={handleSubmit}
            label={t('Загрузить изображение')}
        />
    </div>  )
})
 
export default MainPage