import React from 'react'
import SignIn from './SignIn'
import { Route, Routes, Link } from 'react-router-dom'
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
                <Link to='/register'>Create an account</Link>
            </div>
        </div>
    )
}

export default StartUp
