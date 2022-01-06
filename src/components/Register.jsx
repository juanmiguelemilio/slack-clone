import React, { useState } from 'react'
import { register } from '../api/auth'

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
            {isLoading ? (
                <p>Loading ....</p>
            ) : (
                <div>
                <h2>Register</h2>
                <div>
                    <label htmlFor=''>E-mail </label>
                    <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor=''>Password </label>
                    <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor=''>Confirm Password </label>
                    <input
                    type='password'
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                </div>
                <button onClick={handleRegister}>register</button>
                </div>
            )}
            {error.lg}
        </div>
    )
}

export default Register


