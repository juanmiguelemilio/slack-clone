import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='dashboard-div'>
            <div className=''>
                <Sidebar />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
