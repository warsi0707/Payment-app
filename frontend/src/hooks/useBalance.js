import { useEffect, useState } from "react";
import { BackendUrl } from "../provider/BackendUrl";


export default function useBalance() {
  const [balance, setBalance] = useState(0)
  const GetBalance =async()=>{
    const response = await fetch(`${BackendUrl}/account/balance`,{
      method: "GET",
      credentials: 'include'
    })
    const result = await response.json()
    if(response.ok){
      setBalance(result.balance)
    }else{
      setBalance(0)
    }
  }
  useEffect(()=>{
    // setInterval(() => {
      GetBalance()
    // }, 2000);
  },[])
  return {balance}
}
