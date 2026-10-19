import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import addressData from "../data/address.json";

const Address = () => {
  // States
  const [addresses, setAddresses] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);

  // Modal handlers
  const handleClose = () => {
    setShow(false);
    setEditingAddress(null);
    setSelectedCity("");
    setSelectedDistrict("");
    setDistricts([]);
    setWards([]);
  };
  const handleShow = () => setShow(true);

  // Xử lý khi chọn thành phố
  const handleCityChange = (e) => {
    const cityCode = e.target.value;
    setSelectedCity(cityCode);

    const selectedCityData = addressData.find((city) => city.Code === cityCode);
    if (selectedCityData) {
      setDistricts(selectedCityData.District);
    } else {
      setDistricts([]);
    }
    setSelectedDistrict("");
    setWards([]);
  };

  // Xử lý khi chọn quận/huyện
  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);

    const selectedCityData = addressData.find(
      (city) => city.Code === selectedCity
    );
    if (selectedCityData) {
      const selectedDistrictData = selectedCityData.District.find(
        (district) => district.Code === districtCode
      );
      if (selectedDistrictData) {
        setWards(selectedDistrictData.Ward);
      } else {
        setWards([]);
      }
    }
  };

  // Thêm useEffect để load dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const savedAddresses = localStorage.getItem("addresses");
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  // Sửa lại hàm handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const cityData = addressData.find(
      (city) => city.Code === formData.get("city")
    );
    const districtData = cityData?.District.find(
      (district) => district.Code === formData.get("district")
    );
    const wardData = districtData?.Ward.find(
      (ward) => ward.Code === formData.get("ward")
    );

    const newAddressData = {
      // Đổi tên biến từ addressData thành newAddressData
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: cityData?.FullName || "",
      district: districtData?.FullName || "",
      ward: wardData?.FullName || "",
    };

    let updatedAddresses;
    if (editingAddress) {
      // Đang sửa địa chỉ
      updatedAddresses = addresses.map((addr, idx) => {
        if (idx === editingAddress.index) {
          return {
            ...newAddressData,
            isDefault: addr.isDefault, // Giữ nguyên trạng thái mặc định
          };
        }
        return addr;
      });
    } else {
      // Thêm mới địa chỉ
      newAddressData.isDefault = addresses.length === 0;
      updatedAddresses = [...addresses, newAddressData];
    }

    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    handleClose();
    setEditingAddress(null); // Reset editing state
  };

  // Sửa lại hàm xóa địa chỉ để xử lý khi xóa địa chỉ mặc định
  const handleDelete = (index) => {
    const deletedAddress = addresses[index];
    const updatedAddresses = addresses.filter((_, idx) => idx !== index);

    // Nếu xóa địa chỉ mặc định và còn địa chỉ khác
    if (deletedAddress.isDefault && updatedAddresses.length > 0) {
      // Set địa chỉ đầu tiên làm mặc định
      updatedAddresses[0].isDefault = true;
    }

    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  // Sửa lại hàm handleSetDefault
  const handleSetDefault = (index) => {
    const updatedAddresses = addresses.map((address, idx) => ({
      ...address,
      isDefault: idx === index, // Chỉ địa chỉ được chọn có isDefault = true
    }));
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  // Thêm hàm xử lý khi bấm nút sửa
  const handleEdit = (address, index) => {
    setEditingAddress({ ...address, index });
    // Set các giá trị cho select boxes
    const cityData = addressData.find((city) => city.FullName === address.city);
    if (cityData) {
      setSelectedCity(cityData.Code);
      const districtData = cityData.District.find(
        (district) => district.FullName === address.district
      );
      if (districtData) {
        setDistricts(cityData.District);
        setSelectedDistrict(districtData.Code);
        setWards(districtData.Ward);
      }
    }
    setShow(true);
  };

  return (
    <>
      {/* Thêm Navbar ở đây */}
      <Navbar expand="lg" className="custom-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              href="/"
              className="custom-nav-link"
              onClick={(event) => {
                window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang
              }}
            >
              TRANG CHỦ
            </Nav.Link>
            <Nav.Link href="/chutideals" className="custom-nav-link">CHUTI DEALS</Nav.Link>
            <Nav.Link href="/HotDeal" className="custom-nav-link">HOT DEALS</Nav.Link>
            <Nav.Link href="/brand" className="custom-nav-link">THƯƠNG HIỆU</Nav.Link>
            <Nav.Link href="/new-products" className="custom-nav-link">HÀNG MỚI VỀ</Nav.Link>
            <Nav.Link href="/banchay" className="custom-nav-link">BÁN CHẠY</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Nội dung chính */}
      <Container className="py-4">
        <h2 className="mb-4">Sổ địa chỉ</h2>

        {/* Add new address section */}
        <div className="mb-4">
          <p className="mb-2">Bạn muốn giao hàng đến địa chỉ khác?</p>
          <Button
            variant="success"
            onClick={handleShow}
            style={{ backgroundColor: "#198754", border: "none" }}
          >
            Thêm địa chỉ mới
          </Button>
        </div>

        {/* Address list */}
        <div className="address-list">
          {addresses.map((address, index) => (
            <div
              key={index}
              className="address-item p-3 mb-3"
              style={{
                border: "1px solid #dee2e6",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div className="d-flex justify-content-between mb-2">
                <div>
                  <strong>{address.name}</strong>
                  {address.isDefault ? (
                    <span className="ms-2 badge bg-success">Mặc định</span>
                  ) : (
                    addresses.length > 1 && (
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="ms-2"
                        onClick={() => handleSetDefault(index)}
                      >
                        Đặt làm mặc định
                      </Button>
                    )
                  )}
                </div>
                <div>
                  <Button
                    variant="link"
                    className="text-success p-0 me-3"
                    onClick={() => handleEdit(address, index)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="link"
                    className="text-danger p-0"
                    onClick={() => handleDelete(index)}
                    disabled={address.isDefault && addresses.length > 1}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
              <div className="text-secondary mb-1">{address.phone}</div>
              <div className="mb-1">{address.address}</div>
              <div className="text-secondary">
                {`${address.ward}, ${address.district}, ${address.city}`}
              </div>
            </div>
          ))}
        </div>

        {/* Add address modal */}
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Thêm địa chỉ mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Tên:</Form.Label>
                <Form.Control type="text" name="name" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type="tel" name="phone" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tỉnh/Thành phố</Form.Label>
                <Form.Select
                  name="city"
                  required
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <option value="">Vui lòng chọn tỉnh/thành phố</option>
                  {addressData.map((city) => (
                    <option key={city.Code} value={city.Code}>
                      {city.FullName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quận/Huyện</Form.Label>
                <Form.Select
                  name="district"
                  required
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  disabled={!selectedCity}
                >
                  <option value="">Vui lòng chọn quận/huyện</option>
                  {districts.map((district) => (
                    <option key={district.Code} value={district.Code}>
                      {district.FullName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phường/Xã</Form.Label>
                <Form.Select name="ward" required disabled={!selectedDistrict}>
                  <option value="">Vui lòng chọn phường/xã</option>
                  {wards.map((ward) => (
                    <option key={ward.Code} value={ward.Code}>
                      {ward.FullName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ nhận hàng</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  required
                  placeholder="Số nhà + tên đường"
                />
              </Form.Group>

              <div className="mt-4">
                <small className="text-muted">
                  ChuTi sẽ liên hệ số điện thoại này để giao hàng đến bạn và kiểm
                  tra tình trạng đơn hàng, đổi trả hàng khi cần.
                </small>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <Button variant="secondary" onClick={handleClose}>
                  Hủy
                </Button>
                <Button variant="success" type="submit">
                  Cập nhật
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default Address;
