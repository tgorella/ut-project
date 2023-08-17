import { Route, Routes } from 'react-router-dom'
import './styles/index.scss'
import { Link } from 'react-router-dom'
import { MainPageLazy } from './pages/MainPage/MainPage.lazy'
import { AboutPageLazy } from './pages/AboutPage/AboutPage.lazy'
import { Suspense } from 'react'
import { useTheme } from './theme/useTheme'
import classNames from './helpers/ClassNames/ClassNames'

const App = () => {
  const {theme, toggleTheme} = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <div>
        <Link to={'/'}>Main page</Link>
        <Link to={'/about'}>About page</Link>
      </div>
      <button onClick={toggleTheme}>Switch theme</button>
      <Suspense fallback={'Loading...'}>
        <Routes>
          <Route
            path={'/'}
            element={<MainPageLazy />}
          />
          <Route
            path={'/about'}
            element={<AboutPageLazy />}
          />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
