import React, { useState } from 'react'
import { useNavigate, useSearchParams } from "react-router";
import { BackendUrl } from '../provider/BackendUrl';
import axios from 'axios'
import Message from '../components/Message';
export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id")
  const name = searchParams.get("name")
  const [amount, setAmmount] = useState(0)
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)
  const naivgate = useNavigate()

  
  const SendMoney =async()=>{
    const response = await axios.post(`${BackendUrl}/account/send`,{
      username: name,
      amount
    },{
      headers: {
        'Content-Type': "application/json"
      },
      withCredentials: true
    })
    const result = await response.data
    if(response){
      setMessage(result.message)
      setSuccess(true)
      setTimeout(() => {
        setMessage("")
        naivgate("/dashboard")
      }, 2000);
    }else{
      setMessage(result.message)
      setSuccess(false)
    }
  }
  return (
    <>
   {message && <Message message={message} success={success}/>}
    <div className='p-5 pb-5 mx-auto mt-32 text-black bg-white rounded-md shadow-md max-w-96 h-80'>
      <h1 className='mt-5 text-2xl font-bold text-center'>Send Money</h1>
      <div className='flex gap-5 mt-10'>
        <p className='px-2 py-1 text-xl text-white bg-green-500 rounded-full md:py-2 md:px-4'>{name[0].toUpperCase()}</p>
        <h1 className='mt-2 font-semibold md:text-xl'>{name}</h1>
      </div>
      <div className='flex flex-col gap-1 mt-3'>
        <label htmlFor="">Amoutn (in rs)</label>
        <input value={amount} onChange={(e)=> setAmmount(e.target.value)}  className='p-1 px-2 mb-5 border-2 border-gray-500 rounded-md ' type="number" placeholder='Enter amount ' />
      </div>
      <button onClick={SendMoney} className='w-full py-2 text-lg text-white bg-green-500 rounded-lg '>Initiate Transfer</button>
    </div>
    </>
  )
}
