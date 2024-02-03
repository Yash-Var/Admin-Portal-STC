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
import ReportStatus from "./components/ReportStatus";
import Questions from "./components/Questions";
import Error404 from "./components/Error404";
import Bottombar from "./scenes/global/Bottombar";
import CompanyForm from "./components/AddCompany";
import CompanyDetails from "./components/CompanyDetailsForm";
import CompanyInformation from "./components/CompanyInformation";
import ReportPage from "./components/ReportPage";
import AddQuestions from "./components/AddQuestions"

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const isLoggedin = localStorage.getItem("token");
  const isSuper = localStorage.getItem("user");

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
              <Route
                path="/login"
                element={isLoggedin ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/"
                element={isLoggedin ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/addCompany"
                element={
                  isLoggedin ? <CompanyForm /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/companies"
                element={isLoggedin ? <Company /> : <Navigate to="/login" />}
              />
              <Route
                path="/addCompanyReport"
                element={
                  isLoggedin ? <CompanyDetails /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/addQuestions"
                element={
                  isLoggedin ? <AddQuestions /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/reportstatus"
                element={
                  isLoggedin ? <ReportStatus /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/reportstatus/:id"
                element={isLoggedin ? <ReportPage /> : <Navigate to="/login" />}
              />
              <Route
                path="/questions"
                element={isLoggedin ? <Questions /> : <Navigate to="/login" />}
              />
              <Route
                path="/company/:id"
                element={
                  isLoggedin ? <CompanyInformation /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/form"
                element={
                  isLoggedin ? (
                    isSuper === "Super Admin" ? (
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
