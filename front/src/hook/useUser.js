import { userContext } from "../context/user";
import { useContext } from "react";


const UseUser = () =>{

    const { token,setToken, userData, login, logout  } = useContext(userContext)

    return { token, setToken,  userData, login, logout}
}


export default UseUser