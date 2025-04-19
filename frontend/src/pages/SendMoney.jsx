import{ useRef } from 'react'
import { useNavigate, useSearchParams } from "react-router";
import { BackendUrl } from '../provider/BackendUrl';
import axios from 'axios'
import toast from 'react-hot-toast';

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name")
  const amountRef = useRef(0)
  const naivgate = useNavigate()

  
  const SendMoney =async()=>{
    const amount = amountRef.current.value;
    const response = await axios.post(`${BackendUrl}/account/send`,{
      username: name,
      amount
    },{
      headers: {
        'Content-Type': "application/json",
        Authorization: localStorage.getItem("token")
      },
      withCredentials: true
    })
    const result = await response.data
    if(response){
      toast.success(result.message)
      setTimeout(() => {
        naivgate("/")
      }, 2000);
    }else{
      toast.error(result.message)
    }
  }
  return (
    <>
    <div className='p-5 pb-5 mx-auto mt-32 text-black bg-white rounded-md shadow-md max-w-96 h-80'>
      <h1 className='mt-5 text-2xl font-bold text-center'>Send Money</h1>
      <div className='flex gap-5 mt-10'>
        <p className='px-2 py-1 text-xl text-white bg-green-500 rounded-full md:py-2 md:px-4'>{name[0].toUpperCase()}</p>
        <h1 className='mt-2 font-semibold md:text-xl'>{name}</h1>
      </div>
      <div className='flex flex-col gap-1 mt-3'>
        <label htmlFor="">Amoutn (in rs)</label>
        <input ref={amountRef}  className='p-1 px-2 mb-5 border-2 border-gray-500 rounded-md ' type="number" placeholder='Enter amount ' />
      </div>
      <button onClick={SendMoney} className='w-full py-2 text-lg text-white bg-green-500 rounded-lg '>Initiate Transfer</button>
    </div>
    </>
  )
}
