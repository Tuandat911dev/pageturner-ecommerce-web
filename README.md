# 📚 PageTurner - Modern Bookstore Experience

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
[![Ant Design](https://img.shields.io/badge/-Ant%20Design-red?style=for-the-badge&logo=ant-design&logoColor=white)](https://ant.design/)

**PageTurner** là một ứng dụng thương mại điện tử mua sắm sách trực tuyến hiện đại. Dự án tập trung vào trải nghiệm người dùng mượt mà, quản lý trạng thái chặt chẽ và tối ưu hóa hiệu suất với bộ công cụ mới nhất.

## 🚀 Tính năng nổi bật

- **Quản lý danh mục:** Lọc sách theo thể loại, tác giả và giá cả.
- **Giỏ hàng thông minh:** Thêm/sửa/xóa sản phẩm với tính toán thời gian thực.
- **Tìm kiếm tối ưu:** Tìm kiếm sách nhanh chóng với Debounce kỹ thuật.
- **Thanh toán (Mock):** Quy trình checkout mô phỏng tích hợp validation.
- **Responsive Design:** Trải nghiệm hoàn hảo trên cả Mobile, Tablet và Desktop.

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript.
- **Build Tool:** Vite + SWC.
- **Routing:** React Router v7.
- **Form Handling:** React Hook Form + Zod.

## 📦 Cài đặt

1. Clone dự án:
   ```bash
   git clone [https://github.com/username/pageturner-ecommerce-web.git](https://github.com/Tuandat911dev/pageturner-ecommerce-web)
   ```
2. Cài đặt dependency:
   ```bash
   npm install
   ```
3. Chạy môi trường Development:
   ```bash
   npm run dev
   ```

## 🌟 Lý do sử dụng công nghệ

- Trong dự án này, tôi sử dụng **Ant Design** vì:

  - **Enterprise-class UI:** Cung cấp bộ component đầy đủ cho một hệ thống quản lý (Dashboard) và cửa hàng.
  - **Form Handling:** Hệ thống `@ant-design/plots` và `Form` giúp xử lý dữ liệu người dùng cực kỳ chính xác.
  - **Accessibility:** Hỗ trợ tốt cho người dùng cuối và khả năng đa ngôn ngữ (i18n).

- **TypeScript**: Đảm bảo tính an toàn của dữ liệu (Type-safety), đặc biệt quan trọng với các đối tượng như Product, Order, User.

- **SWC**: Tối ưu hóa thời gian phát triển, giúp phản hồi thay đổi code gần như tức thì.
