import React from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useState,useEffect } from 'react';
import TraineeNavBar from '../components/TraineeNavBar.js'
import Navbar from './Navbar';
const NavAssign = () => {
    const { user } = useAuthContext();
   
        if(user){
          switch (user.Type) {
              case 'Trainee':
                return (<TraineeNavBar/>);
              case 'Instructor':
                  return (<Navbar/>);
         
              case 'Admin':
                 return (<Navbar/>)
              case 'Corporate':
                  return (<Navbar/>)
          
            }
        }
    
      


  return(<Navbar/>)
};

export default NavAssign;