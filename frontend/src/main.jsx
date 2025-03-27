import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { UseAuth } from './context/useAuth.jsx'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <UseAuth>
        <Toaster position='top-right'/>
      <div className='h-full py-10 bg-gray-200'>
        <App />
      </div>
      </UseAuth>
  // </StrictMode>,
)
