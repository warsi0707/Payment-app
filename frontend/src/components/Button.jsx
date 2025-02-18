
export default function Button({purpose, onclick}) {
  return (
   <button onClick={onclick} className='w-full p-2 mt-5 mb-2 text-white transition-all duration-300 bg-black rounded-xl hover:bg-gray-800'>{purpose}</button>
  )
}
