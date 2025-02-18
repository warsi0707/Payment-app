import React from 'react'

export default function Message({message,success}) {
  return (
    <div className='absolute top-20 right-32'>
    <div className={`px-10 py-2 text-lg text-center rounded-md ${success? "bg-green-500 text-white": "bg-red-400 text-white"} `}>
    <h1>{message}</h1>
  </div>
  </div>
  )
}
