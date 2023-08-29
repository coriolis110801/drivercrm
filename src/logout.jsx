import React from 'react';
import {useHistory} from "react-router-dom";

const DashboardComponent = () => {
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user_info');
        history.push('/login')
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default DashboardComponent;
