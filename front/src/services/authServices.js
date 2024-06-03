import axios from 'axios';

const APIUrl = 'http://localhost:4002'


export const register = async (username,password) =>{
    const response = await axios.post(`${APIUrl}/createuser`, {
        username,
        password,
    })
    return response.data
}


export const login = async (username,password) =>{
    const response = await axios.post(`${APIUrl}/login`, {
        username,
        password,
    })
    return response.data
}


