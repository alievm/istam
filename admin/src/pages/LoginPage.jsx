import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Alert } from 'antd';

const LoginPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const { username, password } = values;
        try {
            // Отправляем запрос на логин
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            // Сохраняем токен в localStorage
            localStorage.setItem('token', response.data.token);
            // Перенаправляем на главную страницу после успешного логина
            navigate('/');
        } catch (error) {
            setError('Неверный логин или пароль');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
            <h2>Login</h2>
            {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '20px' }} />}
            <Form
                name="login_form"
                onFinish={handleSubmit}
                initialValues={{
                    remember: true,
                }}
                layout="vertical"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        type="text"
                        placeholder="Enter your username"
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        placeholder="Enter your password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;
