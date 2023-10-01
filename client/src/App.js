import {BrowserRouter, Navigate, Routes, Route}from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { UseSelector, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {themeSettings} from "./theme.js";

//to run the code with npm start you have to be in client directory

function App() {
  const mode = useSelector((state) => state.mode); //grabbing information from the store
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // theme depends on mode -> useMemo will memorize the result of the function and wont change the theme unless the mode changes

  return <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/profile/:userId" element={<ProfilePage/>}/>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>;}

export default App;
