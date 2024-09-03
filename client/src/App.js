import React from "react";
import { BrowserRouter as Router, Routes,Switch, Route } from "react-router-dom";

import ErrorPage from "./ErrorPage";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import EditContectData from "./components/EditContectData";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Registration from "./components/SignUp";
import Logout from "./components/Logout";
import { useAuth } from "./store/auth";
import DashBord from "./components/Dashboard";
import './App.css';
import Home from "./components/Home";
// import Compp from "./components/ReactPractice/Compp";
const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };
  const {getToken} = useAuth()
  
  console.log(getToken);
  return (
    <>
    <h1>this is the first hange in my github repo</h1>
       <p>user made second modifiction</p>
    <ThemeProvider theme={theme}>

      <Router>
        <GlobalStyle />
        <div>
        <Header/>
        {/* <Slidear/> */}
        <Routes>
       
        <Route path="/" element = {<Home/> } />
        
        <Route path="/home" element = {<Home/> } />
          <Route path="/logout" element = {<Logout/> } />
          <Route path="/edit" element = {<EditContectData/> } />
          <Route path="/dash" element = {<DashBord/> } />
            <Route path="/regi" element = {<Registration/> } />
            <Route path="/login" element = {<Login/> }/>
            <Route path="*" element={<ErrorPage />} 
            />
            {/* <Route path="/admin/contactData" element = {<ContactData/> } /> */}
              
        </Routes>
        </div>
        {/* <Footer/> */}
        {/* <ContactData/> */}
      </Router>

    </ThemeProvider>
    </>
  );
};

export default App;
