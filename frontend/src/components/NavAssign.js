import React from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useState,useEffect } from 'react';
import TraineeNavBar from '../components/TraineeNavBar.js'
import Navbar from './Navbar';
const NavAssign = () => {
    const { user } = useAuthContext();
    const [type,setType] = useState(false);
    useEffect(() => {
      
        if(user){
       
            const t = async () => {
             await fetch('/api/trainee/page/isTrainee/' , {
                method: 'GET', headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`

                }
            }).then((res) => {
                console.log('hiiiiiii')
               return res.json()
           }).then(data => {
            setType(true)
      console.log(data.isTrainee)
            })
          
      
       
      
        }
         t();
 }
 else
 setType(false)
 }, [user])


  return(<>  {type?<TraineeNavBar/>:<Navbar/>}</>
 
  )
};

export default NavAssign;