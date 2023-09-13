import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [state, setState] = useState([]);
  const [input,setInput] = useState({
    course_Name: "",
    Description: "",
    Instructor: "",
    Instrument: "",
    Day_of_Week: "",
    Price: "",
  })
  console.log(input)

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
   
    const data = await axios.get("http://localhost:8080/data");
   
    setState(data.data)
    
  }

  async function addData() {
    const PostData = {...input}
    console.log(PostData)
    const data = await axios.post("http://localhost:8080/courseData",PostData);
    getData();
  }
  return (
    <div className="flex w-full">
      <div className="w-28 h-screen p-2 border-r border-gray-300">
        <img src="Logo.png" className="m-auto mb-14 mt-2 " />
        <img src="Frame 4.png" className="m-auto my-3" />
        <img src="Frame 5.png" className="m-auto" />
      </div>
      <div className="w-full bg-gray-100">
        <h1 className="font-semibold text-gray-500 m-8 mt-5 text-left" style={{fontSize:'29px'}}>
          Courses
        </h1>
        <div className="flex justify-between space-x-4">
            <h2 className="font-semibold text-lg text-gray-500 m-auto ml-8 text-left">
                 COURSE LIST
            </h2>
            <span> <input type="text" placeholder='search' className="w-10/12 text-lg px-7 py-1" /></span>
           
        </div>
       
       <div className="bg-white w-full rounded-lg mt-4 py-5 px-7 m-auto">
     
       <table className="w-full m-auto bg-white rounded-lg">
          <thead>
            <tr className=" border-b border-gray-300" >
              <th className="fontSize" >Name</th>
              <th className="fontSize"> Description</th>
              <th className="fontSize">Instructor</th>
              <th className="fontSize">Instrument</th>
              <th className="fontSize"> Day of Week</th>
              <th className="fontSize"> # of Students</th>
              <th className="fontSize">Price</th>
              <th className="fontSize">Status</th>
              <th className="fontSize">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                state?.map((ele)=>(
        
                     <tr className=" border-b border-gray-300">
                       <td className="fontSize">{ele.Name}</td>
                       <td className="fontSize">{ele.Description}</td>
                       <td className="fontSize">{ele.Instructor}</td>
                       <td className="fontSize">{ele.Instrument}</td>
                       <td className="fontSize">{ele.Day_of_Week}</td>
                       <td className="fontSize">{ele.Students}</td>
                       <td className="fontSize">{ele.Price}</td>
                       <td className="fontSize"><button className=" px-4 bg-green-100 rounded-lg">{ele.Status}</button></td>
                       <td className="fontSize"><img src='menu.png' className="w-4 m-auto cursor-pointer" /></td>
                    </tr>
                  
                   

                ))
            }
           
          </tbody>
        </table>
       </div>
     
        <div className="flex justify-end backdrop">
             <button className='bg-red-200 text-2xl px-5 py-3 mt-40 mr-10 rounded-lg' onClick={addData}>+ <span className="text-xl">Add Course</span></button>
        </div>

        {/* display:none */}

        <form className="form w-5/12 bg-gray-600 py-5 m-auto p-8" >
            <span className="flex justify-start text-2xl mb-3">Add Course</span>
         <input type="text" name="" id="" placeholder="Course Name" className="fontsizeinput border border-gray-300 w-full m-1 text-xs rounded" onChange={(e)=>setInput({...input,course_Name:e.target.value})}/><br/>
         <input type="text" name="" id="" placeholder="Description" className="fontsizeinput border border-gray-300 w-full m-1 text-xs rounded" onChange={(e)=>setInput({...input,Description:e.target.value})}/><br/>
         <input type="text" name="" id="" placeholder="Instructure" className="fontsizeinput border border-gray-300 w-full m-1 text-xs rounded" onChange={(e)=>setInput({...input,Instructor:e.target.value})}/><br/>

         
         

         <select name="" id="" className="fontsizeinput border border-gray-300 w-full m-1 text-xs rounded text-gray-400" onChange={(e)=>setInput({...input,Instrument:e.target.value})}>
            <option value="music">Music</option>
            <option value="violin">Violin</option>
            <option value="guitar">Guitar</option>
            <option value="piano">Piano</option>
         </select>

         <select name="" id="" className="fontsizeinput border border-gray-300 w-full m-1 text-xs rounded text-gray-400" onChange={(e)=>setInput({...input,Day_of_Week:e.target.value})}>
            <option value="sunday">Sunday</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
         </select>
         

         <input type="text" name="" id=""  placeholder="price" className="fontsizeinput border border-gray-300 w-full m-1   text-xs rounded" onChange={(e)=>setInput({...input,Price:e.target.value})}/><br/>
         <div className="flex justify-end">
           <span className="fontSizeadd_or_cancel my-auto">cancel</span><input type="submit" name="" id="" value='Add Course'  className="fontSizeadd_or_cancel bg-red-200 px-2 py-1 rounded my-3 ml-5" />
         </div>
      </form>

      {/* //// */}
      </div>


     

    </div>
  );
}
