import React from 'react'
import Home from '../Home/Home'
import Courses from '../Courses/Courses'
import { Routes,Route } from 'react-router-dom'

export default function Routing() {
  return (
    <div className='w-full'>
       <Routes>
          <Route path="/overview" element={<Home/>} />
          <Route path="/" element={<Courses/>} />
       </Routes>
    </div>
  )
}
