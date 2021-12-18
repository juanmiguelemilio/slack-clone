import React, { useState } from 'react'
import { register } from './api/slack-api'
import Login from './components/Login'

const API_URL = 'https://slackapi.avionschool.com/api/v1'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState([])
  const [flash, setFlash] = useState('')
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
      setFlash('Successful register')
    }
    setIsLoading(false)
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading ....</p>
      ) : (
        <div>
          Registration
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
          <div>
            <label htmlFor=''>repeat password</label>
            <input
              type='password'
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <button onClick={handleRegister}>register</button>
        </div>
      )}
      {error.length ? error.map((err) => <p>{err}</p>) : null}
      {flash && <p>{flash}</p>}

      <div>
        Login
        <Login />
      </div>
    </div>
  )
}

export default App
