import axios from 'axios';

const APIUrl = 'http://localhost.com:4001'

export const register = async (username,password) =>{
    const response = await axios.post(`${APIUrl}/register`, {
        username,
        password,
    })
    return response.data
}

