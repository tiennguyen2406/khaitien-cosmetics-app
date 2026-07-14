# Tổng Hợp Hướng Dẫn - React Native Cosmetics App (Cấu Trúc Cơ Bản)

## Tổng Quan
Dự án này là React Native app cho bán mỹ phẩm, sử dụng Expo SDK 54, cấu trúc cơ bản đơn giản.

---

## PHẦN 1: QUÁ TRÌNH TẠO DỰ ÁN

### Bước 1: Tạo Expo Project
```bash
cd TTS_FT_3P
npx create-expo-app@latest cosmetics-app --template blank --yes
```

### Bước 2: Cài Dependencies Cơ Bản
```bash
cd cosmetics-app
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
```

### Bước 3: Tạo Cấu Trúc Thư Mục Cơ Bản
```bash
cd cosmetics-app
mkdir src
mkdir src/screens
mkdir src/screens/auth
mkdir src/screens/home
mkdir src/screens/products
mkdir src/screens/cart
mkdir src/screens/profile
mkdir src/components
mkdir src/components/common
mkdir src/components/ui
mkdir src/components/layout
mkdir src/types
mkdir src/constants
```

### Bước 4: Di Chuyển File Vào src/
```bash
Move-Item App.js src/App.tsx
Move-Item assets src/assets
```

### Bước 5: Cập Nhật Expo SDK
- Expo SDK 54 (ổn định)

### Bước 6: Fix Dependencies
Cập nhật package.json để tương thích với Expo SDK 54:
```json
{
  "expo": "~54.0.0",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "expo-status-bar": "~3.0.9"
}
```

### Bước 7: Fix Import Path
Sửa file `index.js`:
```javascript
import App from './src/App';  // Thay vì './App'
```

---

## PHẦN 2: GIẢI THÍCH CẤU TRÚC THƯ MỤC CƠ BẢN

### 📁 `src/` - Thư mục chính chứa toàn bộ source code

### 📁 `src/screens/` - Các màn hình của app
Chứa các component màn hình chính của app:
- **`auth/`** - Màn hình đăng nhập, đăng ký
- **`home/`** - Màn hình trang chủ
- **`products/`** - Màn hình danh sách sản phẩm
- **`cart/`** - Màn hình giỏ hàng
- **`profile/`** - Màn hình hồ sơ người dùng

**Ví dụ đặt tên file:**
- `LoginScreen.tsx` - Màn hình đăng nhập
- `HomeScreen.tsx` - Màn hình trang chủ

### 📁 `src/components/` - Các component tái sử dụng
Chứa các UI component có thể dùng ở nhiều nơi:
- **`common/`** - Component dùng chung (Button, Input, Card)
- **`ui/`** - UI cơ bản (Text, View wrapper)
- **`layout/`** - Component layout (Header, Footer)

**Ví dụ:**
- `common/Button.tsx` - Nút bấm tái sử dụng
- `common/ProductCard.tsx` - Card sản phẩm

### 📁 `src/types/` - TypeScript types
Chứa các interface và type:
- `index.ts` - Các type chính

**Ví dụ:**
```typescript
export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}
```

### 📁 `src/constants/` - Các hằng số
Chứa các constant:
- `app.constants.ts` - Constant app (API URL, colors)

**Ví dụ:**
```typescript
export const API_BASE_URL = 'http://localhost:3000/api';
export const COLORS = {
  PRIMARY: '#D4AF37',
  SECONDARY: '#3D2010',
};
```

### 📁 `src/assets/` - Tài nguyên tĩnh
Chứa hình ảnh, fonts, icons

---

## PHẦN 3: HƯỚNG DẪN VIẾT CODE CƠ BẢN

### 1. Quy tắc đặt tên file
- **Screen**: Tên + Screen.tsx (ví dụ: `LoginScreen.tsx`)
- **Component**: Tên + .tsx (ví dụ: `Button.tsx`)
- **Type**: Tên + .ts (ví dụ: `index.ts`)

### 2. Quy tắc đặt tên biến/hàm
- **Component**: PascalCase (ví dụ: `ProductCard`)
- **Function**: camelCase (ví dụ: `formatPrice`)
- **Constant**: UPPER_SNAKE_CASE (ví dụ: `API_BASE_URL`)
- **Interface**: PascalCase (ví dụ: `User`, `Product`)

### 3. Cấu trúc một Screen
```typescript
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang chủ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

### 4. Cấu trúc một Component
```typescript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#D4AF37',
    padding: 15,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
```

### 5. Sử dụng TypeScript
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}
```

---

## PHẦN 4: CHẠY DỰ ÁN

### Development
```bash
cd cosmetics-app
npx expo start
```

### Các lệnh điều khiển trong terminal
- `a` - Mở Android emulator
- `i` - Mở iOS simulator
- `w` - Mở web browser
- `r` - Reload app
- `m` - Mở menu

### Kết nối với điện thoại
1. Cài Expo Go từ App Store/Google Play
2. Đảm bảo điện thoại và máy tính cùng mạng WiFi
3. Quét QR code hiển thị trong terminal
4. App sẽ tự động tải và chạy

---

## PHẦN 5: CẤU TRÚC DỰ ÁN TOÀN BỘ

```
TTS_FT_3P/
├── backend/              # NestJS API (port 3000)
│   ├── src/
│   │   ├── modules/      # Auth, Products, Users, etc.
│   │   ├── database/     # MongoDB config
│   │   └── config/      # App config
│   └── .env.development  # Environment variables
│
├── admin/                # Admin Panel (port 3001)
│   └── src/              # Next.js admin interface
│
└── cosmetics-app/        # React Native App (Cấu trúc cơ bản)
    ├── src/
    │   ├── screens/      # Màn hình chính (auth, home, products, cart, profile)
    │   ├── components/   # UI components (common, ui, layout)
    │   ├── types/        # TypeScript types
    │   ├── constants/    # Constants
    │   └── assets/       # Images, fonts
    ├── App.tsx           # Main app component
    ├── package.json      # Dependencies
    └── app.json          # Expo config
```

---

## PHẦN 6: LƯU Ý QUAN TRỌNG

### Backend phải chạy trước
- Backend NestJS tại port 3000
- React Native app kết nối đến backend API

### Expo Go Version
- Cần cập nhật Expo Go lên phiên bản mới nhất
- Expo SDK 54 yêu cầu Expo Go mới

### Development Flow
1. Chạy backend: `cd backend && npm run dev`
2. Chạy React Native app: `cd cosmetics-app && npx expo start`
3. Quét QR code với Expo Go

---

## PHẦN 7: TIẾP THEO PHÁT TRIỂN

### Các bước tiếp theo:
1. Thêm navigation (Stack, Tab)
2. Implement các screens thực tế
3. Kết nối với backend API
4. Implement authentication flow
5. Testing và debugging

### Tài liệu tham khảo:
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)

---

**Ngày tạo:** 14/07/2026
**Phiên bản:** Expo SDK 54
**Cấu trúc:** Cơ bản
**Backend:** NestJS + MongoDB
**Frontend:** React Native + TypeScript
