import { Link } from 'react-router-dom'

export default function BottomWarning({purpose,to}) {
  return (
    <div className='flex gap-2 font-semibold text-black'>
    <p>Already have an account? </p><Link to={to}  className='underline'>{purpose}</Link>
   </div>
  )
}
