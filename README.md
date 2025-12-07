# 📚 Library Management System (Web Application)

Hệ thống Quản lý Thư viện được xây dựng nhằm hỗ trợ quản lý độc giả, sách, nhân viên, phiếu mượn – trả sách một cách hiệu quả.  
Website sử dụng **Vue.js 3**, **Bootstrap 5**, **Node.js**, và **MongoDB** để mang lại giao diện hiện đại, dễ dùng và khả năng xử lý dữ liệu nhanh chóng.

---
## 👨‍🎓 Tác giả
- Họ tên: Chau Sô Na
- MSSV: B2205890
## ✨ Tính năng chính

### 🔐 1. Đăng nhập & Đăng ký
- Đăng nhập phân quyền (độc giả / nhân viên / admin).  
- Đăng ký tài khoản độc giả với biểu mẫu xác thực bằng **VeeValidate + Yup**.  
- Sau khi đăng xuất sẽ quay về trang đăng nhập.

---

### 📘 2. Chức năng cho Độc Giả
- Xem danh sách sách theo dạng bảng trực quan (Bootstrap 5).
- Tìm kiếm sách theo tên, mã sách, hoặc từ khóa liên quan.
- Bấm **“Mượn sách”** để gửi yêu cầu – hệ thống lưu trạng thái *“Chờ duyệt”*.
- Xem **Lịch sử mượn**, hiển thị:
  - Chờ duyệt  
  - Đã duyệt  
  - Đã trả  
  - Từ chối  

---

### 👨‍💼 3. Chức năng cho Nhân viên / Admin
#### 📌 Quản lý nhân viên
- Thêm, sửa, xem, xóa nhân viên.
- Tìm kiếm nhanh theo tên hoặc MSSV.
- Chỉnh sửa thông tin quản trị viên (trừ mật khẩu).

#### 📌 Quản lý độc giả
- Thêm, sửa, xóa độc giả.
- Tìm kiếm độc giả theo mã, tên, hoặc số điện thoại.

#### 📘 Quản lý sách
- Thêm đầu sách mới, chỉnh sửa thông tin sách.
- Cập nhật số lượng, năm xuất bản, tác giả, nhà xuất bản.
- Tìm kiếm sách nhanh bằng từ khóa.

#### 🏢 Quản lý nhà xuất bản
- Thêm, sửa, xóa nhà xuất bản.
- Quản lý địa chỉ, tên nhà xuất bản.

#### 📄 Quản lý phiếu mượn & trả sách
- Duyệt yêu cầu mượn sách.
- Cập nhật ngày trả thực tế khi trả sách.
- Hệ thống tự tính **tiền phạt nếu quá hạn**.
- Quản lý tất cả phiếu mượn theo trạng thái.

---

## 🧱 Công nghệ sử dụng

### Frontend
- **Vue.js 3**
- **Bootstrap 5**
- **Axios**
- **VeeValidate + Yup** (xác thực form)

### Backend
- **Node.js / Express.js**
- **MongoDB** (Mongoose)

---

## 📊 Mô hình dữ liệu (database)
- **DocGia(MaDocGia, HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai, Password)**
- **Sach(MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia)**
- **NhaXuatBan(MaNXB, TenNXB, DiaChi)**
- **NhanVien(MSNV, HoTenNV, Password, ChucVu, DiaChi, SoDienThoai)**
- **TheoDoiMuonSach(MaDocGia, MaSach, NgayMuon, NgayTra, NgayTraThucTe, TrangThai)**

---

## 🏁 Cách chạy dự án

### 🌐 Frontend
```bash
cd frontend
npm install
npm run dev
```
### 🌐 Backend
```bash
cd frontend
npm install
npm run dev
```
