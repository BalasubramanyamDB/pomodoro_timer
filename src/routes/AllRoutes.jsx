import React from "react";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { LandingPage, Login, Signup, Tasks, Timer } from "../pages";

function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:taskId" element={<Timer />} />
        <Route element={<RequireAuth isLoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default AllRoutes;
