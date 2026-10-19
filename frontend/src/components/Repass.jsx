import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { FiRefreshCw } from "react-icons/fi";

const generateRandomCaptcha = (length = 6) => {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const Repass = ({ show, handleClose }) => {
  const [captchaCode, setCaptchaCode] = useState("");
  const [formData, setFormData] = useState({
    identifier: "",
    captcha: "",
  });

  const [error, setError] = useState({
    identifier: "",
    captcha: "",
    general: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const refreshCaptcha = () => {
    setCaptchaCode(generateRandomCaptcha(6));
  };

  useEffect(() => {
    if (show) {
      refreshCaptcha();
      setShowSuccess(false);
      setFormData({ identifier: "", captcha: "" });
      setError({ identifier: "", captcha: "", general: "" });
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.identifier.trim()) {
      setError((prev) => ({
        ...prev,
        identifier: "Vui lòng nhập email hoặc số điện thoại",
      }));
      return;
    }

    if (!formData.captcha.trim()) {
      setError((prev) => ({
        ...prev,
        captcha: "Vui lòng nhập mã captcha",
      }));
      return;
    }

    if (formData.captcha.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setError((prev) => ({
        ...prev,
        captcha: "Mã captcha không đúng",
      }));
      refreshCaptcha();
      return;
    }

    setShowSuccess(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-lg font-bold">Quên mật khẩu tài khoản</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSuccess && (
          <Alert variant="success" className="mb-3 text-sm">
            Đã gửi link đặt lại mật khẩu vào email/số điện thoại của bạn!
          </Alert>
        )}

        <p className="text-muted text-sm mb-3">
          Nhập địa chỉ email hoặc số điện thoại của bạn dưới đây và hệ thống sẽ
          gửi cho bạn một liên kết để đặt lại mật khẩu của bạn.
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nhập email hoặc số điện thoại"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              isInvalid={!!error.identifier}
            />
            {error.identifier && (
              <Form.Text className="text-danger">{error.identifier}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="d-flex align-items-center gap-3 mb-2">
              <div
                style={{
                  letterSpacing: "6px",
                  userSelect: "none",
                  fontFamily: "monospace",
                  transform: "skewX(-10deg)",
                }}
                className="bg-stone-100 border border-stone-300 rounded px-4 py-2 font-black text-rose-800 text-lg shadow-inner inline-block"
              >
                {captchaCode}
              </div>
              <button
                type="button"
                onClick={refreshCaptcha}
                className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1 font-semibold border-none bg-transparent"
              >
                <FiRefreshCw className="inline" /> Đổi mã khác
              </button>
            </div>
            <Form.Control
              type="text"
              placeholder="Nhập mã captcha phía trên"
              name="captcha"
              value={formData.captcha}
              onChange={handleChange}
              isInvalid={!!error.captcha}
            />
            {error.captcha && (
              <Form.Text className="text-danger">{error.captcha}</Form.Text>
            )}
          </Form.Group>

          <Button
            type="submit"
            className="w-100 py-2.5 rounded-xl font-bold bg-[#842c3d] hover:bg-[#6c2432] border-none text-white shadow"
          >
            Gửi yêu cầu
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Repass;
