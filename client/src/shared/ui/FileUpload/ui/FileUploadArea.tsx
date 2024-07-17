/* eslint-disable i18next/no-literal-string */
import cls from './FileUploadArea.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {memo, useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AppButton, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { gql, useMutation } from '@apollo/client'
import { Alert, AlertTheme } from '../../Alert'
import { HStack, VStack } from '../../Stack'

interface  FileUploadAreaProps {
  className?: string,
  multiple?: boolean,
  dropDownArea: boolean,
  label: string,
  onUpdateLinks?: (link: string[]) => void
}
export const  FileUploadArea = memo(({className, multiple, onUpdateLinks, dropDownArea = true, label} :  FileUploadAreaProps) => {
    const [drag, setDrag] = useState(false)
    const {t} = useTranslation()
    const filePicker = useRef<HTMLInputElement>(null)
    const [selectedFiles, setSelectedFiles] = useState<Array<File>>([])
    const [errorText, setErrorText] = useState<string>('')
    const [successText, setSuccessText] = useState<string>('')

    const MUTATION = gql`
mutation uploadManyFiles($files: [Upload]!) { uploadManyFiles(files: $files) }`

    const [mutate, { data }] = useMutation(MUTATION)
    useEffect(() => {
        if (data) {
            setSelectedFiles([])
        }
    }, [data])

    function handleDragStart (e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        setDrag(true)
    }

    function handleDragOver (e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        setDrag(false)
    }

    function handleDrop (e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        setSelectedFiles([...e.dataTransfer.files])
        setDrag(false)
    }

    const handlePick = () => {
        filePicker.current?.click()
    }
  
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles([...(event.target.files || [])] as Array<File>)
    }

    const handleDeleteFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setSelectedFiles(selectedFiles.filter(file => file.name !== (e.target as HTMLButtonElement).name))
    }

    const handleSetError = (value: string) => {
        if (value.includes('10000000 byte')) {
            handleSetError(t('Файл слишком большой для загрузки'))
        } else {
            setErrorText(value)
        }
        setTimeout(() => {
            setErrorText('')
        }, 5000)
    }
  
    const handleSetSuccess = (value: string) => {
        setSuccessText(value)
        setSelectedFiles([])
        if (filePicker.current) {
            filePicker.current.value = ''
        }
        setTimeout(() => {
            setSuccessText('')
        }, 5000)
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()
        setErrorText('')

        if (selectedFiles.length === 0) {
            handleSetError('Файлы не выбраны')
            return
        }

        if (selectedFiles.length > 10) {
            handleSetError('Слишком много файлов') 
            return
        }

        try {
            const result = await mutate({
                context: {
                    headers: {
                        'x-apollo-operation-name': 'FileUpload',
                    }
                },
                variables: {
                    files: selectedFiles,
                },
            })
            onUpdateLinks?.(result.data.uploadManyFiles)
            handleSetSuccess(t('Файл(ы) успешно загружены'))
        } catch (e) {
            // @ts-ignore\
            handleSetError(e.message)
        }
    }

    return (<VStack gap='10' max>
        {errorText && <Alert theme={AlertTheme.ERROR} text={errorText} className={cls.alert}></Alert>}
        {successText && <Alert theme={AlertTheme.SUCCESS} text={successText} className={cls.alert}></Alert>}
        <div className={cls.label}>{label}</div>
        {!dropDownArea && 
        <form className={classNames(cls.input, {}, [className])}>
            <input 
                ref={filePicker} 
                name='file'
                type="file"
                multiple={multiple}
                accept='image/*, .jpg, .jpeg, .png, .webp' 
                className={dropDownArea ? cls.hidden : ''}
                onChange={handleChange}
            />
           
            <AppButton
                onClick={handleSubmit}
                theme={ButtonTheme.SOLID}>
                {t('Загрузить')}
            </AppButton>
        </form>}
        {selectedFiles.length === 0 && dropDownArea &&
        <div  onClick={handlePick}>
            {drag
                ? (<div className={cls.dropArea} onDragStart={handleDragStart} onDragLeave={handleDragOver}  onDragOver={handleDragStart} onDrop={handleDrop}
                >{t('Отпустите файлы, чтобы загрузить их')}</div>)
                : (<div  className={cls.dragArea} onDragStart={handleDragStart}  onDragLeave={handleDragOver}  onDragOver={handleDragStart}
                >{t('Перетащите файлы, чтобы загрузить их.')}</div>)
            }
        </div>
        }
        {selectedFiles.length > 0 && dropDownArea && <div className={cls.dropArea} onClick={handlePick}>
            <div>{t('Выбранные файлы')}:</div>
            <VStack max className={cls.list}>
                {selectedFiles.map((file) => {
                    return <HStack max justify='between' key={file.name} className={cls.list_item}>
                        {file.name}
                        <AppButton 
                            name={file.name} 
                            onClick={handleDeleteFile}
                        >
                            {t('Удалить')}
                        </AppButton>
                    </HStack>})}
            </VStack>
            <AppButton
                onClick={handleSubmit}
                theme={ButtonTheme.SOLID}>
                {t('Загрузить')}
            </AppButton>
        </div>}
    </VStack>
    )
})