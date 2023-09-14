import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Login(){
    const [input,setInput] = useState({
        email:'',
        password:''
    })
    const nav = useNavigate();
    function log_in(e){
          e.preventDefault();
          if(input.email == 'shivam123@gmail.com' && input.password == 'shivam'){
            nav('/')
          }else{
            nav('/login')
          }
    }


    return(<div className="m-20  bg-red-100" onSubmit={(e)=>log_in(e)}>
          <form className="form w-5/12 py-5 m-auto p-8 border" >
            <span className="flex justify-start text-2xl mb-3 text-black">Log in</span>
         <input type="text" name="" id="" placeholder="Email" className="fontsizeinput border border-gray-300 w-full m-1 text-xs rounded" onChange={(e)=>setInput({...input,email:e.target.value})}/><br/>
         <input type="text" name="" id="" placeholder="Password" className="fontsizeinput border border-gray-300 w-full m-1 text-left text-xs rounded" onChange={(e)=>setInput({...input,password:e.target.value})}/><br/>
         
          <input type="submit" name="" id="" className="bg-gray-200 rounded px-3 py-1 ml-1"/>
         
      </form>
    </div>)


}

export default Login