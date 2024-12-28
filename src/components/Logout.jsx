import React from 'react';
import {useHistory} from "react-router-dom";
import { Button } from 'antd';

const Logout = () => {
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user_info');
        history.push('/login')
    }

    return (
        <div>
            <Button color="primary" variant="filled" onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default Logout;
