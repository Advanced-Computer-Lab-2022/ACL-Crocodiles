import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
import TraineeNavBar from "../components/TraineeNavBar.js";
import Home from "../pages/Home";
import TraineeHome from "../pages/TraineeHome";
import GuestHome from "../pages/GuestHome";
import AdminAddUser from "../pages/AdminAddUser"
import CorpHome from "../pages/CorpHome";
import InstructorHome from "../pages/InstructorHome";

const HomeAssign = () => {
  const { user } = useAuthContext();

  if (user) {
    switch (user.Type) {
      case "Trainee":
        return <TraineeHome />;
      case "Instructor":
        return <InstructorHome />;

      case "Admin":
        return <AdminAddUser />;
      case "Corporate":
        return <CorpHome />;
    }
  }

  return <GuestHome />;
};

export default HomeAssign;
