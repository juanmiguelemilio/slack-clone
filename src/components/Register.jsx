import React, { useState } from 'react'
import { register } from '../api/auth'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './Login'
import logo from '../assets/slack-logo.svg'


const Register = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const [response, errors] = await register(
      email,
      password,
      passwordConfirmation
    )
    if (errors.length > 0) {
      setError(errors)
    } else {
      console.log('register response', response)
    }
    setIsLoading(false)
  }
    return (
        <div className='register-div'>
          <img className='slack-logo' src={logo} alt='slack logo'></img>
          <h2>Enter your email to register</h2>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes> 
            {isLoading ? (
                <p>Loading...</p>
            ) : (
              <div>
                <div>
                  <label className='login-label' htmlFor=''>Email </label>
                  <input
                    className='login-input email-inp'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className='login-label' htmlFor=''>Password </label>
                  <input
                    className='login-input email-inp'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className='login-label' htmlFor=''>Confirm Password </label>
                  <input
                    className='login-input email-inp'
                    type='password'
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </div>
                  
                </div>
            )}
            {error.lg}

            <button className='login-btn' onClick={handleRegister}>Submit</button>
            
            <div className='existing-user'>
              <p className='new-to-slack'>Already have an account?</p>
              <Link to='/'><span className='create-an-account'>Log in instead</span></Link>
            </div>
        </div>
    )
}

export default Register


