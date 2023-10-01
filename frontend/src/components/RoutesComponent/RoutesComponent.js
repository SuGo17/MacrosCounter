import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Join from "../Join/Join";
import Login from "../Join/Login/Login";
import Signup from "../Join/Signup/Signup";
import ProtectRoute from "../../utils/Components/ProtectRoute";

function RoutesComponent() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectRoute>
              <></>
            </ProtectRoute>
          }
        />
        <Route path="/join" element={<Join />}>
          <Route path="/join/login" element={<Login />} />
          <Route path="/join/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComponent;
