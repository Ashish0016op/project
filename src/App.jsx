
import { Route, Routes } from 'react-router-dom'

import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Home from './pages/Home/Home'
import Post from './pages/Post/Post'
import ShowPost from './pages/ShowPost/ShowPost'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/forgot_password' element={<ForgotPassword/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path="/show_post/:postId" element={<ShowPost />} />
      </Routes>
    </>
  )
}

export default App
