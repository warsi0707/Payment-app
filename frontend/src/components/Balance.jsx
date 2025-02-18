
export default function Balance({balance}) {
  return (
    <div className='flex flex-col gap-3 my-10 text-lg sm:flex-row'>
        <h1 className='font-bold text-black'>Your Balance</h1>
        <p className=''>Rs {balance}</p>
    </div>
  )
}
