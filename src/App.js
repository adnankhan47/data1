import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import TaskList from "./components/Tasklist"; // import TaskList component
import Header from "./components/Header";
import CreateTask from "./components/CreateTask";
import UpdateTask from "./components/UpdateTask";
import MainLayout from "./components/MainLayout"; // Import MainLayout component

// import Footer from "./components/Footer ";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
function App() {
  return (
    <Router>
      <div className="app_container">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route element={<MainLayout />}></Route>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/update/:id" element={<UpdateTask />} /> */}

          <Route element={<MainLayout />}>
            {/* Nested routes that will show the header */}
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/update/:id" element={<UpdateTask />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
