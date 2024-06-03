import React from "react";
import *as authService from '../services/authServices.js'
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
  
    const onFinish = async (values) => {
        

      try {
        const data = await authService.register(values.username, values.password);
        message.success('Registro exitoso');
        console.log(data)
        navigate('/login')

      } catch (error) {
        message.error('Error en el registro');
        console.error('There was an error registering!', error);
      }
    };

    return(
        <Form form={form} name="register" onFinish={onFinish} style={{
            width: 300,
            padding: 20,
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }} >
            <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                Register
                </Button>
            </Form.Item>
    </Form>
    )

} 


export default Register;



        // <form onSubmit={handleSubmit}> 
        //     <div>
        //         <label>Usuario</label>
        //         <input 
        //         type="text"
        //         name="username"
        //         value={formData.username} 
        //         onChange={handleChangue}
        //         />
        //     </div>
        //     <div>
        //         <label>Password</label>
        //         <input 
        //         type="password"
        //         name="password"
        //         value={formData.password}
        //         onChange={handleChangue}
        //         />
        //     </div>
        //     <input value='Register'type="submit"></input>
        //     {message && <p>{message}</p>}
        // </form>