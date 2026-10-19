import { useState } from "react";
import Login from "../components/Login";

const PrivateRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [showLogin, setShowLogin] = useState(!loggedInUser);

  if (!loggedInUser) {
    // Hiển thị modal đăng nhập thay vì chuyển trang
    return <Login show={showLogin} handleClose={() => setShowLogin(false)} />;
  }

  return children;
};

export default PrivateRoute;
