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
        navigate('/Estadisticas'); // Redirige al path de HomePage
      }
    } catch (error) {
      message.error('Error en el inicio de sesión');
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
      <img src="http://metservice.intnet.mu/images/mms-logo.png" alt="Logo" style={logoStyle} />
        <h2 style={titleStyle}>Iniciar Sesión</h2>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          style={formStyle}
        >
          <Form.Item
            name="username"
            label="Nombre de Usuario"
            rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Contraseña"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={buttonStyle}>
              Ingresar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: '#05F2F2',
};

const cardStyle = {
  width: 300,
  padding: 30,
  background: '#fff',
  borderRadius: 10,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const logoStyle = {
  width: 80,
  height: 100,
  marginBottom: 20,
};


const titleStyle = {
  marginBottom: 20,
  color: '#F28705',
};

const formStyle = {
  width: '100%',
};

const buttonStyle = {
  width: '100%',
};



export default Login;
