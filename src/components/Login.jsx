import React, { useState } from 'react'
import { login } from '../api/auth'
import { useAuth } from '../context/AuthContextProvider'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])
  const { dispatch } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await login(email, password)
    if (res.errors.length > 0) {
      setError(...res.errors)
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
    <div className='login-div'>
      <div>
        <h2>Sign in to your Slack</h2>
        <label htmlFor='email'>E-mail </label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail((t) => e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password </label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword((p) => e.target.value)}
        />
      </div>
      {error &&
					error.map((e, i) => (
						<span key={i} className='error'>
							{e}
						</span>
					))}
      <button onClick={(e) => handleLogin(e)}>Login</button>
    </div>
  )
}
export default Login
