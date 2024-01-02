import { useState, useEffect } from "react";
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
import Error404 from "./components/Error404";
import Bottombar from "./scenes/global/Bottombar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const isLoggedin = true;
  const isSuper = "super";

  useEffect(() => {
    const handleResize = () => {
      setShowBottomBar(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoggedin && !showBottomBar ? (
            <Sidebar isSidebar={isSidebar} />
          ) : null}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="*" element={<Error404 />} />{" "}
              {/* 404 page  Come here */}
              <Route
                path="/login"
                element={isLoggedin ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/"
                element={isLoggedin ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/companies"
                element={isLoggedin ? <Company /> : <Navigate to="/login" />}
              />
              <Route
                path="/reports"
                element={
                  isLoggedin ? <CompanyReport /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/questions"
                element={isLoggedin ? <Questions /> : <Navigate to="/login" />}
              />
              <Route
                path="/form"
                element={
                  isLoggedin ? (
                    isSuper === "super" ? (
                      <Form />
                    ) : (
                      <Navigate to="/" />
                    )
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
            {showBottomBar && <Bottombar />}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
