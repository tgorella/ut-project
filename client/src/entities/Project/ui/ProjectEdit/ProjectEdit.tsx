import cls from './ProjectEdit.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { Project, ProjectStage, ProjectStep } from 'entities/Project/model/types/Project'


interface ProjectEditProps {
  className?: string;
  projects: Project[]
}
const projectInitialState : Project = {
    _id: '',
    name: '',
    userId: '',
    stages: []
} 

const stageInitialState : ProjectStage = {
  _id: '',
  userId: '',
  projectId: '',
  name: '',
  index: 0,
  steps: []
}

const stepInitialState : ProjectStep = {
  _id: '',
  userId: '',
  stageId: '',
  name: '',
  index: 0
}

export const ProjectEdit = memo(({className, projects} : ProjectEditProps) => {
const [open, setOpen] = useState({project: false, stage: false, step: false})
    return ( 
        <div className={classNames(cls.ProjectEdit, {}, [className])}>
      
        </div>
    )
})