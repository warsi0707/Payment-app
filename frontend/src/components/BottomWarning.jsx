import React from 'react'
import { Link } from 'react-router-dom'
export default function BottomWarning({purpose,to}) {
  return (
    <div className='flex gap-2 text-black font-semibold'>
    <p>Already have an account? </p><Link to={to}  className='underline'>{purpose}</Link>
   </div>
  )
}
