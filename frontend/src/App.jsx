import React from 'react'
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import RegisterRoom from './components/Admin/RegisterRoom'


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/register" element={<RegisterRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
