import UseUser from "../hook/useUser"


const LogOut = () =>{
    const { logout } = UseUser()

    logout()
    
    return(
        <div>Cerrando Sesión</div>
    )

}


export default LogOut