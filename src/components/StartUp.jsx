import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Register from './Register'
// import Dashboard from './Dashboard'
import Login from './Login'

const StartUp = () => {
    return (
        <div className='startup-div'>
            <Routes>
                <Route path="/register" element={<Register />} />
            </Routes> 

            <Login />

            <div className='new-user'>
                <p className='new-to-slack'>New to Slack?</p>
                <Link to='/Register'>Create an account</Link>
            </div>
        </div>
    )
}

export default StartUp
