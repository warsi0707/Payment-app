import { useContext } from "react";
import AuthContext from "../context/useAuth";
import { BackendUrl } from "../provider/BackendUrl";

export default  function useLogout (){
    const {setAuthenticated} = useContext(AuthContext)
  

    const Logout =async()=>{
        const response = await fetch(`${BackendUrl}/user/logout`,{
            method: "POST",
            credentials: 'include'
        })
        if(response.ok){
            setAuthenticated(false)
           
        }else{
            setAuthenticated(false)
           
        }
    }
    return Logout
    
}