import React from 'react'
import SignIn from './SignIn'
import { Route, Routes } from 'react-router-dom'
import Register from './Register'
import Dashboard from './Dashboard'

const StartUp = () => {
    return (
        <div className='startup-div'>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes> 

            <SignIn />

            <div className='new-user'>
                <p className='new-to-slack'>New to Slack?</p>
                <a href='http://localhost:3000/Register'>Create an account</a>
            </div>
        </div>
    )
}

export default StartUp
