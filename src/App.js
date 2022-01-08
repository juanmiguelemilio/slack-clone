import React from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import { useAuth } from './context/AuthContextProvider'
import ChannelContextProvider from './context/ChanneContextProvider'
import UsersContextProvider from './context/UsersContextProvider'

import StartUp from './components/StartUp'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
// import Login from './components/Login'
import Register from './components/Register'
import DirectMessages from './components/DirectMessages'
import Channels from './components/Channels'

function App() {
  const { state } = useAuth();
  let redirectRoute;
  if (state.login) {
    redirectRoute = <Navigate replace to='/dashboard' />;
  } else {
    redirectRoute = <StartUp />;
  }
  return (
  <div>
    <ChannelContextProvider>    
      <UsersContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={redirectRoute} />
            <Route path='dashboard' element={
									<PrivateRoute>
										<Dashboard />
									</PrivateRoute>}
            />
            <Route path="/channels/:id" element={<Channels />} />
            <Route path="/messages/:id" element={<DirectMessages />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <StartUp />
        </BrowserRouter>
      </UsersContextProvider>
    </ChannelContextProvider> 
  </div>
  )
}

export default App
