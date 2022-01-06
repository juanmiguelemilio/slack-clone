import React from 'react'
import { BrowserRouter, Navigate } from 'react-router-dom'
import StartUp from './components/StartUp'
import UsersContextProvider from './context/UsersContextProvider'
import { useAuth } from './context/AuthContextProvider'
import ChannelContextProvider from './context/ChanneContextProvider'

function App() {
  const { state } = useAuth();
  let redirectRoute;
  if (state.login) {
    redirectRoute = <Navigate replace to='dashboard' />;
  } else {
    redirectRoute = <StartUp />;
  }
  return (
  <div>
    <ChannelContextProvider>    
      <UsersContextProvider>
        <BrowserRouter>
          <StartUp />
        </BrowserRouter>
      </UsersContextProvider>
    </ChannelContextProvider> 
  </div>
  )
}

export default App
