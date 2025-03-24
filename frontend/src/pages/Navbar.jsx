import { Link } from 'react-router-dom'
import AuthContext from '../context/useAuth'
import { memo, useCallback, useContext } from 'react'
import { BackendUrl } from '../provider/BackendUrl'
import toast from 'react-hot-toast'

 function Navbar() {
  const {authenticated, setAuthenticated} = useContext(AuthContext)
   const Logout =useCallback(async()=>{
          const response = await fetch(`${BackendUrl}/user/logout`,{
              method: "POST",
              credentials: 'include'
          })
          if(response.ok){
              setAuthenticated(false)
             toast.success("Logout")
          }else{
              setAuthenticated(false)
              toast.error("Logout")
          }
      },[])
 
  return (
    <div className='flex justify-between w-full p-5 border-2 border-b-gray-400'>
      <div>
        <Link to={"/"} className='text-2xl font-bold'>Payments App</Link>
      </div>
      <div className='items-center justify-center hidden gap-2 text-xl font-semibold sm:flex'>
        {!authenticated && <>
          <Link to={"/signin"}>Signin</Link>
          <Link to={"/signup"}>Signup</Link>
        </> }
       {authenticated &&<>
        <button onClick={Logout}>Logout</button>
        </>
       }
      </div>
      
    </div>
  )
}
export default memo(Navbar)