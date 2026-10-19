import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addressData from "../data/address.json";

const AddressForm = ({ show, onHide, onSubmit, editAddress }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    address: "",
    isDefault: false,
  });

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    if (editAddress) {
      setFormData(editAddress);
      setSelectedCity(editAddress.city);
      setSelectedDistrict(editAddress.district);
    }
  }, [editAddress]);

  // Handle city change
  const handleCityChange = (e) => {
    const cityCode = e.target.value;
    setSelectedCity(cityCode);
    setSelectedDistrict("");
    setFormData({
      ...formData,
      city: addressData.find((city) => city.Code === cityCode)?.FullName || "",
      district: "",
      ward: "",
    });

    // Update districts list
    const cityData = addressData.find((city) => city.Code === cityCode);
    setDistricts(cityData ? cityData.District : []);
    setWards([]);
  };

  // Handle district change
  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
    const district = districts.find((d) => d.Code === districtCode);
    setFormData({
      ...formData,
      district: district?.FullName || "",
      ward: "",
    });

    // Update wards list
    setWards(district ? district.Ward : []);
  };

  const handleDelete = (address) => {
    const confirmDialog = new Promise((resolve) => {
      toast.info(
        <div>
          <p>Bạn có chắc muốn xóa địa chỉ này?</p>
          <div className="d-flex justify-content-end gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                resolve(false);
                toast.dismiss();
              }}
            >
              Hủy
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                // Xóa chỉ địa chỉ được chọn bằng cách so sánh phone
                const savedAddresses = JSON.parse(
                  localStorage.getItem("addresses") || "[]"
                );
                const filteredAddresses = savedAddresses.filter(
                  (addr) => addr.phone !== address.phone
                );
                localStorage.setItem(
                  "addresses",
                  JSON.stringify(filteredAddresses)
                );

                toast.success("Đã xóa địa chỉ thành công!");
                resolve(true);
                window.location.reload(); // Reload để cập nhật UI
              }}
            >
              Xóa
            </Button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          closeButton: false,
        }
      );
    });
  };

  const handleSetDefault = (address) => {
    // Cập nhật state chỉ cho địa chỉ được chọn
    const savedAddresses = JSON.parse(
      localStorage.getItem("addresses") || "[]"
    );
    const updatedAddresses = savedAddresses.map((addr) => ({
      ...addr,
      isDefault: addr.phone === address.phone, // So sánh bằng phone
    }));
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    toast.success("Đã đặt làm địa chỉ mặc định!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedAddresses = JSON.parse(
      localStorage.getItem("addresses") || "[]"
    );

    if (formData.isDefault) {
      // Cập nhật isDefault cho các địa chỉ khác
      savedAddresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    // Nếu đang sửa, cập nhật địa chỉ hiện có
    if (editAddress) {
      const updatedAddresses = savedAddresses.map((addr) =>
        addr.phone === editAddress.phone ? formData : addr
      );
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    } else {
      // Thêm địa chỉ mới
      savedAddresses.push(formData);
      localStorage.setItem("addresses", JSON.stringify(savedAddresses));
    }

    onSubmit(formData);
    toast.success(
      editAddress ? "Đã cập nhật địa chỉ!" : "Đã thêm địa chỉ mới!"
    );
    onHide();
    // Reset form
    setFormData({
      name: "",
      phone: "",
      city: "",
      district: "",
      ward: "",
      address: "",
      isDefault: false,
    });
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editAddress ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
          >
            {/* Existing name and phone fields */}
            <Form.Group className="mb-3">
              <Form.Label>Họ tên:</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại:</Form.Label>
              <Form.Control
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </Form.Group>

            {/* City select */}
            <Form.Group className="mb-3">
              <Form.Label>Tỉnh/Thành phố:</Form.Label>
              <Form.Select
                value={selectedCity}
                onChange={handleCityChange}
                required
              >
                <option value="">Chọn Tỉnh/Thành phố</option>
                {addressData.map((city) => (
                  <option key={city.Code} value={city.Code}>
                    {city.FullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* District select */}
            <Form.Group className="mb-3">
              <Form.Label>Quận/Huyện:</Form.Label>
              <Form.Select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                required
                disabled={!selectedCity}
              >
                <option value="">Chọn Quận/Huyện</option>
                {districts.map((district) => (
                  <option key={district.Code} value={district.Code}>
                    {district.FullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Ward select */}
            <Form.Group className="mb-3">
              <Form.Label>Phường/Xã:</Form.Label>
              <Form.Select
                value={formData.ward}
                onChange={(e) =>
                  setFormData({ ...formData, ward: e.target.value })
                }
                required
                disabled={!selectedDistrict}
              >
                <option value="">Chọn Phường/Xã</option>
                {wards.map((ward, index) => (
                  <option
                    key={index}
                    value={ward.FullName || ward.DistrictCode}
                  >
                    {ward.FullName || `Phường/Xã ${index + 1}`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Address detail */}
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ cụ thể:</Form.Label>
              <Form.Control
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
                placeholder="Số nhà, tên đường"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Đặt làm địa chỉ mặc định"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData({ ...formData, isDefault: e.target.checked })
                }
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={onHide}>
                Hủy
              </Button>
              <Button variant="success" type="submit">
                {editAddress ? "Cập nhật" : "Thêm mới"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddressForm;
