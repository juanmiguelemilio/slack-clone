import React from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import { useAuth } from './context/AuthContextProvider'
import ChannelContextProvider from './context/ChannelContextProvider'
import UsersContextProvider from './context/UsersContextProvider'

import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import Register from './components/Register'
import DirectMessage from './components/DirectMessage'
import Channels from './components/Channel'
import Login from './components/Login'
import CreateChannel from './components/CreateChannel'
import Messages from './components/Messages'


function App() {
  const { state } = useAuth();
  let redirectRoute;
  if (state.login) {
    redirectRoute = <Navigate replace to='/dashboard' />;
  } else {
    redirectRoute = <Login />;
  }
  return (
  <div>
    <ChannelContextProvider>    
      <UsersContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={redirectRoute} />
            <Route
              path='dashboard'
              element={
                <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
            >
              <Route
                    path=''
                    element={<CreateChannel />}/>
              <Route
                    path='channels/:id'
                    element={<Channels />}/>
              <Route
                    path='messages/:id'
                    element={<Messages />}/>
              <Route
                    path='messages/'
                    element={<DirectMessage />}/>
              </Route>
              <Route
                path='register'
                element={
                  state.login ? (
                    <Navigate
                      replace={false}
                      to='/dashboard' />
                    ) : (
                      <Register />
                    )}/>
          </Routes>
        </BrowserRouter>
      </UsersContextProvider>
    </ChannelContextProvider> 
  </div>
  )
}

export default App
