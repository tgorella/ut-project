import classNames from 'shared/lib/classNames/ClassNames'
import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar/ui/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense} from 'react'

const App = () => {
    
    return (
        <div className={classNames('app', {}, [])} id='app'>
            <Suspense fallback=''>
                <Navbar />
                <div className='content-page'>
                    <Sidebar className={''} />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )
}

export default App
