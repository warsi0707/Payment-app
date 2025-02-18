import React, { useEffect, useState } from 'react'
import Users from './Users'
import { BackendUrl } from '../provider/BackendUrl'

export default function SearchBar() {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")
   
    useEffect(()=>{
        const GetUser =async()=>{
            const response = await fetch(`${BackendUrl}/user/bulk?filter=` + filter,{
                method: "GET",
                credentials: 'include'
            })
            const result = await response.json()
            if(response.ok){
                setUsers(result.data)
            }
        }
        GetUser()
    },[filter])
  return (
    <div>
       <h1 className='text-lg font-bold'>Users</h1>
       <input onChange={(e)=> setFilter(e.target.value)} className='w-full p-1 px-2 mb-5 bg-gray-200 border border-gray-500 rounded-md' type="text" placeholder='Search users...' />
    </div>
  )
}
