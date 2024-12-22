import "./App.css";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddContact from "./pages/contacts/add-contact";
import EditContact from "./pages/contacts/edit-contact";
import ViewContact from "./pages/contacts/view-contact";
import AdminContact from "./pages/contacts/admin-contact";
import ShowContact from "./pages/contacts/show-contact";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path={'/contact_manager'} element={<Navigate to={'/show-contact'}/>}/>
          <Route path={'/'} element={<Navigate to={'/show-contact'}/>}/>
          <Route path={'/add-contact'} element={<AddContact/>}/>
          <Route path={'/edit-contact/:contactId'} element={<EditContact/>}/>
          <Route path={'/view-contact/:contactId'} element={<ViewContact/>}/>
          <Route path={'/admin-contact'} element={<AdminContact/>}/>
          <Route path={'/show-contact'} element={<ShowContact/>}/>
          {/* <Route path={'/*'} element={<ShowContact/>}/> */}
        </Routes>
      </BrowserRouter>

    {/* another way to do navigate pages */}
      {/* <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/add-contact'} element={<AddContact/>}/>
            <Route path={'/edit-contact/:contactId'} element={<EditContact/>}/>
            <Route path={'/view-contact/:contactId'} element={<ViewContact/>}/>
            <Route path={'/admin-contact'} element={<AdminContact/>}/>
            <Route path={'/show-contact'} element={<ShowContact/>}/>
          </Routes>
        </BrowserRouter> */}
    </>
  );
};

export default App;
