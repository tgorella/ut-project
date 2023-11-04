import { memo } from 'react'
import { useTranslation } from 'react-i18next'

const AboutPage = memo(() => {
    const {t} = useTranslation('about')
    return (<h1>
        {t('О сайте')}
    </h1>  )
})
 
export default AboutPage