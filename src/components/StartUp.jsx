import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import Register from './Register'
import Dashboard from './Dashboard'
import Login from './Login'

const StartUp = () => {
    return (
        <div className='startup-div'>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Dashboard />} />
            </Routes> 

            <Login />

            <div className='new-user'>
                <p className='new-to-slack'>New to Slack?</p>
                <Link to='/register'>Create an account</Link>
            </div>
        </div>
    )
}

export default StartUp
