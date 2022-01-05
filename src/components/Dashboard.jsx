import React from 'react'

const Dashboard = () => {
    return (
        <div className='dashboard-div'>
            <div className='sidebar-div'>
                <h2 className='username-greetings'>Hello Sidebar</h2>
                <div className='channel-div'>
                    <p>Channel 1</p>
                    <button>Add channel</button>
                </div>
                <div className='direct-message-div'>
                    <p>DM 1</p>
                </div>
            </div>
            <div className='chl-msg-container'>
                <h2 className='chl-msg'>Hello Channel / Message Container</h2>
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
