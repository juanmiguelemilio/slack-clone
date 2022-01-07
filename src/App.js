import React from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import StartUp from './components/StartUp'
import UsersContextProvider from './context/UsersContextProvider'
import { useAuth } from './context/AuthContextProvider'
import ChannelContextProvider from './context/ChanneContextProvider'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'

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
          <Routes>
            {/* <Route path='/' element={redirectRoute} /> */}
            <Route path='dashboard' element={
									<PrivateRoute>
										<Dashboard />
									</PrivateRoute>}
            />
          </Routes>
          <StartUp />
        </BrowserRouter>
      </UsersContextProvider>
    </ChannelContextProvider> 
  </div>
  )
}

export default App
