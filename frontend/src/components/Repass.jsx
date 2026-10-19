import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";

const Repass = ({ show, handleClose }) => {
  console.log("Repass modal show status:", show);

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

  // Khởi tạo captcha khi component mount và khi modal được mở
  useEffect(() => {
    if (show) {
      loadCaptchaEnginge(6); // Tạo captcha 6 ký tự
      setShowSuccess(false);
      setFormData({ identifier: "", captcha: "" });
      setError({ identifier: "", captcha: "", general: "" });
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError({
      ...error,
      [name]: "",
      general: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.identifier) {
      setError({
        ...error,
        identifier: "Vui lòng nhập email hoặc số điện thoại",
      });
      return;
    }

    if (!formData.captcha) {
      setError({
        ...error,
        captcha: "Vui lòng nhập mã captcha",
      });
      return;
    }

    if (!validateCaptcha(formData.captcha)) {
      setError({
        ...error,
        captcha: "Mã captcha không đúng",
      });
      return;
    }

    // Hiển thị thông báo thành công
    setShowSuccess(true);

    // Đóng modal sau 2 giây
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleShowRepass = (e) => {
    e.preventDefault();
    console.log("Clicking forgot password link");
    handleClose();
    console.log("Setting showRepass to true");
    setShowRepass(true);
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
        <Modal.Title>Quên mật khẩu tài khoản</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSuccess && (
          <Alert variant="success" className="mb-3">
            Đã gửi link đặt lại mật khẩu vào email/số điện thoại của bạn!
          </Alert>
        )}

        <p className="text-muted">
          Nhập địa chỉ email hoặc số điện thoại của bạn dưới đây và hệ thống sẽ
          gửi cho bạn một liên kết để đặt lại mật khẩu của bạn
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
            <div className="d-flex align-items-center gap-2 mb-2">
              <div
                style={{
                  border: "1px solid #dee2e6",
                  borderRadius: "4px",
                  padding: "8px",
                  display: "inline-block",
                }}
              >
                <LoadCanvasTemplateNoReload />
              </div>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  loadCaptchaEnginge(6);
                }}
                className="text-decoration-none text-success"
                style={{ whiteSpace: "nowrap" }}
              >
                Reload Captcha
              </a>
            </div>
            <Form.Control
              type="text"
              placeholder="Nhập mã captcha"
              name="captcha"
              value={formData.captcha}
              onChange={handleChange}
              isInvalid={!!error.captcha}
            />
            {error.captcha && (
              <Form.Text className="text-danger">{error.captcha}</Form.Text>
            )}
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Gửi
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Repass;
