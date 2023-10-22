import cls from './ProfilePage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ProfileCard, fetchProfileData, profileReducer } from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useEffect } from 'react'
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData'
import { useSelector } from 'react-redux'
import { getProfileLoadingError } from 'entities/Profile/model/selectors/getProfileLoadingError/getProfileLoadingError'
import { getProfileLoadingStatus } from 'entities/Profile/model/selectors/getProfileLoadingStatus/getProfileLoadingStatus'

const reducers: ReducersList = {
    profile: profileReducer
}
interface ProfilePageProps {
  className?: string;
}
const ProfilePage = ({className} : ProfilePageProps) => {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])
  
    const data = useSelector(getProfileData)
    const isLoading = useSelector(getProfileLoadingStatus)
    const error = useSelector(getProfileLoadingError)
    
  
    return ( 
        <DynamicModuleLoader reducers={reducers} >
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                <ProfileCard data={data} isLoading={isLoading} error={error} />
            </div>
        </DynamicModuleLoader>
        
    )
  
}

export default ProfilePage