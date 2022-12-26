import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
import TraineeNavBar from "../components/TraineeNavBar.js";
import Home from "../pages/Home";
import TraineeHome from "../pages/TraineeHome";
import GuestHome from "../pages/GuestHome";
const HomeAssign = () => {
  const { user } = useAuthContext();

  if (user) {
    switch (user.Type) {
      case "Trainee":
        return <TraineeHome />;
      case "Instructor":
        return <Home />;

      case "Admin":
        return <Home />;
      case "Corporate":
        return <Home />;
    }
  }

  return <GuestHome />;
};

export default HomeAssign;
