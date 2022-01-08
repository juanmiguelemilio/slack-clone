import React, { useState } from 'react'
import { login } from '../api/auth'
import { useAuth } from '../context/AuthContextProvider'
import logo from '../assets/slack-logo.svg'
import { Link } from 'react-router-dom'


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
      <img className='slack-logo' src={logo} alt='slack logo'></img>
      <h2>Sign in to your Slack</h2>
      
      <div className='login-inner-div'>
        <label className='login-label' htmlFor='email'>Email </label>
        <input
          className='login-input email-inp'
          type='email'
          value={email}
          onChange={(e) => setEmail((t) => e.target.value)}
        />
        <div>
        <label className='login-label' htmlFor='password'>Password </label>
        <input
          className='login-input password-inp'
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
      </div>

      <div>
        <button className='login-btn' onClick={(e) => handleLogin(e)}>Login</button>
      </div>
      <div className='new-user'>
        <p className='new-to-slack'>New to Slack?</p>
        <Link to='/register'><span className='create-an-account'>Create an account</span></Link>
      </div>
      
    </div>
  )
}
export default Login
