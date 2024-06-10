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

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <img src="http://metservice.intnet.mu/images/mms-logo.png" alt="Logo" style={logoStyle} />
        <h2 style={titleStyle}>Registrarse</h2>
        <Form
          form={form}
          name="register"
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
              Registrarse
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
  margin: 0,
  padding: 0,
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