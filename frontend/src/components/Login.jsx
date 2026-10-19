import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Repass from "./Repass";
import { useNavigate } from "react-router-dom";

const Login = ({ show, handleClose, handleShowSignup, onLoginSuccess, onForgotPassword }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [error, setError] = useState({
    emailOrPhone: "",
    password: "",
    general: "",
  });
  const [success, setSuccess] = useState("");
  const [showRepass, setShowRepass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "", general: "" });
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ emailOrPhone: "", password: "", general: "" });

    try {
      const res = await fetch("https://dulieu.onrender.com/users");
      const users = await res.json();

      const matchedUser = users.find(
        (user) =>
          (user.Email === formData.emailOrPhone || user.sdt === formData.emailOrPhone) &&
          user.Password === formData.password
      );

      if (matchedUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
        onLoginSuccess && onLoginSuccess(matchedUser);
        handleClose();
        navigate("/");
      } else {
        setError({ ...error, general: "Email/SĐT hoặc mật khẩu không đúng" });
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      setError({ ...error, general: "Có lỗi khi kết nối đến máy chủ" });
    }
  };

  const handleSwitchToSignup = () => {
    handleClose();
    handleShowSignup();
  };

  const handleShowRepass = (e) => {
    e.preventDefault();
    handleClose();
    setShowRepass(true);
  };

  const handleCloseRepass = () => {
    setShowRepass(false);
    handleClose();
  };

  return (
    <>
      <Modal show={show && !showRepass} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error.general && <Alert variant="danger">{error.general}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <div className="d-flex gap-2 mb-4">
            <Button variant="primary" className="w-50 d-flex align-items-center justify-content-center gap-2">
              <FaFacebook /> Facebook
            </Button>
            <Button variant="danger" className="w-50 d-flex align-items-center justify-content-center gap-2">
              <FaGoogle /> Google +
            </Button>
          </div>

          <div className="text-center mb-4">
            <span>Hoặc đăng nhập với Tài khoản của bạn</span>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              {error.emailOrPhone && <Form.Text className="text-danger mb-1 d-block">{error.emailOrPhone}</Form.Text>}
              <Form.Control
                type="text"
                placeholder="Email hoặc số điện thoại"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              {error.password && <Form.Text className="text-danger mb-1 d-block">{error.password}</Form.Text>}
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <Form.Check type="checkbox" label="Nhớ mật khẩu" />
              <a href="#" className="text-decoration-none text-success" onClick={handleShowRepass}>
                Quên mật khẩu
              </a>
            </div>

            <Button variant="success" type="submit" className="w-100 py-2 mb-3">
              Đăng nhập
            </Button>

            <div className="text-center">
              <span>Bạn chưa có tài khoản? </span>
              <a href="#" className="text-decoration-none text-success" onClick={handleSwitchToSignup}>
                ĐĂNG KÝ NGAY
              </a>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Repass show={showRepass} handleClose={handleCloseRepass} />
    </>
  );
};

export default Login;
