import React, { useState } from 'react'
import { login } from '../api/slack-api'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])
  const [flash, setFlash] = useState('')

  const handleLogin = async () => {
    const [response, error] = await login(email, password)
    if (error.length) {
      setError(error)
    } else {
      console.log('login response', response)
      setFlash('Successful login')
    }
  }

  return (
    <div>
      <div>
        <label htmlFor=''>email:</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor=''>password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error.lg}
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
export default Login
