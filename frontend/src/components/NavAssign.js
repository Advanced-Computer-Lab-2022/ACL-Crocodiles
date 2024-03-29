import React from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useState,useEffect } from 'react';
import TraineeNavBar from '../components/TraineeNavBar.js'
import Navbar from './Navbar';
import AdminNav from './AdminNav';
import InstructorNav from './InstructorNav';
import CorpNav from './CorpNav';
import GuestNav from './GuestNav';

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
        else if (user.Type === 'Corporate') {
            setType('Corporate')
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
            {!user && <GuestNav/>}
            {type==='Admin' && <AdminNav/>}
            {type==='Trainee' && <TraineeNavBar/>}
            {type==='Instructor' && <InstructorNav/>}
            {type==='Corporate' && <CorpNav/>}
    </>
 
  )
};

export default NavAssign;