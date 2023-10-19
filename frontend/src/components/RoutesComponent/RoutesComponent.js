import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Join from "../Join/Join";
import Login from "../Join/Login/Login";
import Signup from "../Join/Signup/Signup";
import ProtectRoute from "../../utils/Components/ProtectRoute";
import AccountComponent from "../Account/AccountComponent";
import ProfileComponent from "../Account/Profile/ProfileComponent";
import AdminPanel from "../AdminPanel/AdminPanel";

function RoutesComponent() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* prettier-ignore */}
        <Route exact path="/" element={<ProtectRoute><></></ProtectRoute>}/>
        {/* prettier-ignore */}
        <Route path="/account" element={<ProtectRoute><AccountComponent /></ProtectRoute>}>
          <Route path="/account/profile" element={<ProfileComponent />} />
          <Route path="/account/change-password" />
        </Route>
        <Route path="/join" element={<Join />}>
          <Route path="/join/login" element={<Login />} />
          <Route path="/join/signup" element={<Signup />} />
        </Route>
        {/* prettier-ignore */}
        <Route path="/admin-panel" element={<ProtectRoute admin={true}><AdminPanel/></ProtectRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComponent;
