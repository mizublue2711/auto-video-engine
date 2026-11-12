SỔ TAY CHẨN ĐOÁN, XỬ LÝ LỖI VÀ QUY TRÌNH CHUẨN HÓA KHI PHÁT TRIỂN VIDEO REMOTION VỚI GOOGLE JULES

1. TỔNG QUAN HỆ THỐNG VÀ NGUYÊN TẮC VẬN HÀNH DỰ ÁN

Trong kỷ nguyên tự động hóa sản xuất nội dung số bằng lập trình (Programmatic Video Generation), việc kết hợp giữa Remotion Framework và các đại lý trí tuệ nhân tạo (AI Code Agents như Google Jules) mang lại khả năng mở rộng quy mô sản xuất video vượt trội. Tuy nhiên, bản chất của luồng xuất video lập trình đòi hỏi tính chính xác tuyệt đối ở cấp độ khung hình (frame-level precision) và tính xác định (deterministic execution) trong từng hàm tính toán. Chỉ một lỗi cú pháp TypeScript nhỏ, một cấu hình giảm xóc hoạt họa sai lệch hay sự bất đồng bộ trong lịch sử Git giữa lập trình viên và google-labs-jules[bot] cũng có thể dẫn đến gãy luồng biên dịch CI/CD, crash trình render trên serverless (Google Cloud Run) hoặc gây ra các xung đột hỏng hóc hình ảnh nghiêm trọng. Do đó, việc xây dựng và tuân thủ một sổ tay chẩn đoán, xử lý lỗi chuẩn hóa là yêu cầu bắt buộc nhằm bảo đảm tính ổn định của kiến trúc mã nguồn và duy trì chất lượng thị giác cao nhất cho sản phẩm đầu ra.

Dựa trên mã nguồn thực thi chuẩn tại src/compositions/WebsiteShowcase.tsx trong dự án auto-video-remotion, nền tảng kiến trúc hệ thống được chuẩn hóa dựa trên các thành phần vận hành cốt lõi sau:

* Khung kiến trúc React & Remotion Core: Sử dụng các API cấp thấp của Remotion như useCurrentFrame và useVideoConfig để truy xuất chính xác từng khung hình theo thời gian thực. Hệ thống sử dụng thẻ gốc <AbsoluteFill /> kết hợp thẻ tối ưu tài nguyên <Img /> nhằm đảm bảo bố cục đồ họa tuyệt đối và không bị mất tài nguyên hình ảnh trong quá trình đóng gói Webpack/Esbuild.
* Động cơ hoạt họa toán học (Motion Engine Architecture): Điều khiển chuyển động thông qua cơ chế vật lý lò xo spring với các chỉ số giảm xóc (damping) phân tầng chuyên biệt:
  * Hero & Brand Entry (Frame 0–30): Cấu hình damping: 12 cho chuyển động nảy mềm mại, linh hoạt.
  * Staggered Feature Cards: Cấu hình damping: 14 tạo độ đầm chắc, kiểm soát chuyển động thẻ thông tin với khoảng thời gian tính toán trễ đan xen (stagger offset) chuẩn xác theo công thức startFrame = 35 + index * 20 (thẻ đầu tiên xuất hiện tại Frame 35, thẻ thứ hai tại Frame 55).
  * Call To Action Banner (Frame 100–120): Cấu hình damping: 12 thúc đẩy hành động ở phân cảnh cuối.
  * Toàn bộ chuyển động tuyến tính hoặc phi tuyến tính đều được siết biên độ thông qua hàm interpolate với cấu hình bắt buộc { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } để triệt tiêu hoàn toàn hiện tượng văng phần tử ra khỏi màn hình.
* Cấu trúc dữ liệu và Dynamic Props Interface: Định nghĩa hệ thống kiểu dữ liệu nghiêm ngặt qua giao diện WebsiteShowcaseProps bao gồm các đối tượng thành phần brand, hero, mảng features: Feature[] (chứa title và description), và callToAction. Cấu trúc này cho phép tái cấu hình toàn bộ kịch bản video thông qua việc truyền tệp JSON động mà không cần can thiệp lại cấu trúc mã nguồn React.
* Quy trình cộng tác mã nguồn CI/CD & AI Agent: Mô hình hợp tác mã nguồn đa luồng giữa Kỹ sư Lead (mizublue2711) và AI Agent (google-labs-jules[bot]) trên kho lưu trữ auto-video-remotion, tự động hóa các tác vụ tối ưu hóa phân cảnh và sửa lỗi dựa trên quy trình duyệt Pull Request (PR) khép kín.

Để duy trì tính toàn vẹn cho toàn bộ luồng tự động hóa này, bước phân tích và kiểm soát mã nguồn tĩnh (Static Code Analysis) chính là lá chắn đầu tiên ngăn ngừa rủi ro ngay từ công đoạn biên dịch.

2. PHÂN TÍCH VÀ KHẮC PHỤC LỖI CÚ PHÁP & CẤU TRÚC CODE TYPESCRIPT

Các lỗi cú pháp TypeScript và sai lệch trong cấu trúc định tuyến tập tin gây ảnh hưởng trực tiếp đến quy trình đóng gói (bundling) của Esbuild/Webpack trong Remotion. Việc duy trì hệ thống kiểm tra kiểu dữ liệu nghiêm ngặt giúp phát hiện sớm các tham số không hợp lệ, ngăn chặn tận gốc hiện tượng gãy luồng build hoặc mất phần tử đồ họa khi xuất video.

2.1. Lỗi cú pháp TypeScript trong hàm interpolate (Trống tham số frame,,)

* Nguyên nhân cốt lõi: Trong quá trình tái cấu trúc mã nguồn nhanh hoặc do AI Agent sinh mã lỗi, việc bỏ sót tham số bắt buộc frame hoặc xuất hiện các dấu phẩy dư thừa (ví dụ: interpolate(, [0, 20]... hoặc interpolate(frame,, ...) sẽ vi phạm nghiêm trọng chữ ký hàm (function signature) của Remotion API.
* Đánh giá hệ quả: Trình đóng gói Esbuild/Webpack sẽ ngắt luồng biên dịch ngay tại thời điểm build time do lỗi cú pháp phân tích ngữ nghĩa (Unexpected token ','). Trong trường hợp sai lệch tham số lọt qua bước kiểm tra tĩnh, hàm sẽ trả về giá trị NaN (Not a Number) tại runtime, khiến các thuộc tính CSS như opacity hoặc transform nhận giá trị vô hiệu, gây ra hiện tượng biến mất phần tử hiển thị hoặc crash trình xuất video trên Google Cloud Run.
* Mẫu mã chuẩn hóa:

Mã nguồn lỗi (Sai cú pháp & Thiếu tham số):

// Lỗi nghiêm trọng: Trống tham số frame, thừa dấu phẩy làm gãy Esbuild/Webpack
const heroOpacity = interpolate(, [0, 20], [0, 1]); 
const heroY = interpolate(heroSpring,, [0, 1], [40, 0]);


Mã nguồn chuẩn hóa (Trích xuất từ src/compositions/WebsiteShowcase.tsx):

import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// 1. Tính toán biến dịch chuyển lò xo cho Hero Section
const heroSpring = spring({
  frame,
  fps,
  config: { damping: 12 },
});

// 2. Chuyển đổi giá trị hiển thị Opacity an toàn với đầy đủ tham số và clamping
const heroOpacity = interpolate(frame, [0, 20], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

// 3. Nội suy vị trí trục Y dựa trên giá trị heroSpring
const heroY = interpolate(heroSpring, [0, 1], [40, 0]);


2.2. Lỗi import sai đường dẫn giữa src/components/, src/scenes/ và src/compositions/ trong Root.tsx

* Nguyên nhân cốt lõi: Sự thiếu rõ ràng trong việc phân định ngữ nghĩa kiến trúc giữa ba cấp độ phần tử:
  * src/components/: Bào chế các nguyên tử UI tái sử dụng (UI primitives như Button, Card, Header) không chứa logic thời gian (timeline-agnostic).
  * src/scenes/: Khai báo các phân cảnh nhỏ cấu thành kịch bản tổng thể.
  * src/compositions/: Chứa các điểm nhập chính (Entry points) của Remotion, kết hợp toàn bộ kịch bản và nhận dynamic props (chẳng hạn WebsiteShowcase.tsx).
* Đánh giá hệ quả: Khi import sai đường dẫn trong Root.tsx (ví dụ trỏ WebsiteShowcase vào src/components/ thay vì src/compositions/), hệ thống phân giải đường dẫn động sẽ thất bại. Đơn vị <Composition /> của Remotion không thể đăng ký component, gây ra lỗi "Component not found" trên Remotion Studio GUI và dừng toàn bộ tiến trình render CLI.
* Sơ đồ cấu trúc thư mục chuẩn mực:

auto-video-remotion/
├── src/
│   ├── components/            # UI Primitives tái sử dụng (Button.tsx, Card.tsx)
│   ├── compositions/          # Remotion Composition Entry Points (WebsiteShowcase.tsx)
│   ├── scenes/                # Các đoạn phân cảnh kịch bản nhỏ
│   └── Root.tsx               # Điểm đăng ký tập trung tất cả các <Composition />


Quy tắc Import chuẩn xác trong Root.tsx:

import { Composition } from 'remotion';
// ĐÚNG: Import đúng chuẩn Composition Entry Point từ thư mục compositions
import { WebsiteShowcase } from './compositions/WebsiteShowcase';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="WebsiteShowcase"
      component={WebsiteShowcase}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};


Bên cạnh tính chính xác của mã nguồn mã hóa, việc duy trì sự đồng bộ lịch sử Git trong môi trường phát triển lai giữa người và AI Agent là yếu tố sống còn để tránh mất mát thành quả lập trình.

3. QUẢN LÝ QUY TRÀNH GIT VÀ BẤT ĐỒNG BỘ VỚI GOOGLE JULES AGENT

Sự tham gia của các AI Code Agent tự động như google-labs-jules[bot] tạo ra tốc độ phát triển cực nhanh nhưng cũng tiềm ẩn rủi ro sai lệch nhánh làm việc. Nếu không áp dụng một quy trình vận hành Git cực kỳ kỷ luật, các thao tác checkout hoặc push bất đồng bộ sẽ dẫn đến tình trạng đè mã nguồn và làm mất các tính năng đã hoàn thiện.

3.1. Lỗi đè code / Mất 3 phân cảnh LogarithmicShell do không Merge PR vào main trước khi Jules checkout

* Phân tích nguyên nhân cốt lõi: Xảy ra hiện tượng lệch nhánh lịch sử (branch divergence) do điều kiện đua (race condition). Khi lập trình viên thực hiện các commit cục bộ trên nhánh main nhưng không đẩy lên remote, hoặc chưa tiến hành hợp nhất (merge) các Pull Request mà Google Jules vừa tạo trên GitHub. Lúc này, nếu phát lệnh cho Google Jules thực hiện nhiệm vụ mới, Jules Agent sẽ tiến hành checkout từ commit base cũ trên origin/main. Khi PR mới của Jules được merge sau đó, nó sẽ ghi đè và làm vô hiệu hóa các commit cục bộ chưa được hợp nhất (dẫn đến sự cố mất sạch 3 phân cảnh LogarithmicShell đã phát triển).
* Tác động dự án: Mất mát tài nguyên mã nguồn visual phức tạp, lãng phí thời gian tái thiết lập kịch bản và làm gián đoạn luồng tích hợp liên tục CI/CD.
* Quy trình vận hành chuẩn (SOP) với chuỗi lệnh Git bắt buộc:

Để đảm bảo tuyệt đối không bị đè mã nguồn khi làm việc với google-labs-jules[bot], kỹ sư vận hành bắt buộc phải thực thi chuẩn xác chuỗi lệnh 5 bước sau đây trước khi giao bất kỳ task mới nào cho Jules Agent:

# Bước 1: Trích xuất toàn bộ dữ liệu lịch sử mới nhất từ remote repository
git fetch origin

# Bước 2: Chuyển về nhánh main và kéo mã nguồn đã hợp nhất mới nhất về máy cục bộ
git checkout main
git pull origin main

# Bước 3: Chuyển sang nhánh tính năng cục bộ và rebase trên gốc main mới nhất
git checkout feature/new-scene
git rebase main

# Bước 4: Chuyển về main và thực hiện Fast-Forward Merge nhánh tính năng vào main
git checkout main
git merge feature/new-scene

# Bước 5: Đẩy nhánh main đã đồng bộ hoàn toàn lên remote trước khi kích hoạt Jules Agent
git push origin main


Sau khi thiết lập quy trình Git chuẩn mực, các rủi ro liên quan đến hiển thị không gian và hiệu ứng chuyển động 3D cần được xử lý triệt để về mặt toán học.

4. XỬ LÝ LỖI HOẠT HỌA 3D, HÌNH HỌC VÀ HIỆU ỨNG THỊ GIÁC (MOTION & 3D RENDERING)

Việc tính toán không gian 3D trong WebGL và Remotion dựa trên các phép biến đổi ma trận phức tạp. Nếu sử dụng các dữ liệu đầu vào không được kiểm soát hoặc thiếu thông số vật lý giảm xóc (damping), video sẽ xuất hiện các hiện tượng biến dạng hình học, giật lag hoặc mất chiều sâu không gian.

4.1. Lỗi truyền trực tiếp biến tần số âm thanh (audioEnergy/smoothPulse) làm văng méo khối 3D

* Phân tích nguyên nhân: Dữ liệu âm thanh thô thu thập theo real-time có biên độ biến động cực lớn và liên tục tạo ra các đỉnh nhọn (spikes). Khi gán trực tiếp các giá trị thô này vào ma trận biến đổi 3D (scale, position, rotation), ma trận hiển thị sẽ bị thay đổi đột ngột, làm lưới hình học 3D (mesh) bị co dãn quá mức, văng khỏi tầm nhìn camera hoặc gây vỡ hình (mesh clipping).
* Tác động thị giác: Làm hỏng tính thẩm mỹ chuyên nghiệp của video, gây hiện tượng nhấp nháy (flickering) khó chịu cho người xem và mất kiểm soát dải động (dynamic range).
* Giải pháp chuẩn hóa: Sử dụng spring engine với chỉ số damping: 12 làm bộ đệm vật lý, kết hợp cùng interpolate siết biên độ đầu ra:

import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// Tín hiệu âm thanh thô giả định nhận được từ hệ thống phân tích
const rawAudioEnergy = 0.85; 

// 1. Đưa tín hiệu qua spring engine để tạo chuyển động vật lý có độ hoãn mượt mà
const dampedAudioSpring = spring({
  frame,
  fps,
  config: { damping: 12 },
});

// 2. Nội suy và giới hạn tuyệt đối biên độ biến dạng 3D trong khoảng an toàn [1.0, 1.15]
const safe3dScale = interpolate(
  dampedAudioSpring * rawAudioEnergy,
  [0, 1],
  [1.0, 1.15],
  {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }
);


4.2. Lỗi 3D Depth Collapse (Khối Rubik dẹt thành 2D khi rotateY = 90 độ)

* Phân tích hình học: Khi quay một đối tượng không gian 3D xung quanh trục Y đến chính xác góc 90 độ, nếu khung chứa (container) thiếu thuộc tính khoảng cách quan sát góc nhìn (perspective), ma trận chiếu song song (orthographic projection collapse) sẽ làm tiêu tan toàn bộ độ sâu Z. Đối tượng bị dẹt hoàn toàn thành một đường thẳng hoặc không gian phẳng 2D.
* Cách khắc phục: Thiết lập thuộc tính perspective cho thẻ cha và kích hoạt transformStyle: 'preserve-3d' cho phần tử xoay 3D, kết hợp nội suy góc quay theo khung hình:

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const Card3DRotation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotateSpring = spring({ frame, fps, config: { damping: 14 } });
  
  // Xoay mượt mà từ 0 đến 180 độ
  const rotationY = interpolate(rotateSpring, [0, 1], [0, 180]);

  return (
    // Thẻ cha bắt buộc phải có perspective để giữ khoảng cách không gian 3D
    <div style={{ perspective: '1000px', width: '100%', height: '100%' }}>
      <div
        style={{
          width: '400px',
          height: '250px',
          backgroundColor: '#1E293B',
          borderRadius: '16px',
          // Bắt buộc preserve-3d để không bị dẹt thành 2D ở góc 90 độ
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotationY}deg)`,
        }}
      >
        <h3 style={{ color: '#0052FF' }}>3D Depth Preserved</h3>
      </div>
    </div>
  );
};


4.3. Lỗi thiếu Camera Zoom Intro cho Phase 1 làm đoạn đầu bị tĩnh

* Phân tích trải nghiệm thị giác: 3 giây đầu tiên (Frame 0–90) quyết định khả năng giữ chân người xem. Việc thiếu chuyển động camera dẫn nhập khiến phân cảnh mở đầu bị trơ và thiếu tính điện ảnh (cinematic).
* Giải pháp với mã chuẩnized: Tích hợp mô hình heroSpring từ WebsiteShowcase.tsx để thực hiện kỹ thuật Camera Zoom In (từ tỉ lệ 1.2 về 1.0) kết hợp cùng biến đổi vị trí Y ngay trên một thuộc tính inline transform duy nhất:

import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const HeroCameraIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Khởi tạo heroSpring với damping: 12 chính xác theo WebsiteShowcase.tsx
  const heroSpring = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  // Zoom camera nhẹ nhàng từ 1.2 về 1.0
  const cameraZoom = interpolate(heroSpring, [0, 1], [1.2, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Đưa vị trí Hero từ 40px lên 0px
  const heroY = interpolate(heroSpring, [0, 1], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const heroOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center' }}>
      {/* Kết hợp đồng bộ scale(cameraZoom) và translateY(heroY) trên một thuộc tính transform */}
      <div
        style={{
          opacity: heroOpacity,
          transform: `translateY(${heroY}px) scale(${cameraZoom})`,
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '64px', color: '#FFFFFF' }}>Turn Any Website into Video</h1>
      </div>
    </AbsoluteFill>
  );
};


Nắm vững việc điều khiển hiệu ứng visual chuẩn xác tạo tiền đề để chúng ta đóng gói toàn bộ các biến số này thành các bảng điều khiển giao diện UI trực quan trong Remotion Studio.

5. CHUẨN HÓA QUẢN LÝ BIẾN VÀ TƯƠNG TÁC VỚI REMOTION STUDIO (GUI CONTROLS)

Để tối ưu hóa năng suất làm việc giữa kỹ sư tự động hóa và đội ngũ biên tập nội dung, việc loại bỏ hoàn toàn các hằng số viết cứng (hardcoded constants) là điều kiện bắt buộc. Tích hợp giao diện điều khiển GUI thông qua Zod Schema cho phép tùy chỉnh tham số video trực quan trên Remotion Studio mà không cần chỉnh sửa mã nguồn React.

5.1. Lỗi hardcode thông số chuyển động thiếu GUI Controls Zod Schema trong Remotion Studio

* Hệ quả: Đội ngũ thiết kế/marketing không thể thay đổi tiêu đề, màu sắc thương hiệu hay danh sách tính năng trên GUI của Remotion Studio. Mỗi thay đổi nhỏ đều buộc kỹ sư phải mở file React để sửa code và thực hiện lại tiến trình build.
* Tái cấu trúc kiến trúc: Chuyển đổi từ hằng số cứng sang Dynamic Props được kiểm tra và bảo vệ bởi Zod Schema. Schema này phải ánh xạ hoàn chỉnh 100% cấu trúc interface WebsiteShowcaseProps từ mã nguồn thực tế (bao gồm brand, hero, mảng features chứa title và description, và callToAction).
* Mã nguồn triển khai chuẩn hóa:

import React from 'react';
import { Composition } from 'remotion';
import { z } from 'zod';
import { WebsiteShowcase } from './compositions/WebsiteShowcase';

// 1. Định nghĩa Zod Schema cho phần tử con Feature
export const FeatureSchema = z.object({
  title: z.string(),
  description: z.string(),
});

// 2. Định nghĩa Zod Schema tổng thể phản ánh chính xác 100% WebsiteShowcaseProps
export const WebsiteShowcaseSchema = z.object({
  brand: z.object({
    name: z.string(),
    logoUrl: z.string(),
    primaryColor: z.string(),
    backgroundColor: z.string(),
    textColor: z.string(),
  }),
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  features: z.array(FeatureSchema), // Bao hàm chính xác mảng các features
  callToAction: z.object({
    text: z.string(),
    buttonColor: z.string(),
  }),
});

// 3. Đăng ký Composition với Zod Schema và defaultProps hoàn chỉnh trong Root.tsx
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="WebsiteShowcase"
      component={WebsiteShowcase}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
      schema={WebsiteShowcaseSchema}
      defaultProps={{
        brand: {
          name: 'Automated Video Engine',
          logoUrl: 'https://remotion.dev/img/logo-small.png',
          primaryColor: '#0052FF',
          backgroundColor: '#0F172A',
          textColor: '#FFFFFF',
        },
        hero: {
          title: 'Turn Any Website into Video',
          subtitle: 'Programmatic video generation powered by Remotion & Google Cloud Run',
        },
        features: [
          {
            title: 'Dynamic Parameterization',
            description: 'Pass custom JSON payloads to generate unique videos on demand.',
          },
          {
            title: 'Cloud Scale Rendering',
            description: 'Render videos fast with Google Cloud Run serverless infrastructure.',
          },
        ],
        callToAction: {
          text: 'Get Started at yourwebsite.com',
          buttonColor: '#22C55E',
        },
      }}
    />
  );
};


Bảng tra cứu vận hành và danh mục kiểm tra nhanh dưới đây sẽ tổng hợp toàn bộ tri thức chẩn đoán để phục vụ cho các hoạt động kiểm thử hàng ngày.

6. BẢNG TRA CỨU NHANH VÀ CHECKLIST PHÒNG THỪA SỰ CỐ (DAILY QUICK REFERENCE)

Bảng tra cứu sự cố và danh mục kiểm tra 5 bước được thiết kế như một công cụ phản ứng nhanh cho kỹ sư lập trình video tự động trước khi thực hiện commit mã nguồn, kích hoạt Google Jules Agent hoặc khởi chạy luồng render chính thức trên đám mây.

Bảng tra cứu chẩn đoán sự cố nhanh

Mã / Tên Lỗi	Nguyên Nhân Cốt Lõi	Quy Trình Xử Lý Nhanh	Mức Độ Ảnh Hưởng
TS-01: Lỗi cú pháp interpolate(frame,,)	Thừa dấu phẩy hoặc thiếu tham số frame làm gãy chữ ký hàm Remotion.	Kiểm tra cú pháp, bổ sung frame và tùy chọn bắt buộc { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }.	Nghiêm trọng (Critical)
TS-02: Import sai đường dẫn Root.tsx	Nhầm lẫn giữa các thư mục components/, scenes/ và compositions/.	Sửa lại đường dẫn import trong Root.tsx trỏ chính xác về src/compositions/WebsiteShowcase.	Cao (High)
GIT-01: Ghi đè mã nguồn do Jules Agent	Lệch nhánh Git (Branch divergence); đẩy code cục bộ khi chưa rebase/merge PR của Jules trên main.	Chạy SOP Git: git fetch, git checkout main, git pull, git rebase main nhánh feature rồi Fast-Forward merge trước khi push main.	Nghiêm trọng (Critical)
RENDER-01: Văng méo khối 3D do âm thanh	Dùng trực tiếp giá trị biên độ âm thanh thô (audioEnergy) vào ma trận biến đổi 3D.	Bọc biên độ âm thanh qua hàm lò xo spring({ damping: 12 }) và dùng interpolate siết biên an toàn.	Cao (High)
RENDER-02: 3D Depth Collapse	Thiếu thuộc tính chiếu độ sâu perspective CSS trên container khi rotateY = 90deg.	Thêm perspective: 1000px ở khung chứa cha và transformStyle: 'preserve-3d' ở phần tử con xoay 3D.	Trung bình (Medium)
RENDER-03: Khung hình Phase 1 bị tĩnh	Thiếu chuyển động camera mở đầu khiến 3 giây đầu của video giảm tính hấp dẫn.	Áp dụng hiệu ứng heroSpring (damping: 12) kết hợp gộp scale(${cameraZoom}) và translateY(${heroY}px).	Trung bình (Medium)
GUI-01: Hardcode thông số, thiếu Zod Schema	Không gán thuộc tính schema Zod trong thẻ <Composition /> của Root.tsx.	Khai báo Zod Schema đầy đủ các nhánh (brand, hero, features, callToAction) và truyền vào <Composition schema={...} />.	Trung bình (Medium)

Danh mục kiểm tra vận hành 5 bước (Daily Pre-Flight Checklist)

1. [Git Hygiene & Sync Validation]: Thực thi đầy đủ chuỗi lệnh SOP Git (git fetch -> git pull origin main -> git rebase main -> git merge -> git push origin main) để đảm bảo nhánh main cục bộ và remote đã đồng bộ hoàn toàn trước khi tạo task mới cho google-labs-jules[bot].
2. [Type Safety & Static Build Check]: Thực thi lệnh npx tsc --noEmit để đảm bảo không còn bất kỳ lỗi cú pháp TypeScript, thừa dấu phẩy hay sai lệch chữ ký hàm interpolate nào trong toàn bộ dự án.
3. [Composition Path Integrity]: Kiểm tra file src/Root.tsx để xác nhận tất cả các thành phần Composition đầu bảng đều được import từ thư mục src/compositions/ thay vì import nhầm từ src/components/.
4. [Motion Physics & Clamping Verification]: Rà soát toàn bộ các hàm spring để đảm bảo cấu hình damping phân tầng chính xác (damping: 12 cho Hero/CTA, damping: 14 cho Feature Cards) và 100% các hàm interpolate đều có tùy chọn clamp giới hạn biên.
5. [GUI Controls & Zod Schema Parity]: Xác nhận đối tượng WebsiteShowcaseSchema đã bao hàm đầy đủ mảng features và khớp chính xác 100% với giao diện WebsiteShowcaseProps để đảm bảo bảng điều khiển Remotion Studio GUI vận hành trơn tru.
