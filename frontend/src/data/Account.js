// Lấy dữ liệu từ localStorage hoặc sử dụng dữ liệu mặc định
export const accounts = JSON.parse(localStorage.getItem('accounts'));

// Hàm thêm tài khoản mới
export const addAccount = (newAccount) => {
  accounts.push(newAccount);
  // Lưu vào localStorage
  localStorage.setItem('accounts', JSON.stringify(accounts));
  console.log("Danh sách tài khoản sau khi thêm:", accounts);
};

// Hàm kiểm tra tài khoản đã tồn tại
export const checkExistingAccount = (email, phone) => {
  return accounts.some(account => 
    account.email === email || account.phone === phone
  );
};

// Hàm kiểm tra đăng nhập
export const checkLogin = (identifier, password) => {
  return accounts.find(account => 
    (account.email === identifier || account.phone === identifier) && 
    account.password === password
  );
};

// Hàm validate email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@gmail\.com$/;
  if (!email) return "Email không được trống";
  if (!emailRegex.test(email)) {
    return "Không đúng định dạng";
  }
  return "";
};

// Hàm validate số điện thoại
export const validatePhone = (phone) => {
  const phoneRegex = /^(03|08|09)\d{8}$/;
  if (!phone) return "Số điện thoại không được trống";
  if (!phoneRegex.test(phone)) {
    return "Không đúng định dạng";
  }
  return "";
};

// Hàm validate mật khẩu
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,32}$/;
  if (!password) return "Mật khẩu không được trống";
  if (!passwordRegex.test(password)) {
    return "Mật khẩu không hợp lệ";
  }
  return "";
};
