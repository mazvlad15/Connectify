import Navbar from "./components/Menu/Navbar";
import authContext from "./context/authContext";
import Create from "./components/Menu/Pages/Create";
import Explore from "./components/Menu/Pages/Explore";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Profile from "./components/Menu/Pages/Profile";
import SignUp from "./pages/SignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Messages from "./components/Menu/Pages/Messages";
import Chat from "./components/Messages/Chat";
import { useEffect } from "react";
import { socketContext } from "./context/socketContext";
import useNewMessageNotification from "./hooks/messages/useNewMessageNotification";

const App = () => {
  const authState = authContext((state) => state.authState);
  const { initializeSocket, disconnectSocket} = socketContext();

  useNewMessageNotification();

  useEffect(() => {
    if (authState?._id) {
      initializeSocket(authState._id);
    } else {
      disconnectSocket();
    }

    return () => disconnectSocket();
  }, [authState, initializeSocket, disconnectSocket]);

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
            path="/explore"
            element={!authState ? <Navigate to="/login" /> : <Explore />}
          />
          <Route path="/messages/:chatId" element={!authState ? <Navigate to="/login" /> : <Chat />} />
          <Route
            path="/profile"
            element={!authState ? <Navigate to="/login" /> : <Profile />}
          />
          <Route
            path="/create"
            element={!authState ? <Navigate to="/login" /> : <Create />}
          />
          <Route
            path="/messages"
            element={!authState ? <Navigate to="/login" /> : <Messages />}
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
