import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Container from "./components/Container/Container";
import Dashboard from "./components/Dashboard/Dashboard";
import MTable from "./components/Department/MTable";
import EditDept from "./components/Department/Edit";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Protected from "./Protected";
import { useAPI } from "./Context/APIContext";
import Sidebar from "./components/SideBar/Sidebar";
import "./sideBarFlex.css";
import ErrorBoundary from "./ErrorBoundary";

function App() {

  const { isLoggedIn } = useAPI();

  return (
    <div className="App">
      <ErrorBoundary>
        <Container
          content={
            <>
              {!isLoggedIn ?
                <Routes>
                  <Route path="*" element={<main>NOT FOUND</main>} />
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/landing" element={<Navigate to="/" />} />
                  <Route path="/dashboard" element={<Navigate to="/" />} />
                  <Route path="/dept" element={<Navigate to="/" />} />
                  <Route path="/subDepartment" element={<Navigate to="/" />} />
                  <Route path="/teamDepartment" element={<Navigate to="/" />} />
                  <Route path="/individualDepartment" element={<Navigate to="/" />} />
                  <Route path="/role" element={<Navigate to="/" />} />
                  <Route path="/user" element={<Navigate to="/" />} />
                  <Route path="/perspective" element={<Navigate to="/" />} />
                  <Route path="/objective" element={<Navigate to="/" />} />
                  <Route path="/kpi" element={<Navigate to="/" />} />
                  <Route path="/Edit" element={<Navigate to="/" />} />
                </Routes>
                :
                <Routes>
                  <Route path="*" element={<main>NOT FOUND</main>} />
                  <Route path="/" element={<Login />} />
                  <Route
                    exact
                    path="/login"
                    element={<Login />}
                  ></Route>
                  <Route
                    path="/landing"
                    element={
                      <Protected isLoggedIn={isLoggedIn}>
                        <div className="sidebarContainer">
                          <Sidebar />
                          <LandingPage />
                        </div>
                      </Protected>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <Protected isLoggedIn={isLoggedIn}>
                        <div className="sidebarContainer">
                          <Sidebar />
                          <Dashboard />
                        </div>
                      </Protected>
                    }
                  />
                  <Route
                    path="/dept"
                    element={
                      <Protected isLoggedIn={isLoggedIn}>
                        <div className="sidebarContainer">
                          <Sidebar />
                          <MTable />
                        </div>
                      </Protected>
                    }
                  />
                  <Route
                    path="/subDepartment"
                    element={
                      <Protected isLoggedIn={isLoggedIn}>
                        <div className="sidebarContainer">
                          <Sidebar />
                          <MTable />
                        </div>
                      </Protected>
                    }
                  />
                  <Route
                    path="/teamDepartment"
                    element={
                      <Protected isLoggedIn={isLoggedIn}>
                        <div className="sidebarContainer">
                          <Sidebar />
                          <MTable />
                        </div>
                      </Protected>
                    }
                  />
                  <Route
                    path="/individualDepartment"
                    element={
                      <Protected isLoggedIn={isLoggedIn}>
                        <div className="sidebarContainer">
                          <Sidebar />
                          <MTable />
                        </div>
                      </Protected>
                    }
                  />
                  <Route
                    path="/role"
                    element={
                      <Protected isLoggedIn={isLoggedIn}>
                        <div className="sidebarContainer">
                          <Sidebar />
                          <MTable />
                        </div>
                      </Protected>
                    }
                  />
                  <Route
                    path="/user"
                    element={
                      <Protected isLoggedIn={isLoggedIn}>
                        <div className="sidebarContainer">
                          <Sidebar />
                          <MTable />
                        </div>
                      </Protected>
                    }
                  />
                  <Route
                    path="/perspective"
                    element={
                      <Protected isLoggedIn={isLoggedIn}>
                        <div className="sidebarContainer">
                          <Sidebar />
                          <MTable />
                        </div>
                      </Protected>
                    }
                  />
                  <Route
                    path="/objective"
                    element={
                      <Protected isLoggedIn={isLoggedIn}>
                        <div className="sidebarContainer">
                          <Sidebar />
                          <MTable />
                        </div>
                      </Protected>
                    }
                  />
                  <Route
                    path="/kpi"
                    element={
                      <Protected isLoggedIn={isLoggedIn}>
                        <div className="sidebarContainer">
                          <Sidebar />
                          <MTable />
                        </div>
                      </Protected>
                    }
                  />
                  <Route
                    path="/Edit"
                    element={
                      <Protected isLoggedIn={isLoggedIn}>
                        <div className="sidebarContainer">
                          <Sidebar />
                          <EditDept />
                        </div>
                      </Protected>
                    }
                  />
                </Routes>
              }
            </>
          }
        />
      </ErrorBoundary>
    </div>
  );
}

export default App;
