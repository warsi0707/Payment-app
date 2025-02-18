import { createContext, useEffect, useState } from 'react'
import { BackendUrl } from '../provider/BackendUrl'
import { useRecoilState } from 'recoil'
import {  authenticatedAtom } from '../atoms/Atom'

 const AuthContext = createContext()

export function UseAuth({children}) {
    const [authenticated, setAuthenticated] = useState(false)
    const GetUser =async()=>{
        const response = await fetch(`${BackendUrl}/user/auth`,{
            method :"GET",
            credentials: 'include'
        })
        const result = await response.json()
        if(result.authenticated === true){
            setAuthenticated(true)
        }else{
            setAuthenticated(false)
        }
    }
    useEffect(()=>{
        GetUser()
    },[])
    return (
        <AuthContext.Provider value={{authenticated, setAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext