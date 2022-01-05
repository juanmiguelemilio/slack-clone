import React, { useState } from 'react'
import { login } from '../api/slack-api'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])

  const handleLogin = async () => {
    const [response, error] = await login(email, password)
    if (error.length) {
      setError(error)
    } else {
      dispatch({
				type: 'LOGIN',
				payload: {
					id: res.data.id,
					user: res.data,
					headers: res.headers,
				},
			});
		}
  }

  return (
    <div>
      <div>
        <label htmlFor='email'>E-mail </label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password </label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error.lg}
      <button onClick={handleLogin(e)}>Login</button>
    </div>
  )
}
export default Login
