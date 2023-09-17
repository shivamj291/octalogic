import React from 'react'
import Home from '../Home/Home'
import Courses from '../Courses/Courses'
import { Routes,Route } from 'react-router-dom'
import Login from '../Login/login'
import PrivateRoute from '../PrivateRoute/PrivateRoute'

export default function Routing() {
  return (
    <div className='w-full'>
       <Routes>
          <Route path="/overview" element={<PrivateRoute><Home/></PrivateRoute>} />
          <Route path="/course" element={<PrivateRoute><Courses/></PrivateRoute>} />
          <Route path="/" element={<Login/>} />
       </Routes>
    </div>
  )
}
