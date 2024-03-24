import cls from './ProjectEdit.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useEffect, useState} from 'react'
import { Project, ProjectBlock, ProjectStage, ProjectStep, addProject, addStage, addStep, fetchProjects } from 'entities/Project'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { projectEditReducer } from '../model/slice/ProjectEditSlice'
import { useSelector } from 'react-redux'
import { getProjectEditIsLoading } from '../model/selectors/getProjectEditIsLoading/getProjectEditIsLoading'
import { getProjectEditError } from '../model/selectors/getProjectEditError/getProjectEditError'
import { PageLoader } from 'widgets/PageLoader'
import { Alert, AlertTheme } from 'shared/ui/Alert'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { useTranslation } from 'react-i18next'
import { Modal } from 'shared/ui/Modal'
import { Input } from 'shared/ui/Input/Input'
import { getEditProjectData } from '../model/selectors/getEditProjectData/getEditProjectData'
import { VStack } from 'shared/ui/Stack'

interface ProjectEditProps {
  className?: string
}
const projectInitialState : Partial<Project> = {
    name: '',
    stages: []
} 

const stageInitialState : Partial<ProjectStage> = {
    projectId: '',
    name: '',
    index: 0,
    steps: []
}

const stepInitialState : Partial<ProjectStep> = {
    stageId: '',
    projectId: '',
    name: '',
    index: 0
}

const reducers : ReducersList = {
    ProjectEdit: projectEditReducer
}
const ProjectEdit = memo(({className} : ProjectEditProps) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation('project')
    const data = useSelector(getEditProjectData)
    const isLoading = useSelector(getProjectEditIsLoading)
    const widgetError = useSelector(getProjectEditError)
    const [open, setOpen] = useState({project: false, stage: false, step: false})
    const [newProjectName, setNewProjectName] = useState('')
    const [newStageName, setNewStageName] = useState('')
    const [newStepName, setNewStepName] = useState('')
    const [errors, setErrors] = useState({project: '', stage: '', step: ''})
    const [projectId, setProjectId] = useState('')
    const [stageId, setStageId] = useState('') 
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchProjects())
        }
        
    }, [dispatch])

    const toggleModal = (type: string) => {
        if (type === 'project') {
            setOpen({project: true, stage: false, step: false})
        }
        if (type === 'stage') {
            setOpen({project: false, stage: true, step: false})
        }
        if (type === 'step') {
            setOpen({project: false, stage: false, step: true})
        }
    }
    const handleOpenStageModal = (projectId: string, index: number) => { 
        toggleModal('stage')
        setProjectId(projectId)
        setIndex(index)
    }

    const handleOpenStepModal = (projectId: string, stageId: string, index: number) => { 
        toggleModal('step')
        setProjectId(projectId)
        setStageId(stageId)
        setIndex(index)
    }

    const resetAll = () => {
        setNewProjectName('')
        setNewStageName('')
        setNewStepName('')
        setProjectId('')
        setIndex(0)
        setStageId('')
        setOpen({project: false, stage: false, step: false})
        setErrors({project: '', stage: '', step: ''})
    }

    const handleChangeNewProjectName = (value: string) => {
        setNewProjectName(value)
    }
    const handleChangeNewStageName = (value: string) => {
        setNewStageName(value)
    }
    const handleChangeNewStepName = (value: string) => {
        setNewStepName(value)
    }
    const handleAddNewProject = () => {
        if (newProjectName.trim() === '') {
            setErrors({project: t('Название не должно быть пустым'), stage: '', step: ''})
            return
        }
        const newProject = projectInitialState
        newProject.name = newProjectName
        dispatch(addProject(newProject)).then(() => {
            resetAll()
        })
    }

    const handleAddNewStage = () => {
        if (newStageName.trim() === '') {
            setErrors({stage: t('Название не должно быть пустым'), project: '', step: ''})
            return
        }
        const newStage = stageInitialState
        newStage.name = newStageName
        newStage.index = index
        newStage.projectId = projectId
        dispatch(addStage(newStage)).then(() => {
            resetAll()
        })
    }


    const handleAddNewStep = () => {
        if (newStepName.trim() === '') {
            setErrors({step: t('Название не должно быть пустым'), stage: '', project: ''})
            return
        }
        const newStep = stepInitialState
        newStep.name = newStepName
        newStep.projectId = projectId
        newStep.stageId = stageId
        newStep.index = index
        dispatch(addStep(newStep)).then(() => {
            resetAll()
        })
    }
    if (isLoading) {
        return <PageLoader />
    }

    if (widgetError) {
        return <Alert theme={AlertTheme.ERROR} text={t('Что-то пошло не так. Не получилось получить данные.')} />
    }
    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <VStack max gap='20'  className={classNames(cls.ProjectEdit, {}, [className])}>
                <h2>{t('Проекты')}</h2>
                <p>{t('Добавляйте свои проекты, разбивайте их на стадии и шаги. Отслеживайте состояние проекта на каждом этапе.')}</p>
                <p>
                    {t('Для изменения названия проекта, стадии или шага: кликнете по названию, введите новое. Изменение применится, когда редактирование закончится (кликнете за пределами блока с редактируемым названием)')}</p>
                {
                    data?.map((project) => {
                        return <ProjectBlock 
                            key={project._id}
                            project={project} 
                            onAddStage={handleOpenStageModal} 
                            onAddStep={handleOpenStepModal} />
                    })
                }
                <AppButton 
                    onClick={() => toggleModal('project')} 
                    theme={ButtonTheme.SOLID} 
                    stretch={true}
                >
                    {t('Добавить новый проект')}
                </AppButton>
            </VStack> 
            <Modal 
                isOpen={open.project} 
                onClose={resetAll}>
                <div className={cls.contentWrapper}>
                    <p>{t('Введите название проекта')}</p>
                    <Input  value={newProjectName} onChange={handleChangeNewProjectName} />
                    {errors.project && <Alert theme={AlertTheme.ERROR} text={errors.project} />}
                    <AppButton stretch={true} theme={ButtonTheme.SOLID} onClick={handleAddNewProject} disabled={!newProjectName}>
                        {t('Добавить проект')}
                    </AppButton>
                </div>
                
            </Modal>
            <Modal 
                isOpen={open.stage} 
                onClose={resetAll}>
                <div className={cls.contentWrapper}>
                    <p>{t('Введите название стадии')}</p>
                    <Input  value={newStageName} onChange={handleChangeNewStageName} />
                    {errors.stage && <Alert theme={AlertTheme.ERROR} text={errors.stage} />}
                    <AppButton stretch={true} theme={ButtonTheme.SOLID} onClick={handleAddNewStage} disabled={!newStageName}>
                        {t('Добавить стадию')}
                    </AppButton>
                </div>
                
            </Modal>
            <Modal 
                isOpen={open.step} 
                onClose={resetAll}>
                <div className={cls.contentWrapper}>
                    <p>{t('Введите название шага')}</p>
                    <Input  value={newStepName} onChange={handleChangeNewStepName} />
                    {errors.step && <Alert theme={AlertTheme.ERROR} text={errors.step} />}
                    <AppButton stretch={true} theme={ButtonTheme.SOLID} onClick={handleAddNewStep} disabled={!newStepName}>
                        {t('Добавить шаг')}
                    </AppButton>
                </div>
                
            </Modal>
        </DynamicModuleLoader>
       
       
    )
})

export default ProjectEdit