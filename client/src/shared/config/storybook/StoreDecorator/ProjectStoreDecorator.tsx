import { ReducersMapObject } from '@reduxjs/toolkit'
import { Decorator } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { projectEditReducer } from 'widgets/ProjectEdit'

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    ProjectEdit: projectEditReducer,
}

export const projects: DeepPartial<StateSchema> = {
    ProjectEdit: {
        isLoading: false,
        data: [{
            _id: 'jhmgjh54rhre',
            name: 'Разработка бренд бука',
            userId: 'апвапр',
            stages: [
                {
                    _id: '',
                    name: 'Подготовка',
                    userId: '',
                    projectId: '',
                    index: 0,
                    steps: [
                        {_id: 'skjfsh',
                            name: 'Подписать договор',
                            projectId: '',
                            userId: '',
                            stageId: '',
                            index: 1,
                        },
                        {_id: 'wrwerr453',
                            name: 'Заполнить бриф / ТЗ',
                            projectId: '',
                            userId: '',
                            stageId: '',
                            index: 2,
                        },
                        {_id: 's3443ghfhsh',
                            name: 'Аванс',
                            projectId: '',
                            userId: '',
                            stageId: '',
                            index: 3,
                        }
                    ]
                }
            ]
        }
        ]
    }
}
export const projectEditError: DeepPartial<StateSchema> = {
    ProjectEdit: {
        isLoading: false,
        error: 'error'
    }
}
export const ProjectEditIsLoading: DeepPartial<StateSchema> = {
    ProjectEdit: {
        isLoading: true
    }
}

export const EditProjectStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={projects} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const orderStatusesErrorStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={projectEditError} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
export const orderStatusesIsLoadingStoreDecorator: Decorator = (Story) => (
    <StoreProvider initialState={ProjectEditIsLoading} asyncReducers={defaultAsyncReducers}>
        {Story()}
    </StoreProvider>
)
