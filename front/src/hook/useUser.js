import { userContext } from "../context/user";
import { useContext } from "react";


const UseUser = () =>{

    const { token,logged,setToken, userData, login, logout  } = useContext(userContext)

    return { token,logged, setToken,  userData, login, logout}
}


export default UseUser