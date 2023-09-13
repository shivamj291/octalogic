import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Store from '../../Store/Store';

export default function Home() {
    const[totalEarned,setTotalEarned] = useState('')
    const[totalStudent,setTotalStudent] = useState('')
    const[totalCourse,setTotalCourse] = useState('')
    const[best,setBest] = useState('');
    const[worst,setWorst] = useState('');
    useEffect(()=>{
        getData();
        
    },[])

    async function getData(){
        const data = await axios.get('http://localhost:8080/AllData')
        console.log(data.data?.length)
        const sumOfFees = await data.data?.reduce((accumulator, entry) => {
          
            const Price = parseInt(entry.fees);
           
            return accumulator + Price;
        },0);

        var a = Store.getState();
        setTotalCourse(a.courseData.length)
        setTotalEarned(sumOfFees)
        setTotalStudent(data.data.length)
      
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
      
      let maxInstrument = "";
      let maxStudents = -1; 

      for (const instrument in minStudentsByInstrument ) {
          const students = minStudentsByInstrument[instrument];

          if (students > maxStudents) {
              maxStudents = students;
              maxInstrument = instrument;
          }
      }
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

      setBest(maxInstrument);
  }
  return (
    <div className='bg-gray-100 w-full h-screen'>
      <div>
      <h1 className="font-semibold text-gray-500 m-8 mt-5 text-left" style={{fontSize:'29px'}}>
           Overview
        </h1>
        <div className='flex gap-10'>
            <div className='flex bg-white px-5 py-7 text-xs '>
                <img src="ic_baseline-people.png"alt=""/>
                <span className='ml-5'>
                <p>{totalStudent}</p>
                <p>Total number of Student</p>
                </span>
            </div>
            <div className='flex bg-white px-5 py-7 text-xs '>
             <img src="ic_baseline-people.png"alt=""/>
             <span className='ml-5'>
             <p>{totalCourse}</p>
             <p>Total number of courses</p>
             </span>
            </div>
            <div className='flex bg-white px-5 py-7 text-xs '>
                <img src="ic_baseline-people.png"alt=""/>
                <span className='ml-5'>
                <p>{totalEarned}</p>
                <p>Total amount earned</p>
                </span>
            </div>
            <div className='flex bg-white px-5 py-7 text-xs '>
                <img src="ic_baseline-people.png"alt=""/>
                <span className='ml-5'>
                <h2 className='text-xl'>{best}</h2>
                <p>best performing course</p>
                </span>
            </div>

            <div className='flex bg-white px-5 py-7 text-xs '>
                <img src="ic_baseline-people.png"alt=""/>
                <span className='ml-5'>
                <h2 className='text-xl'>{worst}</h2>
                <p>worst performing course</p>
                </span>
            </div>
       
        </div>
   

      </div>
    </div>
  )
}
