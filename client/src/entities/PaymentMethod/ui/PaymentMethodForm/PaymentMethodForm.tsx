import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar'
import { FileUploadArea } from '@/shared/ui/FileUpload'
import { VStack } from '@/shared/ui/Stack'
import { useTranslation } from 'react-i18next'
import { PaymentMethod } from '../../model/types/PaymentMethod'
import { Input } from '@/shared/ui/Input/Input'
import { AppButton, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { Box } from '@/shared/ui/Box'

interface PaymentMethodFormProps {
  data: Partial<PaymentMethod>,
  errors: Partial<PaymentMethod>,
  onChangeLogoLink: (value: string) => void,
  onChangeName: (value: string) => void,
  onSave: () => void
}

export const PaymentMethodForm = ({data, errors, onChangeLogoLink, onChangeName, onSave}: PaymentMethodFormProps) => {
    const {t} = useTranslation()
    
    return <Box header={t('Добавить метод оплаты')}>
        <VStack max gap='20'>
            {data.icon_url && <Avatar 
                size={AvatarSize.S}
                src={data.icon_url}
            />}
            <FileUploadArea 
                multiple={false}
                onUpdateLinks={( link: string[]) => onChangeLogoLink(link[0])}
                dropDownArea={false}
                folder='banks'
                label={t('Загрузить логотип')}
            />
            <Input 
                label={t('Название')} 
                value={data.name}  
                onChange={onChangeName} 
                name='name'
            />
            <AppButton 
                theme={ButtonTheme.OUTLINED} 
                onClick={onSave} 
                disabled={Object.values(errors).filter((item) => item !== '').length > 0 ? true : false}
            >
                {t('Сохранить')}
            </AppButton>
        </VStack>
    </Box>
}