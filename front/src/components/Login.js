import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import *as authService from '../services/authServices.js';
import UseUser from '../hook/useUser.js';

const Login = () => {
  const { login } = UseUser()
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {

    try {
      const response = await authService.login(values.username, values.password,  { withCredentials: true });
      if (response&& response.token) {
        login(response.token, response.userData); 
        message.success('Inicio de sesión exitoso');
        console.log(response);
        navigate('/home'); // Redirige al path de HomePage
      }
    } catch (error) {
      message.error('Error en el inicio de sesión');
      console.error('There was an error logging in!', error);
    }
  };

  return (
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        style={{
          width: 300,
          padding: 20,
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
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
            Login
          </Button>
        </Form.Item>
      </Form>
  );
};


export default Login;
