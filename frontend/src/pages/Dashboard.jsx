import Balance from '../components/Balance'
import useBalance from '../hooks/useBalance'
import Users from '../components/Users'


export default function Dashboard() {
  const {balance} = useBalance()

  return (<>
    <div className='max-w-[1000px] px-10 mx-auto my-10'>
      <Balance balance={balance}/>
      <Users/>
    </div>
    </>
  )
}
