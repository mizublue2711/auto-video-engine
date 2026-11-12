Việc các khối 3D của bạn chuyển động liên tục ở 60 FPS đòi hỏi việc tính toán tọa độ theo chỉ số khung hình `frame` (`useCurrentFrame()`) [cite: 1, 428].

Đối với thắc mắc của bạn về việc **điều chỉnh trực tiếp các khối 3D hiện tại do Jules đã vẽ**:

---

### 🛡️ 1\. Có làm hỏng mô hình không?

**KHÔNG HỎNG** nếu bạn điều chỉnh thông qua **Tầng Tham Số (Props / GUI Controls / Config File)** [cite: 183, 184]. Kiến trúc hệ thống đã được phân tách rõ ràng giữa *Logic dựng hình toán học bên trong* và *Tham số điều khiển bên ngoài* [cite: 181, 183, 185].

Tuy nhiên, mô hình **CÓ THỂ BỊ VỠ / LỖI** nếu bạn can thiệp trực tiếp vào mã nguồn phương trình dựng khung dây 3D (Submesh geometry, vertex matrices) hoặc vi phạm các rào chắn an toàn kỹ thuật (Invariants) [cite: 41, 424].

---

### 🟢 2\. NHỮNG GÌ BẠN CÓ THỂ ĐIỀU CHỈNH THOẢI MÁI (An Toàn 100%)

Bạn có thể tự do thay đổi các tham số sau mà không sợ sập hay hỏng cỗ máy:

1. **Bảng màu &amp; Chủ đề (Colors &amp; Themes):**
  * Đổi màu chủ đạo (`primaryColor`), màu điểm nhấn (`accentColor`) hay màu viền `#00E5FF` (Laser Cyan), `#5322FF` (Indigo) qua slider/color picker [cite: 1, 183, 184].
2. **Góc xoay &amp; Thu phóng Máy quay (Camera &amp; Rotation Params):**
  * Tăng giảm độ phóng đại (`scale`, `cameraZoom`), thay đổi vận tốc xoay quanh trục Y (`rotateYDeg`) [cite: 62, 183, 197].
3. **Độ bung rã rã tầng 3D (** **dispersionAmount** **):**
  * Điều chỉnh thanh trượt độ văng rã từ `0.0` (tập trung) đến `0.12` (phân tán rã tầng theo trục Z) [cite: 63, 183, 198].
4. **Nội dung Chữ &amp; Slot lắp ghép (Dynamic Recipes):**
  * Đổi nội dung chữ hiển thị (`textLine1`, `textLine2`), hoán đổi các Preset Background hay HUD Overlay ở Slot 1, 3, 4 [cite: 182, 183, 184].
5. **Thời lượng &amp; Nhịp điệu Timeline:**
  * Thay đổi `durationInFrames`, `fps`, điều chỉnh các mốc thời điểm chuyển cảnh bằng hàm nội suy `interpolate()` [cite: 183, 428].

---

### 🔴 3\. NHỮNG GÌ TUYỆT ĐỐI KHÔNG NÊN TỰ Ý SỬA (Hoặc Cần Cẩn Trọng Cao)

Để tránh hiện tượng văng màn hình hay giật méo khối, có **4 quy tắc bất biến** bạn cần lưu ý:

1. **Tuyệt đối KHÔNG xóa góc nghiêng Isometric Pitch cơ sở (** **rotateXDeg = 28°** **):**
  * Nếu đặt góc nghiêng `rotateXDeg = 0°`, khi khối 3D xoay Y đến góc 90° hoặc 270°, toàn bộ khối 3D sẽ bị hiện tượng **Sập chiều sâu (3D Depth Collapse)** – bẹp dí thành một đường thẳng 2D phẳng lỳ [cite: 50, 63, 66].
2. **Tuyệt đối KHÔNG chèn các hàm thời gian không xác định (Non-Deterministic):**
  * Cấm chèn `Date.now()`, `Math.random()`, `setTimeout()`, `setInterval()` vào trong render loop của component 3D [cite: 424, 428, 450]. Mọi chuyển động bắt buộc phải tính toán thuần túy dựa trên biến số `frame` để đảm bảo video render ra 60 FPS không bị trôi khung hình [cite: 428, 446, 450].
3. **Tuyệt đối KHÔNG truyền biến tần số âm thanh thô (** **audioEnergy** **) vào biến Transform 3D:**
  * Không truyền trực tiếp độ nhạy biên độ nhạc thô vào `scale` hay `rotation` của khối 3D vì sẽ làm khối 3D bị văng méo, giật cơ học [cite: 41, 46]. Nên dùng hàm sóng hài Sine mượt (`smoothPulse`) hoặc tách riêng layer âm thanh [cite: 31, 46].
4. **Không gộp Nền đen hay Chữ rác vào Layer 2 (Hero Mesh Isolation):**
  * Component 3D (Layer 2) phải luôn giữ `backgroundColor: 'transparent'` và không chứa các khung viền/chữ HUD [cite: 1, 185]. Nền đen và HUD đã được phụ trách riêng bởi Layer 1 và Layer 3 trong cỗ máy `LegoVideoOrchestrator` [cite: 1, 185].