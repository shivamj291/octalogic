import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Component/Home/Home'
import Courses from './Component/Courses/Courses'
import { Link, useNavigate } from 'react-router-dom'
import Routing from './Component/Route/Route'
import Login from './Component/Login/login'
import PrivateRoute from './Component/PrivateRoute/PrivateRoute'
import { ActionAuth } from './Store/Action'
function App() {

const nav = useNavigate();

const logOut = ()=>{
  ActionAuth(false);
  nav('/')
}
  return (
    
      <div>
        <div className='w-full flex'>
          <div className="w-28 h-screen p-2 border-r border-gray-300">
          <img src="Logo.png" className="m-auto mb-14 mt-2 " />
          <Link to ='/overview'><img src="Frame 4.png" className="m-auto my-3 cursor-pointer" /></Link>
          <Link to ='/course'><img src="Frame 5.png" className="m-auto cursor-pointer" /></Link>
          <img src="logout.png" className="m-auto cursor-pointer mt-64" onClick={logOut}/>
          
         
          
       </div>
         <Routing/>
        </div>
       
      </div>
    
  )
}

export default App
