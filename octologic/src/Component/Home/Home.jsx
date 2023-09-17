import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Store from '../../Store/Store';

export default function Home() {
    const[totalEarned,setTotalEarned] = useState('')
    const[totalStudent,setTotalStudent] = useState('')
    const[totalCourse,setTotalCourse] = useState('')
    const[best,setBest] = useState('');
    const[worst,setWorst] = useState('');
    const[alldata,setAlldata] = useState([])
    const[newEnroll,setNewEnroll] = useState([])
    const[filterByFees,setFilterByFess] = useState([])
    useEffect(()=>{
        getData();
    },[])

    async function getData(){
        const data = await axios.get('http://localhost:8080/AllData')
        console.log(data.data?.length)

        setAlldata(data.data)
        const sumOfFees = await data.data?.reduce((accumulator, entry) => {
          
            const Price = parseInt(entry.fees);
           
            return accumulator + Price;
        },0);

        
      // sort the array by Enrollment Date

      const filterByDate = [...data.data]
      console.log(filterByDate)
      const compareDates = (a, b) => {
        const dateA = new Date(a.enrolment_date);
        const dateB = new Date(b.enrolment_date);
      
        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
        return 0;
      };
  


    
      filterByDate.sort(compareDates);
      setNewEnroll(filterByDate.slice(0, 5))
      console.log(filterByDate,);

         //   sort the day by fees for best student
       
        const sortByFees = [...data.data];
        sortByFees.sort((a, b) => parseInt(b.fees) - parseInt(a.fees));
        setFilterByFess(sortByFees.slice(0,5))
        console.log(sortByFees)


         // set all data 

        var a = Store.getState();

        setTotalCourse(a.courseData.length)
        setTotalEarned(sumOfFees)
        setTotalStudent(data.data.length)
      

        // Map the array with Instrument and number of student
          const minStudentsByInstrument = {};
          a.courseData.forEach(course => {
          const instrument = course["Instrument"];
          const students = course["Students"];

          
          if (minStudentsByInstrument.hasOwnProperty(instrument)) {
              if (students < minStudentsByInstrument[instrument]) {
                  minStudentsByInstrument[instrument] = students;
              }
          } else {
              minStudentsByInstrument[instrument] = students;
          }
      });
      

    //   Best course
      let maxInstrument = "";
      let maxStudents = -1; 

      for (const instrument in minStudentsByInstrument ) {
          const students = minStudentsByInstrument[instrument];

          if (students > maxStudents) {
              maxStudents = students;
              maxInstrument = instrument;
          }
      }
      setBest(maxInstrument);

    //   worst course
      let minInstrument = "";
      let minStudents = Infinity; 

      for (const instrument in minStudentsByInstrument ) {
          const students = minStudentsByInstrument[instrument];

          if (students < maxStudents) {
              minStudents = students;
              minInstrument = instrument;
          }
      }

      
      setWorst(minInstrument)
  }
  return (
    <div className='bg-gray-100 w-full p-5'>
      <div>
      <h1 className="font-semibold text-gray-500 mx-8 mb-5 text-left" style={{fontSize:'29px'}}>
           Overview
        </h1>
        <div className='flex gap-4'>
            <div className='flex bg-white text-xs p-4'>
                 <img src="ic_baseline-people.png"alt="" className='w-8 h-8 m-auto'/>
                <span className='ml-5'>
                <p className='text-xl'>{totalStudent}</p>
                <p  className='text-gray-500'>Total number of Student</p>
                </span>
            </div>
            <div className='flex bg-white text-xs p-4'>
             <img src="ic_baseline-people.png"alt="" className='w-8 h-8 m-auto'/>
             <span className='ml-5'>
             <p className='text-xl'>{totalCourse}</p>
             <p  className='text-gray-500'>Total number of courses</p>
             </span>
            </div>
            <div className='flex bg-white text-xs p-4'>
                 <img src="ic_baseline-people.png"alt="" className='w-8 h-8 m-auto'/>
                <span className='ml-5'>
                <p className='text-xl'>{totalEarned}</p>
                <p  className='text-gray-500'>Total amount earned</p>
                </span>
            </div>
            <div className='flex bg-white text-xs p-4'>
                 <img src="ic_baseline-people.png"alt="" className='w-8 h-8 m-auto'/>
                <span className='ml-5'>
                <h2 className='text-xl'>{best}</h2>
                <p  className='text-gray-500'>best performing course</p>
                </span>
            </div>

            <div className='flex bg-white text-xs p-4'>
                 <img src="ic_baseline-people.png"alt="" className='w-8 h-8 m-auto'/>
                <span className='ml-5'>
                <h2 className='text-xl'>{worst}</h2>
                <p className='text-gray-500'>worst performing course</p>
                </span>
            </div>
       
        </div>


        {/* Latest Enrollment */}


        <h2 className="font-semibold text-lg text-gray-500 m-auto  my-7 text-left">
                LATEST ENROLLMENTS
            </h2>
        <div className="bg-white  p-4 rounded-lg mt-4 py-5 px-7 m-auto">
      
     <table className="w-full m-auto bg-white rounded-lg">
        <thead>
          <tr className=" border-b border-gray-300" >
            <th className="fontSize" >Enr.No.</th>
            <th className="fontSize"> S.Name</th>
            <th className="fontSize">C.Name</th>
            <th className="fontSize">Fees</th>
            <th className="fontSize"> Enr.Date</th>
          
          </tr>
        </thead>
        <tbody>
    
    
          {
              newEnroll?.map((ele)=>(
                  
                   <tr className=" border-b border-gray-300">
                     <td className="fontSize">{ele.enrolment_no}</td>
                     <td className="fontSize">{ele.student_name}</td>
                     <td className="fontSize">{ele.course_name}</td>
                     <td className="fontSize">{ele.fees}</td>
                     <td className="fontSize">{ele.enrolment_date}</td>
                  </tr>
              ))
          }
         
        </tbody>
      </table>
     </div>


     {/* top student */}

     <h2 className="font-semibold text-lg text-gray-500 m-auto  my-7 text-left">
                BEST STUDENTS
            </h2>
        <div className="bg-white  p-4 rounded-lg mt-4 py-5 px-7 m-auto">
      
     <table className="w-full m-auto bg-white rounded-lg">
        <thead>
          <tr className=" border-b border-gray-300" >
            <th className="fontSize" >Enr.No.</th>
            <th className="fontSize"> S.Name</th>
            <th className="fontSize">C.Name</th>
            <th className="fontSize">Fees</th>
            <th className="fontSize"> Enr.Date</th>
          
          </tr>
        </thead>
        <tbody>
    
    
          {
              filterByFees?.map((ele)=>(
                  
                   <tr className=" border-b border-gray-300">
                     <td className="fontSize">{ele.enrolment_no}</td>
                     <td className="fontSize">{ele.student_name}</td>
                     <td className="fontSize">{ele.course_name}</td>
                     <td className="fontSize">{ele.fees}</td>
                     <td className="fontSize">{ele.enrolment_date}</td>
                  </tr>
              ))
          }
         
        </tbody>
      </table>
     </div>
   
         <div>

         </div>
      </div>
    </div>
  )
}
