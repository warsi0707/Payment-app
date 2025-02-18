import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

import Navbar from './pages/Navbar'
import NotFound from './pages/NotFound'
import SendMoney from './pages/SendMoney'
import { UseAuth } from './context/useAuth'

function App() {
 
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/send' element={<SendMoney/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
