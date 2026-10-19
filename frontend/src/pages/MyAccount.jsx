import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaFacebook,
  FaGoogle,
} from "react-icons/fa";

const MyAccount = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || !loggedInUser.id) {
      navigate("/");
      return;
    }

    fetch(`https://dulieu.onrender.com/users/${loggedInUser.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setAvatar(data.avatar || null);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
        navigate("/");
      });
  }, [navigate]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
        setUserData((prev) => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { ...userData, avatar };
      await fetch(`https://dulieu.onrender.com/users/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Có lỗi xảy ra khi cập nhật thông tin!");
    }
  };

  const handlePhoneUpdate = async () => {
    if (!/^[0-9]{10}$/.test(newPhone)) {
      setPhoneError("Số điện thoại phải có 10 chữ số");
      return;
    }

    try {
      const res = await fetch("https://dulieu.onrender.com/users");
      const allUsers = await res.json();
      const phoneExists = allUsers.some(
        (acc) => acc.sdt === newPhone && acc.id !== userData.id
      );
      if (phoneExists) {
        setPhoneError("Số điện thoại này đã được sử dụng");
        return;
      }

      const updated = { ...userData, sdt: newPhone };
      await fetch(`https://dulieu.onrender.com/users/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      });

      localStorage.setItem("loggedInUser", JSON.stringify(updated));
      setUserData(updated);
      setIsEditingPhone(false);
      setPhoneError("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Lỗi khi cập nhật số điện thoại:", error);
      setPhoneError("Có lỗi xảy ra khi cập nhật số điện thoại");
    }
  };

  if (!userData) {
    return (
      <Container className="py-4">
        <div>Đang tải dữ liệu người dùng...</div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {showSuccess && (
        <div className="alert alert-success">
          Cập nhật thông tin thành công!
        </div>
      )}

      <div className="bg-white p-4 rounded shadow-sm">
        <h4 className="mb-4">Thông tin tài khoản</h4>

        <div className="mb-4">
          <div className="d-flex align-items-center mb-3">
            <div
              className="avatar-container me-3"
              style={{
                cursor: "pointer",
                position: "relative",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "#f8f9fa",
              }}
              onClick={handleAvatarClick}
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <FaUser
                  size={50}
                  className="text-secondary"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileSelect}
              />
            </div>
            <div>
              <p className="text-muted mb-0">Nhấp vào để tải ảnh lên</p>
              <small className="text-muted">Kích thước tối đa: 5MB</small>
            </div>
          </div>

          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={userData?.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Họ và tên"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                value={userData?.Email || ""}
                disabled
                className="bg-light"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={userData?.sdt || ""}
                disabled
                className="bg-light"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  label="Nam"
                  name="gender"
                  checked={userData?.gender === "Nam"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="me-3"
                />
                <Form.Check
                  type="radio"
                  label="Nữ"
                  name="gender"
                  checked={userData?.gender === "Nữ"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="me-3"
                />
                <Form.Check
                  type="radio"
                  label="Không xác định"
                  name="gender"
                  checked={userData?.gender === "Không xác định"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày sinh (Không bắt buộc)</Form.Label>
              <Row>
                <Col>
                  <Form.Select
                    value={userData?.birthDay || ""}
                    onChange={(e) => handleInputChange("birthDay", e.target.value)}
                  >
                    <option value="">Ngày</option>
                    {[...Array(31)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    value={userData?.birthMonth || ""}
                    onChange={(e) => handleInputChange("birthMonth", e.target.value)}
                  >
                    <option value="">Tháng</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    value={userData?.birthYear || ""}
                    onChange={(e) => handleInputChange("birthYear", e.target.value)}
                  >
                    <option value="">Năm</option>
                    {[...Array(100)].map((_, i) => {
                      const year = new Date().getFullYear() - i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Cập nhật
            </Button>
          </Form>
        </div>

        <hr />

        <div className="mb-4">
          <h5>Số điện thoại và Email</h5>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <FaPhone className="me-2" />
              <span>Số điện thoại</span>
              {isEditingPhone ? (
                <div className="mt-2">
                  <Form.Control
                    type="text"
                    value={newPhone}
                    onChange={(e) => {
                      setNewPhone(e.target.value);
                      setPhoneError("");
                    }}
                    placeholder="Nhập số điện thoại mới"
                    className="mb-2"
                  />
                  {phoneError && (
                    <div className="text-danger small">{phoneError}</div>
                  )}
                  <div className="mt-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={handlePhoneUpdate}
                      className="me-2"
                    >
                      Lưu
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => {
                        setIsEditingPhone(false);
                        setPhoneError("");
                        setNewPhone(userData?.sdt || "");
                      }}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted mb-0">{userData?.sdt}</p>
              )}
            </div>
            {!isEditingPhone && (
              <Button
                variant="light"
                onClick={() => {
                  setIsEditingPhone(true);
                  setNewPhone(userData?.sdt || "");
                }}
              >
                Cập nhật
              </Button>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <FaEnvelope className="me-2" />
              <span>Email</span>
              <p className="text-muted mb-0">{userData?.Email}</p>
            </div>
          </div>
        </div>

        <hr />

        <div className="mb-4">
          <h5>Bảo mật</h5>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <FaLock className="me-2" />
              <span>Đổi mật khẩu</span>
            </div>
            <Button variant="light">Cập nhật</Button>
          </div>
        </div>

        <hr />

        <div>
          <h5>Liên kết mạng xã hội</h5>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <FaFacebook className="me-2 text-primary" />
              <span>Facebook</span>
            </div>
            <Button variant="light">Cập nhật</Button>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <FaGoogle className="me-2 text-danger" />
              <span>Google</span>
            </div>
            <Button variant="light">Cập nhật</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MyAccount;
