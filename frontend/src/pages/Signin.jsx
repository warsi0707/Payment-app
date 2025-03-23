import Input from '../components/Input'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import Message from '../components/Message'
import { useState } from 'react'
import { BackendUrl } from '../provider/BackendUrl'
import { useNavigate } from 'react-router-dom'

export default function Signin() {
    const [message, setMessage ] = useState("")
    const [success, setSuccess] = useState("")
    const [username, setUsername] = useState()
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

      const HandleSignin =async(e)=>{
        e.preventDefault()
        const response =await fetch(`${BackendUrl}/user/signin`,{
          method :"POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({username, password})
        })
        const data = await response.json()
        if(response.ok){
          setMessage(data.message)
          setSuccess(true)
          setUsername("")
          setPassword("")
          setTimeout(() => {
            setMessage("")
            navigate("/dashboard")
          }, 2000);
        }else{
          setMessage(data.message)
          setSuccess(false)
          setTimeout(() => {
            setMessage("")
          }, 2000);
        }
      }

  return (
    <>
    {message && <Message message={message} success={success}/>}
     <div className='p-5 mx-auto mt-20 text-black bg-white rounded-lg max-w-96'>
          <h1 className='mb-2 text-3xl font-bold text-center text-black'>Sign in</h1>
          <p className='mb-5 text-lg text-center text-gray-500'>Enter your information to login</p>
            <Input value={username} onchange={(e)=> setUsername(e.target.value)} label={"Username"} placeholder={"John@12"} type={"text"}/>
            <Input value={password} onchange={(e)=> setPassword(e.target.value)} label={"Password"} type={"password"}/>
            <Button onclick={HandleSignin} purpose={"Sign In"}/>
            <BottomWarning purpose={"sign Up"} to={"/signup"}/>
        </div>
        </>
  )
}
