import React from "react";
import *as authService from '../services/authServices.js'
import { Form, Input, Button, message } from "antd";

const Register = () => {
    const [form] = Form.useForm();
  
    const onFinish = async (values) => {
      try {
        const data = await authService.register(values.username, values.password);
        message.success('Registro exitoso');
        console.log(data)
      } catch (error) {
        message.error('Error en el registro');
        console.error('There was an error registering!', error);
      }
    };

    return(
        <Form form={form} name="register" onFinish={onFinish} >
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