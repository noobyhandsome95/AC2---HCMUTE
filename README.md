# AWS CLOUD CLUBS HCMUTE

## 1. Tổng quan về Phong cách thiết kế (Design System)
Website được xây dựng với định hướng **Modern Tech & Learning Platform**, tối ưu hóa cho trải nghiệm đọc tài liệu và làm bài thi trong thời gian dài.

### Màu sắc & Chủ đề (Color & Theme)
* **Chủ đề:** Dark Mode (Nền tối).
* **Màu chủ đạo:** Deep Blue/Black (#0f172a) kết hợp với Gradient tím - xanh đặc trưng của công nghệ Cloud.
* **Mục đích:** Giảm mỏi mắt khi sử dụng lâu, tạo cảm giác chuyên nghiệp và hiện đại.

### Typography & Layout
* **Font chữ:** Sans-serif hiện đại, sạch sẽ, dễ đọc.
* **Bố cục:** Sử dụng Grid System và Card Layout giúp phân tách nội dung rõ ràng.
* **Khoảng trắng:** Được sử dụng hợp lý để giao diện thoáng đãng, không bị rối mắt.

---

## 2. Chi tiết Giao diện & Trải nghiệm (Page-by-Page Analysis)

### 2.1. Trang Chào mừng (Landing Page)
> **Mục tiêu:** Định hướng người dùng và giới thiệu tổ chức.


<img width="1386" height="714" alt="HomePage" src="https://github.com/user-attachments/assets/cacc056e-895a-4283-9fe3-e0cdf2164853" />

* **Phân tích UI:** * Header nổi bật với Logo AWS Cloud Club HCMUTE.
    * Navigation Bar (Thanh điều hướng) được ghim trên cùng, dễ dàng truy cập các mục chính: Roadmap, Blogs, Documents.
* **Phân tích UX:**
    * Thông điệp chào mừng lớn, rõ ràng.
    * Không có các yếu tố gây xao nhãng, giúp người dùng tập trung vào mục đích chính của CLB.

### 2.2. Phân hệ Xác thực (Authentication)
> **Mục tiêu:** Đăng nhập và Đăng ký nhanh chóng, bảo mật.

<img width="1390" height="714" alt="Login" src="https://github.com/user-attachments/assets/6c8881ca-4b42-4cc0-8ede-f74d5f2e38f5" />


* **Phân tích UI:**
    * Thiết kế dạng **Centered Card** (Thẻ giữa màn hình) trên nền tối.
    * Input field có độ tương phản tốt, bo góc mềm mại.
* **Phân tích UX:**
    * **Social Login:** Tích hợp Google/LinkedIn giúp giảm thao tác nhập liệu, tăng trải nghiệm người dùng.
    * **Điều hướng:** Chuyển đổi giữa Đăng nhập/Đăng ký và Quên mật khẩu được đặt ở vị trí thuận tiện theo thói quen người dùng (Mental Model).

### 2.3. Kho Kiến thức & Tài liệu (Knowledge Hub)
> **Mục tiêu:** Hiển thị danh sách tài liệu trực quan, dễ tìm kiếm.

<img width="1388" height="714" alt="BlogPage" src="https://github.com/user-attachments/assets/2b64529e-e4ec-4a95-8e36-25de50f9fdc0" />


* **Phân tích UI:**
    * Sử dụng **Card UI**: Mỗi bài viết là một thẻ bao gồm Thumbnail, Tiêu đề, Tags và Metadata (Tác giả, thời gian đọc).
    * Logo công nghệ (Spring, React, Docker) được làm nổi bật để nhận diện nhanh.
* **Phân tích UX:**
    * **Visual Hierarchy:** Các thông tin quan trọng được làm to và đậm.
    * **Filter System:** Thanh lọc theo danh mục (Popular, Frontend, Backend...) giúp người dùng tìm kiếm nội dung mong muốn nhanh chóng mà không cần reload trang.

### 2.4. Hệ thống Bài thi & Chứng chỉ (Exams & Gamification)
> **Mục tiêu:** Theo dõi tiến độ học tập và luyện thi chứng chỉ AWS.

<img width="1386" height="714" alt="ExamPage" src="https://github.com/user-attachments/assets/9353a01b-4f4e-4971-b502-9d1932fd8ddd" />

* **Phân tích UI:**
    * Sử dụng hình ảnh Badges (Huy hiệu) chuẩn của AWS (SAA-C03, DevOps Pro...).
* **Phân tích UX:**
    * **Progress Bar:** Thanh tiến độ (45%, 20%) tạo động lực (Motivation) để người dùng hoàn thành khóa học.
    * **Rating System:** Hiển thị đánh giá sao giúp tăng độ tin cậy cho bài thi.

### 2.5. Quản lý Cá nhân & Nội dung (Profile & Upload)
> **Mục tiêu:** Cá nhân hóa trải nghiệm và đóng góp nội dung.


<img width="1386" height="714" alt="Profile" src="https://github.com/user-attachments/assets/0a1d5e42-0113-4a09-8df5-b5e1e2f481c9" />

* **Trang Profile:**
    * Layout chia cột: Avatar bên trái, Form thông tin bên phải -> Cân đối.
    * Nút "Save" sử dụng màu Gradient nổi bật -> Kêu gọi hành động rõ ràng.
* **Trang Upload:**
    * Khu vực **Drag & Drop** file rộng rãi, hiện đại.
    * Các trường nhập liệu (Title, Tags) đi theo luồng tư duy từ trên xuống dưới, logic và dễ sử dụng.

---

## 3. Kết luận
Website **AWS Cloud Clubs HCMUTE** sở hữu giao diện người dùng (UI) nhất quán và trải nghiệm người dùng (UX) mượt mà. 

* **Điểm mạnh:** Thiết kế Dark Mode hợp thời, bố cục sạch và luồng người dùng logic.
* **Phù hợp:** Rất phù hợp với đối tượng sinh viên kỹ thuật, lập trình viên và những người yêu thích công nghệ.

---
