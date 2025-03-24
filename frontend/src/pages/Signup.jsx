import Input from '../components/Input'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import Message from '../components/Message'
import {BackendUrl} from "../provider/BackendUrl"
import { memo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

 function Signup() {

  const [message, setMessage ] = useState("")
  const [success, setSuccess] = useState("")
  const usernameRef = useRef()
  const passwordRef = useState()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const navigate = useNavigate()

  const HandleSignup =async(e)=>{
    e.preventDefault()
    const username = usernameRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const password = passwordRef.current.value;
    const response =await fetch(`${BackendUrl}/user/signup`,{
      method :"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, firstName, lastName, password})
    })
    const data = await response.json()
    if(response.ok){
      setMessage(data.message)
      setSuccess(true)
      setTimeout(() => {
        setMessage("")
        navigate("/signin")
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
    <div className='h-full py-10 pb-10 bg-gray-200'>
    <div className='p-5 mx-auto mt-10 text-black bg-white rounded-lg w-96'>
      <h1 className='mb-2 text-3xl font-bold text-center text-black'>Sign Up</h1>
      <p className='mb-5 text-lg text-center text-gray-500'>Enter your information to create an account</p>
        <Input ref={usernameRef}  label={"Username"} placeholder={"John@12"} type={"text"}/>
        <Input ref={firstNameRef}  label={"First Name"} placeholder={"John"} type={"text"}/>
        <Input ref={lastNameRef}  label={"Last Name"} placeholder={"Dep"} type={"text"}/>
        <Input ref={passwordRef}  label={"Password"} placeholder={"Password"} type={"password"} />
        <Button onclick={HandleSignup} purpose={"Sign Up"}/>
        <BottomWarning purpose={"sign in"} to={"/signin"}/>
    </div>
    </div>
    </>
  )
}
export default memo(Signup)