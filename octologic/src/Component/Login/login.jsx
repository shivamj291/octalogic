import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ActionAuth } from "../../Store/Action";

function Login(){
    const [input,setInput] = useState({
        email:'',
        password:''
    })
    const nav = useNavigate();
    function log_in(e){
          e.preventDefault();
          if(input.email == 'shivam123@gmail.com' && input.password == 'shivam'){
            ActionAuth(true);
            nav('/course')
          }else{
            alert('Enter correct Email && Password')
            nav('/')
          }
    }


    return(<div className=" w-6/12 p-20 bg-teal-500 m-auto flex" onSubmit={(e)=>log_in(e)}>
          <form className="bg-teal-300 w-10/12 py-5 m-auto p-8 border" >
            <span className="flex justify-start text-2xl mb-3 text-black">Log in</span>
         <input type="text" name="" id="" placeholder="Email" className="fontsizeinput border border-gray-300 w-full m-1 text-xs rounded" onChange={(e)=>setInput({...input,email:e.target.value})} required/><br/>
         <input type="text" name="" id="" placeholder="Password" className="fontsizeinput border border-gray-300 w-full m-1 text-left text-xs rounded" onChange={(e)=>setInput({...input,password:e.target.value})} required/><br/>
         
          <input type="submit" name="" id="" className="bg-gray-200 rounded px-3 py-1 ml-1 cursor-pointer text-black"/>
         
      </form>
    </div>)


}

export default Login