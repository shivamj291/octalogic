import axios from "axios";
import React, { useDebugValue, useEffect, useRef, useState } from "react";
import { ActionCourse } from "../../Store/Action";

export default function Courses() {
  const [state, setState] = useState([]);
  const [data,setData] = useState([])
  const [hover,setHover] = useState(false)
  const [flag,setFlag] = useState(false);
  const [isflag,setIsFlag] = useState(false);
  const [input,setInput] = useState({
    course_Name: "",
    Description: "",
    Instructor: "",
    Instrument: "",
    Day_of_Week: "",
    Price: "",
  })
 
  const reff = useRef(null)
  const ref_b = useRef(null)
  const ref_d = useRef(null)

  useEffect(() => {
    getData();
  }, []);

console.log(flag)
  function call(str){
    const splitStr = str.split(' ')
    if(splitStr.length > 2){
      return splitStr.slice(0,2).join(' ') + '...';
    }
     else{
      return str
     }
  }


 

  async function getData() {
   
    const data = await axios.get("http://localhost:8080/CourseData");
    await ActionCourse(data.data)
    await setData(data.data)
    setState(data.data)
  }
//display form 

function displayForm(){
  reff.current.setAttribute('style','background:rgb(200, 199, 199)')
  ref_b.current.setAttribute('style','background:rgb(200, 199, 199)')
  ref_d.current.setAttribute('style','background:rgb(200, 199, 199)')
  setFlag(true)
}
// hide form 

function hideForm(){
  reff.current.setAttribute('style','background:unset')
  ref_b.current.setAttribute('style','background:#f3f4f6')
  ref_d.current.setAttribute('style','background:white')
  setFlag(false)
}
  // display box

  const displayBox =(ele)=>{
  
    reff.current.setAttribute('style','background:rgb(200, 199, 199)')
    ref_b.current.setAttribute('style','background:rgb(200, 199, 199)')
    ref_d.current.setAttribute('style','background:rgb(200, 199, 199)')
 const updatedCourseData = [];
 state?.map((course) => {
    if (course.id === ele.id) {
   
     updatedCourseData.push({ ...course, flag:true });
    } else {
      updatedCourseData.push(course);
    }
  }); 
  setHover(true)
  setState(updatedCourseData); 
}




  

  
  const hideBox =()=>{
    reff.current.setAttribute('style','background:unset')
    ref_b.current.setAttribute('style','background:#f3f4f6')
    ref_d.current.setAttribute('style','background:white')
    console.log(data)
    setHover(false)
    setState(data)

  }

  async function addData() {
    const PostData = {...input}
    console.log(PostData)
    const data = await axios.post("http://localhost:8080/courseData",PostData);
    getData();
  }


  // search 



function searchCourses(keyword) {
  
  keyword = keyword.toLowerCase();

  const filterArr =  state?.filter(course => {
   
    return Object.values(course).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(keyword);
      }
      return false;
    });
  
   
  });
  console.log(filterArr)
  if(keyword===''){
    setState(data)
  }else{
    setState(filterArr)
  }


  function changeflag(){
        setFlag(true);
        setIsFlag(true)
  }
    

  // display box

  
}









  return (
    <div className="w-full pt-6 bg-gray-100" ref={ref_b} onClick={hover&&hideBox}>
   
      <div className="w-full " onClick={()=>isflag&&setFlag(false)}>
        <h1 className="font-semibold text-gray-500 ml-10 mb-8  text-left" style={{fontSize:'29px'}}>
          Courses
        </h1>
        <div className="flex justify-between space-x-4">
            <h2 className="font-semibold text-lg text-gray-500 m-auto ml-10 text-left">
                 COURSE LIST
            </h2>
            <span> <input type="text" placeholder='Search' className="w-10/12 text-sm px-7 py-1"  onChange={(e)=>searchCourses(e.target.value)}/></span>
           
        </div>
       
       <div className="bg-white w-11/12 rounded-lg mt-4 py-5 px-7 m-auto" ref={ref_d}>
     
       <table className="w-full m-auto bg-white rounded-lg" ref={reff} onClick={hideForm}>
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
                state.slice(0,10)?.map((ele)=>(
        
                     <tr className=" border-b border-gray-300">
                       <td className="fontSize">{ele.course_Name}</td>
                       <td className="fontSize">{call(ele.Description)}</td>
                       <td className="fontSize">{ele.Instructor}</td>
                       <td className="fontSize">{ele.Instrument}</td>
                       <td className="fontSize">{ele.Day_of_Week}</td>
                       <td className="fontSize">{ele.Students}</td>
                       <td className="fontSize">{ele.Price}</td>
                       <td className="fontSize"><button className=" px-4 bg-green-100 rounded-lg text-gray-500 text-sm">{ele.Status}</button></td>
                       <td className="fontSize relative"><img src='menu.png' className="w-4 m-auto cursor-pointer"  onClick={()=>!hover&&displayBox(ele)}  />
                       <div className="bg-white w-40 p-2 text-sm absolute -left-32 top-4" style={ele.flag ? {display:'block'} : {display:'none'}}>
                          <div >
                            <p className="cursor-pointer" onClick={()=>setStatus('Active')}>Edit Course</p>
                            <p className="cursor-pointer" onClick={()=>setStatus('Closed')}>Close Course</p>
                            <p className="cursor-pointer" onClick={()=>setStatus('Archieve')}>Archieve Course</p>
                          </div>
                      </div></td>
                       
                    </tr>
                ))
            }
           
          </tbody>
        </table>
       </div>
     
        <div className="flex justify-end backdrop" onClick={displayForm}>
             <button className='bg-red-200 text-2xl px-5 py-3 mt-40 mr-10 rounded-lg' >+ <span className="text-xl">Add Course</span></button>
        </div>

        {/* display:none */}

        <form className="form w-5/12 bg-gray-600 py-5 m-auto p-8 absolute top-32 right-1/4 fixed" style={flag ? {display:'block'} :{display:'none'}}>
            <span className="flex justify-start text-2xl mb-3">Add Course</span>
         <input type="text" name="" id="" placeholder="Course Name" className="fontsizeinput border border-gray-300 w-full m-1 text-xs rounded" onChange={(e)=>setInput({...input,course_Name:e.target.value})}/><br/>
         <input type="text" name="" id="" placeholder="Description" className="fontsizeinput border border-gray-300 w-full m-1 text-left text-xs rounded" onChange={(e)=>setInput({...input,Description:e.target.value})}/><br/>
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
