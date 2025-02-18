import { useNavigate } from "react-router-dom"
import {BackendUrl} from "../provider/BackendUrl"
import { useState } from "react"

export default function useSignup(){
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    
    const Signup =async(e)=>{
        e.preventDefault()
        const response = await fetch(`${BackendUrl}/user/signup`,{
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({username, firstName, lastName, password})
        })
        const result = await response.json()
        if(response.ok){
            setUsername("")
            setFirstName("")
            setLastName("")
            setPassword("")
            setMessage(result.message)
            setTimeout(() => {
                setMessage("")
                navigate("/signin")
            }, 2000);
        }else{
            setMessage(result.message)
            setTimeout(() => {
                setMessage("")
            }, 2000);
        }
    }
    
    return {firstName, lastName, password, username,message, setFirstName, setLastName, setUsername, setPassword, Signup}
}