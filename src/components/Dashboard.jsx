import React from 'react'
import { useAuth } from '../context/AuthContextProvider'
import Channels from './Channels'
import DirectMessages from './DirectMessages'

const Dashboard = () => {
    const { dispatch } = useAuth()
    const handleLogout = async (e) => {
        return dispatch({
            type: 'LOGOUT',
        });
    }

    return (
        <div className='dashboard-div'>
            <div className='sidebar-div'>
                <div className='user-header-div'>
                    <h2 className='username-greetings'>Hello Sidebar</h2>
                    <button className='logout-btn' onClick={(e) => handleLogout(e)}>Logout</button>
                </div>
                
                <div className='channel-div'>
                    <Channels />
                    
                </div>
                <div className='direct-message-div'>
                    <DirectMessages />
                </div>
            </div>
            <div className='chl-msg-container'>
                <h2 className='chl-msg'>Message Container</h2>
                    <div>
                        <input placeholder='Search'></input>
                    </div>
                    <div>
                        <input placeholder='Message Channel #'></input>
                    </div>
            </div>
        </div>
    )
}

export default Dashboard
