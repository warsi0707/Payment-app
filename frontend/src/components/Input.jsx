import React from 'react'

export default function Input({label,placeholder,type, value,onchange}) {
  return (
     <div className='flex flex-col gap-2 my-2 mb-3'>
      <label className='text-lg font-semibold text-black md:text-xl'>{label}</label>
      <input value={value} onChange={onchange} className='w-full p-1 md:p-1.5 rounded-md text-gray-600 text-lg border-2 border-gray-300' type={type} placeholder={placeholder} />
    </div>
  ) 
}
