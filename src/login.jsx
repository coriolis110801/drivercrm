import React, { useState } from 'react';
import {getinfo, Login} from "./network";
import {Button, useToast} from "@chakra-ui/react";
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input";
import './style/login.css'
const LoginComponent = (props) => {
    const [username, setUsername] = useState('ceshi3@qq.com');
    const [password, setPassword] = useState('admin');
    const [error, setError] = useState(null);
    const toast = useToast();
    const handleLogin = async () => {
        toast({
            title: '登陆中。。。',
            isClosable: false,
        })
        try {
            const response = await Login({
                username,
                password
            })
            console.log('%c 测试', 'color:#fff; background:red')
            console.log(response)
            // response.driver=0
            // response.manager=1
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
            props.history.push('/info/home');
        } catch (e) {
            setError('登录失败，请检查用户名或密码.');
        }finally {
            setTimeout(()=>{
                toast.closeAll()
            },300)
        }
    }

    return (
        <div className="Login_box">
            <h2>Login</h2>
            <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input placeholder='Username' type="text" value={username} onChange={e => setUsername(e.target.value)}  />
                <div className='heng'></div>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />

            </FormControl>
            <div className='heng'></div>
            <Button style={{width:'100%'}} onClick={handleLogin}  colorScheme='blue' >Login</Button>
        </div>
    );
}

export default LoginComponent;
