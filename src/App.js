import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import StartUp from './components/StartUp'
import UsersContextProvider from './context/UsersContextProvider'

function App() {
    return (
    <div>      
      <UsersContextProvider>
        <BrowserRouter>
          <StartUp />
        </BrowserRouter>
      </UsersContextProvider>
    </div>
  )
}

export default App
