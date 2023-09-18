import classNames from 'shared/lib/classNames/ClassNames'
import { useTheme } from 'app/providers/ThemeProvider'
import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar/ui/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense} from 'react'

const App = () => {
    const { theme } = useTheme()
    

    return (
        <div className={classNames('app', {}, [theme])} id='app'>
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
