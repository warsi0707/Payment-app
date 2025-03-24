import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

import Navbar from './pages/Navbar'
import NotFound from './pages/NotFound'
import SendMoney from './pages/SendMoney'
import { useContext } from 'react'
import AuthContext from './context/useAuth'

function App() {
  const {authenticated} = useContext(AuthContext)
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={authenticated?<Dashboard/>: <Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/send' element={authenticated?<SendMoney/>:<Signin/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
