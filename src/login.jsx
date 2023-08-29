import React, { useState } from 'react';
import {getinfo, Login} from "./network";
import {useToast} from "@chakra-ui/react";

const LoginComponent = (props) => {
    const [username, setUsername] = useState('ceshi3@qq.com');
    const [password, setPassword] = useState('admin');
    const [error, setError] = useState(null);
    const toast = useToast();
    const handleLogin = async () => {
        try {
            const response = await Login({
                username,
                password
            })
            console.log('%c 测试', 'color:#fff; background:red')
            console.log(response)
            getinfo()
            localStorage.setItem('access', response.access);
            localStorage.setItem('refresh', response.refresh);
            localStorage.setItem('user_info', JSON.stringify(response));
            toast({
                title: '登陆成功。。。',
                status: 'success',
                duration: 1000,
                isClosable: false,
            })
            props.history.push('/home');
        } catch (e) {
            setError('登录失败，请检查用户名或密码.');
        }
    }

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginComponent;
