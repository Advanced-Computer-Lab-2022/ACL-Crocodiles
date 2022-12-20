import React from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useState,useEffect } from 'react';
import TraineeNavBar from '../components/TraineeNavBar.js'
import Navbar from './Navbar';
import AdminNav from './AdminNav';
import InstructorNav from './InstructorNav';
const NavAssign = () => {
    const { user } = useAuthContext();
    const [type,setType] = useState('');
    useEffect(() => {
      if(user){
        if (user.Type === 'Trainee') {
            setType('Trainee')
        }
        else if (user.Type === 'Admin') {
            setType('Admin')
        }
        else if (user.Type === 'Instructor') {
            setType('Instructor')
        }
    }
    if(!user){
        setType('')
    }
//         if(user){
       
//             const t = async () => {
//              await fetch('/api/trainee/page/isTrainee/' , {
//                 method: 'GET', headers: {
//                     'content-type': 'application/json',
//                     'Authorization': `Bearer ${user.token}`

//                 }
//             }).then((res) => {
//                 console.log('hiiiiiii')
//                return res.json()
//            }).then(data => {
//             setType(true)
//       console.log(data.isTrainee)
//             })
          
      
       
      
//         }
//          t();
//  }
//  else
//  setType(false)
  }, [user])


  return(<>  {/*{type?<AdminNav/>:<Navbar/>}*/}
            {!user && <Navbar/>}
            {type=='Admin' && <AdminNav/>}
            {type=='Trainee' && <TraineeNavBar/>}
            {type=='Instructor' && <InstructorNav/>}
    </>
 
  )
};

export default NavAssign;