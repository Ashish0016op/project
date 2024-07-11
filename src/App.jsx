
import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp/SignUp'
import { Home } from '@mui/icons-material'
import SignIn from './pages/SignIn/SignIn'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/forgot_password' element={<ForgotPassword/>}/>
      </Routes>
    </>
  )
}

export default App
