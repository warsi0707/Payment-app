import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RecoilRoot } from 'recoil'
import { UseAuth } from './context/useAuth.jsx'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <RecoilRoot>
      
      <UseAuth>
      <div className='h-screen bg-gray-200'>

        <App />

      </div>
      </UseAuth>
   
    </RecoilRoot>
  // </StrictMode>,
)
