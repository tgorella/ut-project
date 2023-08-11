import { Route, Routes } from 'react-router-dom'
import './styles/index.scss'
import { Link } from 'react-router-dom'
import { MainPageLazy } from './pages/MainPage/MainPage.lazy'
import { AboutPageLazy } from './pages/AboutPage/AboutPage.lazy'
import { Suspense } from 'react'
import { useTheme } from './theme/useTheme'




const App = () => {
  const {theme, toggleTheme} = useTheme()
  
  return (
    <div className={'app ' + theme}>
      <Link to='/'>Main</Link>
      <Link to='/about'>About</Link>
      <button onClick={toggleTheme}>Change Theme</button>

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
