import cls from './ProjectsPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchProjects } from 'entities/Project'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { projectsPageReducer } from '../model/slice/ProjectsPageSlice'
import { useSelector } from 'react-redux'
import { getProjectPageData } from '../model/selectors/getProjectPageData/getProjectPageData'
import { getProjectPageOrders } from '../model/selectors/getProjectPageOrders/getProjectPageOrders'
import { fetchAllOrders } from 'pages/OrdersPage/model/services/fetchAllOrders/fetchAllOrders'
import { ProjectHeader } from 'entities/Project/ui/ProjectHeader/ProjectHeader'
import { ProjectRow } from 'entities/Project/ui/ProjectRow/ProjectRow'
import { orderStatusEditReducer } from 'widgets/OrderStatusEdit'
import { fetchOrderStatuses, getOrderStatusesData } from 'entities/OrderStatus'
import { fetchClients } from 'entities/Clients/model/services/fetchAll/fetchClients'
'pages/ClientsPage/model/services/fetchAll/fetchClients'
import { getProjectPageClient } from '../model/selectors/getProjectPageClient/getProjectPageClient'
import { countTotalSteps } from '../model/lib/countTotalSteps'
import { getProjectPageIsLoading } from '../model/selectors/getProjectPageIsLoading/getProjectPageIsLoading'
import { PageLoader } from 'widgets/PageLoader'

interface ProjectsPageProps {
  className?: string;
}

const reducers: ReducersList = {
    projectPage: projectsPageReducer,
    orderStatuses: orderStatusEditReducer
}
export const ProjectsPage = memo(({className} : ProjectsPageProps) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation('project')
    const isLoading = useSelector(getProjectPageIsLoading)
    const data = useSelector(getProjectPageData)
    const orders = useSelector(getProjectPageOrders)
    const orderStatuses = useSelector(getOrderStatusesData) || []
    const clients = useSelector(getProjectPageClient) || []

    const filteredOrders = orders?.filter((order) => order.status !== '659bc05bec9c6a620f683034' && order.status !== '659bc05bec9c6a620f683036' && order.status !== '659bc05bec9c6a620f683035')
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchProjects())
            dispatch(fetchAllOrders(''))
            dispatch(fetchOrderStatuses())
            dispatch(fetchClients())
        }
    }, [dispatch])


    if (isLoading) {
        return <PageLoader />
    }

    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <div className={classNames(cls.ProjectsPage, {}, [className])}>
                <h1>{t('Проекты')}</h1>
                {data?.map((project) => {
                    return (
                        <div className={cls.project_wrapper}  key={project._id}>
                            <ProjectHeader stages={project.stages} projectName={project.name} />
                            {filteredOrders?.filter((order) => order.projectType === project._id).map((order) => {
                                return <ProjectRow 
                                    key={order._id} 
                                    order={order} 
                                    totalSteps={countTotalSteps(project.stages)}
                                    status={orderStatuses.find((el) => el._id === order.status )} 
                                    client={clients.find((el) => el._id === order.clientId)} 
                                />
                            })}
                        </div>)
                })}
            </div>
        </DynamicModuleLoader>
        
    )
})