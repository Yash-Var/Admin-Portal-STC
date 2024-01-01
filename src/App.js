import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Form from "./scenes/form";
import Login from "./components/Login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Company from "./components/Company";
import CompanyReport from "./components/CompanyReport";
import Questions from "./components/Questions";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const isLoggedin = true;
  const isSuper = localStorage.getItem("isSuper");
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoggedin ? (
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/companies" element={<Company />} />
                <Route path="/reports" element={<CompanyReport />} />
                <Route path="/questions" element={<Questions />} />
                <Route
                  path="/form"
                  element={isSuper === "super" ? <Form /> : <Navigate to="/" />}
                />
              </Routes>
            </main>
          </div>
        ) : (
          <Login />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
