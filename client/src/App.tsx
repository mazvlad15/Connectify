import Navbar from "./components/Menu/Navbar";
import authContext from "./context/authContext";
import Create from "./pages/Create";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const authState = authContext((state) => state.authState);

  return (
    <div className="tw-bg-background tw-min-h-screen tw-h-full d-flex tw-justify-center tw-items-center">
      <Router>
        {authState && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={!authState ? <Navigate to="/login" /> : <Home />}
          />
          <Route
            path="/create"
            element={!authState ? <Navigate to="/login" /> : <Create />}
          />
          <Route
            path="/signup"
            element={authState ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/login"
            element={authState ? <Navigate to="/" /> : <LogIn />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
