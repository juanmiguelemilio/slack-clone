import React from 'react'
import Channels from './Channels'
import DirectMessages from './DirectMessages'

const Dashboard = () => {
    return (
        <div className='dashboard-div'>
            <div className='sidebar-div'>
                <h2 className='username-greetings'>Hello Sidebar</h2>
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
