import { useNavigate } from "react-router-dom"
import {BackendUrl} from "../provider/BackendUrl"
import { useState } from "react"

export default function useSignin(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [success, setScuccess] = useState(false)
    const navigate = useNavigate()

    const Signin =async(e)=>{
        e.preventDefault()
        const response = await fetch(`${BackendUrl}/user/signin`,{
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({username, password})
        })
        const result = await response.json()
        if(response.ok){
            setUsername("")
            setPassword("")
            setMessage(result.message)
            setScuccess(true)
            setTimeout(() => {
                setMessage("")
                navigate("/dashboard")
            }, 2000);
        }else{
            setMessage(result.message)
            setScuccess(false)
            setTimeout(() => {
                setMessage("")
            }, 2000);
        }
    }
    
    return { password, username, message, success ,setUsername, setPassword, Signin}
}