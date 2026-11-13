export type Language = 'en' | 'kr' | 'vi';

export interface ShowcaseDictionary {
  nav: {
    brandSubtitle: string;
    engineLiveBadge: string;
    links: {
      pipeline: string;
      brandAssets: string;
      telemetry: string;
      deliverables: string;
    };
    githubTooltip: string;
    portfolioBtn: string;
  };
  hero: {
    categoryBadge: string;
    headline: string;
    subheadline: string;
    badges: {
      fps: string;
      engine: string;
      ai: string;
      zeroAE: string;
    };
    player: {
      modeMaster: string;
      modeTelemetry: string;
      compositionSelect: string;
      compCommercial: string;
      compConvergence: string;
      liveStatus: string;
      fpsGauge: string;
      resolution: string;
      frameLabel: string;
      timecodeLabel: string;
      motionCurve: string;
      activeSequence: string;
      cameraZ: string;
      damping: string;
      pitch: string;
      clickHint: string;
    };
  };
  pillars: {
    sectionTag: string;
    sectionTitle: string;
    sectionDesc: string;
    pillar1: {
      tag: string;
      title: string;
      desc: string;
      specs: string[];
      uiTag: string;
    };
    pillar2: {
      tag: string;
      title: string;
      desc: string;
      specs: string[];
      uiTag: string;
    };
    pillar3: {
      tag: string;
      title: string;
      desc: string;
      specs: string[];
      uiTag: string;
    };
  };
  pipeline: {
    sectionTag: string;
    sectionTitle: string;
    sectionDesc: string;
    vsTitle: string;
    oldWayTitle: string;
    oldWayDesc: string;
    oldWayPoints: string[];
    newWayTitle: string;
    newWayDesc: string;
    tracks: {
      track1: {
        title: string;
        engine: string;
        desc: string;
        badge: string;
      };
      track2: {
        title: string;
        engine: string;
        desc: string;
        badge: string;
      };
      track3: {
        title: string;
        engine: string;
        desc: string;
        badge: string;
      };
    };
  };
  telemetrySection: {
    sectionTag: string;
    sectionTitle: string;
    sectionDesc: string;
    curvesTitle: string;
    curvesDesc: string;
    mathSpecs: {
      formula1Name: string;
      formula1Expr: string;
      formula1Desc: string;
      formula2Name: string;
      formula2Expr: string;
      formula2Desc: string;
      formula3Name: string;
      formula3Expr: string;
      formula3Desc: string;
    };
  };
  deliverables: {
    sectionTag: string;
    sectionTitle: string;
    sectionDesc: string;
    storyboard: {
      title: string;
      desc: string;
      action: string;
    };
    svgAssets: {
      title: string;
      desc: string;
      action: string;
    };
    masterVideo: {
      title: string;
      desc: string;
      action: string;
    };
    afterEffects: {
      title: string;
      desc: string;
      warningTag: string;
      action: string;
    };
    modal: {
      tag: string;
      headline: string;
      body: string;
      bodyHighlight: string;
      btnHire: string;
      orDivider: string;
      btnAutomate: string;
    };
  };
  storyboardViewer: {
    modalTitle: string;
    downloadBtn: string;
    downloadSubtitle: string;
    phases: {
      phase: string;
      title: string;
      frames: string;
      narrationVn: string;
      narrationKr: string;
      visual: string;
      motionSpec: string;
      audioCue: string;
      perspective?: string;
    }[];
    close: string;
  };
  footer: {
    copyright: string;
    techStack: string;
  };
}

export const showcaseDict: Record<Language, ShowcaseDictionary> = {
  en: {
    nav: {
      brandSubtitle: 'KOREA COMMERCIAL SHOWCASE',
      engineLiveBadge: 'ENGINE LIVE (60FPS)',
      links: {
        pipeline: 'Dual-Track Pipeline',
        brandAssets: 'Brand & Mascot',
        telemetry: 'Motion Physics',
        deliverables: 'Deliverables Hub',
      },
      githubTooltip: 'View Source Code on GitHub',
      portfolioBtn: 'PORTFOLIO ↗',
    },
    hero: {
      categoryBadge: '00 // AUTONOMOUS VIDEO-AS-CODE SPEC',
      headline: 'CRABIT KOREA: THE FUTURE OF VIDEO-AS-CODE',
      subheadline:
        'From a 4-line raw text brief to a commercial, enterprise-grade programmatic video ecosystem running deterministically at 60FPS.',
      badges: {
        fps: 'Deterministic 60FPS',
        engine: 'React + Remotion Engine',
        ai: 'Google Flow AI Plates',
        zeroAE: 'Zero After Effects Keyframe Hell',
      },
      player: {
        modeMaster: 'Commercial Master',
        modeTelemetry: 'Motion Telemetry HUD',
        compositionSelect: 'Composition',
        compCommercial: 'Full 6-Scene Commercial (894f @ 24fps)',
        compConvergence: 'Scene 3 Study Gear Orbit (180f @ 30fps)',
        liveStatus: 'REMOTION VIRTUAL CANVAS // ACTIVE',
        fpsGauge: '60.0 FPS LOCKED',
        resolution: '1920 × 1080 FHD',
        frameLabel: 'FRAME',
        timecodeLabel: 'TIMECODE',
        motionCurve: 'PHYSICS: SPRING (DAMP:14, MASS:0.8)',
        activeSequence: 'ACTIVE SEQUENCE',
        cameraZ: 'CAMERA_Z: 1000px',
        damping: 'SPRING DAMPING: 14',
        pitch: 'ISOMETRIC PITCH: 18.5°',
        clickHint: 'Space or Click to Play / Pause Live Remotion Canvas',
      },
    },
    pillars: {
      sectionTag: '01 // ARCHITECTURAL INNOVATION',
      sectionTitle: 'THREE STRATEGIC PILLARS',
      sectionDesc:
        'Enterprise value additions engineered to transform fragmented visual sketches into a coherent K-Fintech brand narrative.',
      pillar1: {
        tag: 'PILLAR 01 // DESIGN SYSTEM',
        title: 'Brand Identity Foundry',
        desc: 'Standardized K-Fintech pastel & dark squircle design tokens. Formulated clean digital interfaces mirroring Toss & KakaoBank precision.',
        specs: [
          'Pretendard Korean Typography (-0.02em tracking)',
          'Toss Blue (#3182F6) & Emerald Carat (#10B981) Palette',
          'Mechanical 45° CAD Chisel & Micro-Interactions',
        ],
        uiTag: 'TOSS / KAKAOBANK GRADE UI',
      },
      pillar2: {
        tag: 'PILLAR 02 // RIGGING & CONTINUITY',
        title: 'Character & Context Locking',
        desc: 'Locked strict Korean academy student anatomical ratios. Eliminated asset hallucinations and maintained absolute classroom perspective stability.',
        specs: [
          'Deconstructed 2D Vector Rigging (Head/Torso/Limbs)',
          'Seamless Perspective Projection with Zero Drift',
          'Strict 80px Viewport Safe Margin Boundary Rules',
        ],
        uiTag: 'ZERO-HALLUCINATION RIG',
      },
      pillar3: {
        tag: 'PILLAR 03 // MASCOT SYMBOLISM',
        title: 'Mascot Engineering (Crabit Crab)',
        desc: 'Crabit wordplay ➔ Crab mascot raising both claws representing students actively answering questions; diamond-faceted body denotes scholarship Carats.',
        specs: [
          'Dual Raised Claws = Active Classroom Confidence',
          'Diamond Cut Geometry = Earned Carat Scholarship',
          'Real-time SVG Code Injection with Vector Physics',
        ],
        uiTag: 'CARAT CRYSTAL MASCOT',
      },
    },
    pipeline: {
      sectionTag: '02 // WORKFLOW REVOLUTION',
      sectionTitle: 'DUAL-TRACK VIDEO-AS-CODE PIPELINE',
      sectionDesc:
        'Decoupling cinematic AI imagery from deterministic mathematical motion for instant iteration and infinite scalability.',
      vsTitle: 'LEGACY AFTER EFFECTS VS. VIDEO-AS-CODE',
      oldWayTitle: 'Traditional Manual Production (After Effects)',
      oldWayDesc:
        'Hundreds of unlinked keyframe layers, 3-day turnaround for a single copy change, opaque project files, and crashing render queues.',
      oldWayPoints: [
        '3+ Days per script/text revision',
        'Brittle keyframe stacking prone to timeline misalignment',
        'Manual audio sync requiring manual timeline scrubbing',
        'Zero programmatic parameter exposure or multi-tenant reuse',
      ],
      newWayTitle: 'Crabit Dual-Track Automation Architecture',
      newWayDesc:
        'Code-driven render engine where visuals, physics equations, audio cues, and copy are compiled into zero-drift 60FPS video.',
      tracks: {
        track1: {
          title: 'Track A: Google Flow (Visual AI)',
          engine: 'Flow Shot 01 – 05 Cinematic Plates',
          desc: 'Generates atmospheric Korean Hagwon classroom environments, expressive student postures, and lighting context without video artifacts.',
          badge: 'VISUAL AI SUBSTRATE',
        },
        track2: {
          title: 'Track B: Remotion + React (Code Engine)',
          engine: 'Deterministic Math & Physics',
          desc: 'Executes spring physics (damping: 14), bezier camera dollies, 3D Three.js hardware props, and 60FPS parametric typography.',
          badge: 'REMOTION CORE',
        },
        track3: {
          title: 'Track C: Interactive Sound Design',
          engine: '15+ Synchronized Precision SFX',
          desc: 'Precise audio bus triggers: chalk writing loops, card flips, drawer slides, and ascending scholarship chimes synced down to the exact frame.',
          badge: 'DETERMINISTIC SFX',
        },
      },
    },
    telemetrySection: {
      sectionTag: '03 // MATHEMATICAL RIGOR',
      sectionTitle: 'TELEMETRY & MOTION PHYSICS',
      sectionDesc:
        'Every pixel motion is an analytical equation clamped within strict boundary intervals. Zero arbitrary manual keyframing.',
      curvesTitle: 'Mathematical Easing Curves',
      curvesDesc:
        'Physics-driven spring equations and continuous bezier curves prevent jarring stops and visual drift.',
      mathSpecs: {
        formula1Name: 'SPRING HARMONIC OSCILLATOR',
        formula1Expr: 'x(t) = e^(-ζω_n t) * (A cos(ω_d t) + B sin(ω_d t))',
        formula1Desc: 'Applied to UI cards & study props entry. Damping ζ = 0.85, mass = 0.8kg.',
        formula2Name: '3D CAMERA PERSPECTIVE FRUSTUM',
        formula2Expr: 'H_frustum = 2 * cameraZ * tan(FOV * π / 360)',
        formula2Desc: 'Calculated dynamically to guarantee 80px safe viewport margin at all angles.',
        formula3Name: 'CLAMPED BEZIER INTERPOLATION',
        formula3Expr: 'f(t) = interpolate(frame, [t_0, t_1], [v_0, v_1], { clamp: true })',
        formula3Desc: 'Guarantees zero infinite drift beyond frame boundaries across all resolutions.',
      },
    },
    deliverables: {
      sectionTag: '04 // PRODUCTION ASSETS',
      sectionTitle: 'DELIVERABLES & RESOURCE HUB',
      sectionDesc:
        'Transparent, production-grade deliverables: inspect the live Remotion storyboard, vector legos, and master commercial video.',
      storyboard: {
        title: 'Storyboard Showcase',
        desc: '5-phase cinematic breakdown sampled directly from project sequences with cues & camera angles.',
        action: 'INSPECT STORYBOARD',
      },
      svgAssets: {
        title: 'Vector Assets (.ZIP)',
        desc: '7 Study Gear props, Carat Crab Diamond Mascot & student rig vectors.',
        action: 'DOWNLOAD SVG ASSETS',
      },
      masterVideo: {
        title: 'Master Video (.MP4)',
        desc: 'Full HD 1080p commercial with 15-channel synchronized SFX.',
        action: 'DOWNLOAD MASTER MP4',
      },
      afterEffects: {
        title: 'After Effects (.AEP)',
        desc: 'Legacy manual workflow project package with manual keyframe layers.',
        warningTag: '⚠️ VINTAGE MANUAL TRAP',
        action: 'FETCH .AEP PROJECT',
      },
      modal: {
        tag: 'MANUAL WORKFLOW WARNING // SYSTEM ALERT',
        headline: 'DO YOU REALLY WANT TO RETURN TO MANUAL LABOR?',
        body: 'Traditional After Effects files contain hundreds of brittle keyframe layers, requiring 3 days of tedious tweaking every time a stakeholder modifies 4 lines of script...',
        bodyHighlight:
          'Here, the entire commercial video is 100% controlled, configured, and rendered via Code!',
        btnHire: '💼 Hire Me for Manual AE Projects',
        orDivider: 'OR EMBRACE THE FUTURE',
        btnAutomate: '🚀 Explore Video-as-Code Automation!',
      },
    },
    storyboardViewer: {
      modalTitle: 'CRABIT KOREA // PRODUCTION BLUEPRINT & STORYBOARD (10 PLATES)',
      downloadBtn: 'DOWNLOAD BLUEPRINT PDF (3.6MB)',
      downloadSubtitle: 'PRINT-READY ARCHITECTURAL & CINEMATIC SPECIFICATION',
      phases: [
        {
          phase: 'SCENE 01 // FRAMES 000 – 120',
          title: 'Initial Conflict & Motivation Deficit',
          frames: '000 – 120 (5.0s @ 24fps)',
          narrationVn: 'Động lực, nói thì dễ hơn làm.',
          narrationKr: '동기부여, 말처럼 쉽지 않죠.',
          visual: 'Academy (Hagwon) classroom space. Director observes with a burdened, concerned gaze. Student slumps over desk amidst heavy textbooks, exhausted and disoriented. Wall clock ticks sluggishly, accentuating the suffocation of traditional study devoid of rewards.',
          motionSpec: 'Camera slow push-in scale 1.0 -> 1.15 via Easing.bezier(0.42, 0, 0.58, 1). Clock second-hand clamped dilation.',
          audioCue: 'Muffled classroom silence, heavy sigh, dull mechanical clock ticking with low-pass dampening filter.',
          perspective: 'DEPTH: CLASSROOM ENVIRONMENT (Z: 10 - 20)',
        },
        {
          phase: 'SCENE 02 // FRAMES 121 – 230',
          title: 'Solution Discovery & Technological Turning Point',
          frames: '121 – 230 (4.6s @ 24fps)',
          narrationVn: 'Nhất là khi nỗ lực thích đáng không đi kèm phần thưởng xứng đáng!',
          narrationKr: '적절한 노력에 보상이 없다면 말이죠!',
          visual: 'Director steps forward holding aloft the smartphone running the Crabit app. The app interface radiates an emerald-cyan lens flare. Student face lights up, eyes widening as expression snaps from apathy to wonder and curiosity.',
          motionSpec: 'Perspective standard: Clock dial recedes to deepest background (zIndex: 10), Smartphone claims dominant foreground (zIndex: 50). Volumetric cyan flare bloom.',
          audioCue: 'Dramatic transition chime, high-frequency crystal resonance shimmer, sudden intake of breath.',
          perspective: 'PERSPECTIVE: SMARTPHONE zIndex: 50 | CLOCK zIndex: 10',
        },
        {
          phase: 'SCENE 2.5 (PHA 1) // FRAMES 231 – 265',
          title: 'Horizontal Kinetic Dash (Supersonic Speed)',
          frames: '231 – 265 (1.5s @ 24fps)',
          narrationVn: 'Vòng tuần hoàn học tập chủ động! Chuẩn mực động lực mới - Crabit!',
          narrationKr: '주도적인 학습 선순환! 동기부여의 새로운 기준 크래빗!',
          visual: 'Energy sphere harboring a quartz diamond launches horizontally from screen-left straight into the center with an aerodynamic blurred tail. Reverse speed lines streak by in high-velocity wind-shear.',
          motionSpec: 'Horizontal position X: -100vw -> 0 (Center) using Easing.bezier(0.16, 1, 0.3, 1). Velocity blur(14px) decays to 0px at center lock.',
          audioCue: 'Hyper-speed sonic boom whoosh, Doppler pitch sweep from 350Hz up to 1.8kHz.',
          perspective: 'LAYER: AERODYNAMIC ENERGY SPHERE',
        },
        {
          phase: 'SCENE 2.5 (PHA 2) // FRAMES 266 – 300',
          title: 'Center Energy Implosion & Swell Oscillation',
          frames: '266 – 300 (1.4s @ 24fps)',
          narrationVn: '(Tiếp tục mạch âm nhạc cao trào tích tụ áp suất trước điểm nổ)',
          narrationKr: '(에너지 극대화 및 폭발 직전 고주파 긴장감 형성)',
          visual: 'The sphere brakes instantly at coordinate center, shuddering in high-frequency oscillation and swelling to near 200% radius, accumulating immense kinetic pre-detonation pressure.',
          motionSpec: 'Center jitter dX, dY: sin(frame * 1.5) * 6px (24Hz oscillation). Radial scale expands 1.0 -> 1.85 with quadratic ease-in.',
          audioCue: 'Sub-bass rumble build-up (40Hz) rising to high-tension capacitor charging whine.',
          perspective: 'LAYER: CENTER SHOCKWAVE OSCILLATION',
        },
        {
          phase: 'SCENE 2.5 (PHA 3) // FRAMES 301 – 340',
          title: 'Photoluminescent Detonation: 7 Study Gears Eruption',
          frames: '301 – 340 (1.6s @ 24fps)',
          narrationVn: '(Điểm rơi cao trào bung nổ âm thanh - Climax Drop Beat)',
          narrationKr: '(클라이맥스 드롭 비트와 전방위 방사 폭발)',
          visual: 'Energy sphere detonates in a blinding white flash. 7 Study Gear tools (3D Textbook, Stylus Pen, Triangle Ruler, Compass, Magnifying Glass, 100-Score Exam Sheet, Smart Calculator) erupt from the center in spring geometry to 7 corners.',
          motionSpec: 'Radial Spring(mass: 1.0, damping: 8, stiffness: 120). 7-Star angular dispersion Theta_i = i * (360° / 7). Clamped dispersion <= 0.12.',
          audioCue: 'Massive acoustic crystalline explosion, crystal chime burst, sparkling high-end reverb.',
          perspective: 'PROP LEGO: 7-GEAR RADIAL SPRINGS (zIndex: 40)',
        },
        {
          phase: 'SCENE 2.5 (PHA 4) // FRAMES 341 – 380',
          title: 'Zero-G Orbital Swap Choreography',
          frames: '341 – 380 (1.6s @ 24fps)',
          narrationVn: '(Giai điệu điều hòa hoán đổi quỹ đạo bay)',
          narrationKr: '(유연하고 경쾌한 수학적 궤도 교환 리듬)',
          visual: '7 Study Gear props float weightlessly in zero-G, bobbing up and down, soaring along parabolic arcs to smoothly swap orbital coordinates with each other in mathematical rhythm.',
          motionSpec: 'Parabolic orbital swap permutation. Zero-G sine float Y-Amp: 12px. 3D self-rotation around Y axis from -15° to +15°.',
          audioCue: 'Harmonic marimba arpeggio notes, soft bubbly whooshes as tools cross orbital apex.',
          perspective: 'MOTION ENGINE: ZERO-G FLOAT & ORBITAL SWAP',
        },
        {
          phase: 'SCENE 2.5 (PHA 5) // FRAMES 381 – 410',
          title: 'Centripetal Suction & Hyper Crash-Zoom',
          frames: '381 – 410 (1.2s @ 24fps)',
          narrationVn: '(Hiệu ứng bẻ cong không gian mở cổng portal)',
          narrationKr: '(다음 앱 인터페이스 화면으로 진입하는 광속 크래시 줌)',
          visual: 'All 7 tools are suctioned directly back toward the central diamond sphere at maximum acceleration. The sphere expands violently into the camera lens, executing a high-speed Crash-Zoom portal into the mobile app.',
          motionSpec: 'Centripetal implosion r(t) -> 0 with Easing.in(Easing.exp). Camera scale explodes from 1.0 to 50.0. White-out flash transition.',
          audioCue: 'Vortex vacuum suction sound, followed by high-impact sub-bass drop and crisp camera shutter wipe.',
          perspective: 'TRANSITION: CAMERA CRASH-ZOOM (SCALE 1.0 -> 50.0)',
        },
        {
          phase: 'SCENE 03 // FRAMES 411 – 500',
          title: 'Effort Unleashed & The Crabit Claw Signature',
          frames: '411 – 500 (3.7s @ 24fps)',
          narrationVn: 'Crabit tích lũy \'Carat\' mỗi khi học sinh hoàn thành nhiệm vụ...',
          narrationKr: '크래빗은 학생이 미션을 완료할 때마다 ‘캐럿’을 적립하고...',
          visual: 'Student enthusiastically raises both arms to volunteer in class, synchronizing with the iconic Crabit claw pose. Phone app slides up from screen-bottom, mission badges pop-in with bubbly acoustics, and Carat balance counts up rapidly.',
          motionSpec: 'App slide-up Y: 100vh -> 0vh via Spring(damping: 14, stiffness: 110). Carat counter linearly interpolates 0 -> 12,500. Mission badges stagger pop-in scale 0 -> 1.15 -> 1.0.',
          audioCue: 'Playful bubbling pop SFX for each badge, rapid coin count chime, upbeat energetic percussion track.',
          perspective: 'UI LAYER: CRABIT APP ENGINE & CARAT COUNTER',
        },
        {
          phase: 'SCENE 04 // FRAMES 501 – 550',
          title: 'Scholarship Transformation & 3D Metallic Debit Card',
          frames: '501 – 550 (2.1s @ 24fps)',
          narrationVn: '...và nạp thẳng vào thẻ Crabit như một suất học bổng thực thụ.',
          narrationKr: '...이를 실제 장학금처럼 크래빗 카드에 충전해 줍니다.',
          visual: 'Digital Carats transform into tangible scholarship funds on the physical card. The premium metallic Crabit Debit Card executes a breathtaking 720° 3D flip amid a shimmering rainfall of crystalline gems.',
          motionSpec: 'Three.js mesh transform: RotationY: 0 -> 720°, RotationX: -15°, Scale: 1.0 -> 1.25 -> 1.0. 120 diamond particles emit with gravity 0.4px/f^2. Specular reflection scan.',
          audioCue: 'Deep metallic whoosh, luxury card flip friction SFX, resonant harmonic chord resolve.',
          perspective: '3D MESH ENGINE: THREE.JS METALLIC DEBIT CARD (zIndex: 60)',
        },
        {
          phase: 'SCENE 04 (OUTRO) // FRAMES 551 – 590',
          title: 'Triumphant Ascension: Student & Mascot Soaring Up',
          frames: '551 – 590 (1.6s @ 24fps)',
          narrationVn: 'Học tập chủ động – Tương lai rộng mở cùng Crabit!',
          narrationKr: '주도적인 학습 선순환! 크래빗과 함께 미래로 비상하세요!',
          visual: 'The empowered student and crab mascot Crabit take off together, soaring triumphantly into the radiant sky. The student’s expression radiates pride, optimism, and unyielding confidence.',
          motionSpec: 'Parabolic ascension: Y trajectory shifts -1200px past top screen edge with Easing.out(Easing.cubic). Mascot crab claw celebration. 80 downward speed line particles.',
          audioCue: 'High-velocity jet whoosh, triumphant piano + synth resolve chords, grand finale outro.',
          perspective: 'DYNAMIC VECTOR RIG: STUDENT & MASCOT IN FLIGHT (zIndex: 50)',
        },
      ],
      close: '[ × CLOSE STORYBOARD ]',
    },
    footer: {
      copyright: 'CRABIT KOREA // VIDEO-AS-CODE AUTOMATION ENGINE',
      techStack: 'POWERED BY REMOTION 4.0 • REACT 18 • THREE.JS • GOOGLE FLOW AI • CYBERNETIC SWISS BRUTALISM',
    },
  },

  kr: {
    nav: {
      brandSubtitle: '한국 커머셜 쇼케이스',
      engineLiveBadge: '엔진 라이브 (60FPS)',
      links: {
        pipeline: '듀얼 트랙 파이프라인',
        brandAssets: '브랜드 & 마스코트',
        telemetry: '모션 피직스',
        deliverables: '산출물 허브',
      },
      githubTooltip: 'GitHub 코드베이스 보기',
      portfolioBtn: '포트폴리오 ↗',
    },
    hero: {
      categoryBadge: '00 // 비디오 애즈 코드 자동화 스펙',
      headline: 'CRABIT KOREA: 비디오 애즈 코드의 미래',
      subheadline:
        '단 4줄의 텍스트 기획에서 출발하여 60FPS로 결정론적 렌더링되는 엔터프라이즈 비디오 애즈 코드 생태계.',
      badges: {
        fps: '결정론적 60FPS',
        engine: 'React + Remotion 엔진',
        ai: 'Google Flow AI 비주얼',
        zeroAE: '애프터 이펙트 키프레임 지옥 제로',
      },
      player: {
        modeMaster: '상업용 마스터 영상',
        modeTelemetry: '모션 텔레메트리 HUD',
        compositionSelect: '컴포지션 선택',
        compCommercial: '전체 6개 씬 종합 커머셜 (894프레임 @ 24fps)',
        compConvergence: '씬 3 학습도구 궤도 수렴 (180프레임 @ 30fps)',
        liveStatus: '리모션 버추얼 캔버스 // 정상 작동 중',
        fpsGauge: '60.0 FPS 고정',
        resolution: '1920 × 1080 FHD',
        frameLabel: '현재 프레임',
        timecodeLabel: '타임코드',
        motionCurve: '물리 엔진: 스프링 (감쇠:14, 질량:0.8)',
        activeSequence: '실시간 시퀀스',
        cameraZ: '카메라 Z축: 1000px',
        damping: '스프링 감쇠 계수: 14',
        pitch: '아이소메트릭 피치: 18.5°',
        clickHint: '스페이스바 또는 클릭하여 리모션 캔버스 재생 / 일시정지',
      },
    },
    pillars: {
      sectionTag: '01 // 전략적 아키텍처 혁신',
      sectionTitle: '세 가지 핵심 전략적 기여',
      sectionDesc:
        '단편적인 아이디어를 토스(Toss)와 카카오뱅크 수준의 완성도 높은 K-핀테크 브랜드 경험으로 격상시킨 3대 기둥.',
      pillar1: {
        tag: '기둥 01 // 디자인 시스템',
        title: '브랜드 아이덴티티 파운드리',
        desc: 'K-핀테크 파스텔 및 다크 스퀘어클 토큰 표준화. 토스와 카카오뱅크의 정밀한 인터페이스 감성을 담은 Crabit UI/UX 설계.',
        specs: [
          '프리텐다드(Pretendard) 한국어 타이포그래피 (-0.02em 자간)',
          '토스 블루(#3182F6) 및 에메랄드 캐럿(#10B981) 팔레트',
          '45도 기계식 CAD 치즐 및 마이크로 인터랙션',
        ],
        uiTag: '토스 / 카카오뱅크 스타일 UI',
      },
      pillar2: {
        tag: '기둥 02 // 리깅 및 일관성 잠금',
        title: '캐릭터 & 학원 공간 잠금',
        desc: '한국 학원생 캐릭터의 해부학적 신체 비율을 엄격히 고정. 불필요한 AI 환각 요소를 차단하고 학원 교실 맥락의 완벽한 일관성 유지.',
        specs: [
          '분해 조립형 2D 벡터 리깅 키트 (머리/몸통/사지 분리)',
          '좌표 튐 없는 원근감 투영 및 매끄러운 시점 전환',
          '화면 경계 80px 세이프 마진 가이드라인 100% 준수',
        ],
        uiTag: '환각 제로 캐릭터 리깅',
      },
      pillar3: {
        tag: '기둥 03 // 마스코트 상징 공학',
        title: '마스코트 엔지니어링 (크래빗 게)',
        desc: 'Crabit 언어유희 ➔ 적극적으로 발표하는 학생을 상징하는 두 집게발과 다이아몬드 캐럿 장학금을 상징하는 입체 결정체 몸체.',
        specs: [
          '높이 든 두 집게발 = 수업 참여와 자신감 상징',
          '다이아몬드 패싯 바디 = 누적되는 캐럿 장학금',
          '실시간 SVG 코드 주입 및 물리 반사 렌더링',
        ],
        uiTag: '캐럿 크리스탈 마스코트',
      },
    },
    pipeline: {
      sectionTag: '02 // 제작 파이프라인 혁신',
      sectionTitle: '듀얼 트랙 비디오 애즈 코드 파이프라인',
      sectionDesc:
        '시네마틱 AI 비주얼과 수학적으로 완벽한 모션 코드를 분리 결합하여 무한 수정과 즉각적인 렌더링 지원.',
      vsTitle: '전통적 애프터 이펙트 VS. 비디오 애즈 코드',
      oldWayTitle: '전통적인 수작업 제작 (After Effects)',
      oldWayDesc:
        '수백 개의 엉킨 키프레임 레이어, 대사 1줄 수정에 3일 소요, 무거운 프로젝트 파일과 잦은 렌더 크래시.',
      oldWayPoints: [
        '텍스트/수치 수정 요청 시 최소 3일 이상 소요',
        '키프레임 레이어가 복잡하여 미세 조정 시 싱크 파괴',
        '오디오 파형을 수동으로 일일이 들어가며 맞추는 비효율',
        '프로그래밍 방식의 자동화 및 다중 렌더링 불가',
      ],
      newWayTitle: '크래빗 듀얼 트랙 자동화 아키텍처',
      newWayDesc:
        '시각 자산, 물리 방정식, 오디오 큐, 텍스트가 코드로 컴파일되어 0.1프레임의 오차도 없이 60FPS로 렌더링.',
      tracks: {
        track1: {
          title: '트랙 A: Google Flow (비주얼 AI)',
          engine: 'Flow 샷 01 – 05 시네마틱 플레이트',
          desc: '한국 학원 교실 환경, 학생의 미세한 감정선 및 시네마틱 조명 원판을 영상 깨짐 없이 안정적으로 생성.',
          badge: '비주얼 AI 기반',
        },
        track2: {
          title: '트랙 B: Remotion + React (코드 엔진)',
          engine: '결정론적 수학 & 물리 연산',
          desc: '스프링 물리(감쇠: 14), 베지어 곡선 카메라 돌리, Three.js 3D 기기 렌더링 및 60FPS 키네틱 타이포그래피 처리.',
          badge: '리모션 코어',
        },
        track3: {
          title: '트랙 C: 인터랙티브 사운드 디자인',
          engine: '15개 동기화 정밀 SFX 시스템',
          desc: '칠판 필기음, 카드 뒤집기, 서랍 열림, 장학금 적립 차임벨 등이 프레임 단위로 완벽하게 트리거.',
          badge: '결정론적 SFX',
        },
      },
    },
    telemetrySection: {
      sectionTag: '03 // 수학적 정밀성',
      sectionTitle: '텔레메트리 & 모션 피직스',
      sectionDesc:
        '모든 픽셀의 이동은 수학 공식으로 제어되며 명시적인 경계값으로 클램핑됩니다. 감에 의존하는 수동 키프레임 배제.',
      curvesTitle: '수학적 이징 곡선 (Mathematical Curves)',
      curvesDesc:
        '물리 기반 스프링 방정식과 매끄러운 3차 베지어 곡선으로 급격한 감속이나 프레임 이탈 방지.',
      mathSpecs: {
        formula1Name: '스프링 조화 진동자 방정식',
        formula1Expr: 'x(t) = e^(-ζω_n t) * (A cos(ω_d t) + B sin(ω_d t))',
        formula1Desc: 'UI 카드 및 학습 도구 등장에 적용. 감쇠비 ζ = 0.85, 질량 m = 0.8kg.',
        formula2Name: '3D 카메라 시야각 프러스텀 높이',
        formula2Expr: 'H_frustum = 2 * cameraZ * tan(FOV * π / 360)',
        formula2Desc: '어떤 회전 각도에서도 80px 안전 마진을 유지하도록 실시간 동적 계산.',
        formula3Name: '경계 클램핑 보간 함수',
        formula3Expr: 'f(t) = interpolate(frame, [t_0, t_1], [v_0, v_1], { clamp: true })',
        formula3Desc: '프레임 범위를 벗어난 무한 표류(drift)를 100% 원천 차단.',
      },
    },
    deliverables: {
      sectionTag: '04 // 프로젝트 산출물',
      sectionTitle: '산출물 및 리소스 허브',
      sectionDesc:
        '프로덕션 레벨의 투명한 결과물: 프로젝트 실제 시퀀스를 담은 스토리보드 뷰어, 벡터 레고 킷 및 마스터 영상을 확인하세요.',
      storyboard: {
        title: '스토리보드 쇼케이스',
        desc: '프로젝트 실제 씬과 프레임 스펙, 카메라 연출 큐가 담긴 5단계 시네마틱 기획서.',
        action: '스토리보드 열람하기',
      },
      svgAssets: {
        title: '벡터 에셋 (.ZIP)',
        desc: '7가지 학습 도구, 캐럿 게 다이아몬드 마스코트 및 학생 리깅 벡터 풀세트.',
        action: 'SVG 에셋 다운로드',
      },
      masterVideo: {
        title: '마스터 비디오 (.MP4)',
        desc: '15개 사운드 트랙이 완벽 동기화된 Full HD 1080p 커머셜 완성본.',
        action: '마스터 MP4 다운로드',
      },
      afterEffects: {
        title: 'After Effects (.AEP)',
        desc: '수백 개 키프레임 레이어가 얽힌 전통적인 수작업 프로젝트 파일.',
        warningTag: '⚠️ 빈티지 수작업 트랩',
        action: '.AEP 프로젝트 받기',
      },
      modal: {
        tag: '수작업 워크플로우 경고 // 시스템 알림',
        headline: '정말로 고통스러운 수작업 시대로 돌아가시겠습니까?',
        body: '기존 After Effects 프로젝트는 수백 개의 키프레임이 엉켜있어, 기획서 4줄이 바뀔 때마다 3일 밤을 새워 수정해야 합니다...',
        bodyHighlight:
          '하지만 여기서는 100% 코드로 비디오의 모든 프레임과 인터랙션이 제어됩니다!',
        btnHire: '💼 수작업 AE 프로젝트 의뢰 (메일 문의)',
        orDivider: '또는 미래의 방식을 선택하세요',
        btnAutomate: '🚀 비디오 자동화의 힘을 계속 경험하기!',
      },
    },
    storyboardViewer: {
      modalTitle: '크래빗 코리아 // 프로덕션 블루프린트 및 10단계 스토리보드',
      downloadBtn: '블루프린트 PDF 다운로드 (3.6MB)',
      downloadSubtitle: '인쇄 가능한 고해상도 시네마틱 & 키네틱 기획서',
      phases: [
        {
          phase: '씬 01 // 프레임 000 – 120',
          title: '초기 갈등 & 동기부여 부재의 현실',
          frames: '000 – 120 (5.0초 @ 24fps)',
          narrationVn: 'Động lực, nói thì dễ hơn làm.',
          narrationKr: '동기부여, 말처럼 쉽지 않죠.',
          visual: '학원(Hagwon) 교실 공간. 원장님은 깊은 고민과 안타까운 눈빛으로 학생을 지켜본다. 학생은 책이 수북이 쌓인 책상에 지쳐 엎드려 무기력한 표정을 짓고 있다. 벽걸이 시계는 느릿느릿 흘러가며 보상이 결여된 전통 학습의 답답함을 극대화한다.',
          motionSpec: '카메라 완만한 줌인 스케일 1.0 -> 1.15 (Easing.bezier(0.42, 0, 0.58, 1)). 시계 초침 딜레이 모션.',
          audioCue: '적막한 교실 앰비언스, 원장님의 깊은 한숨 소리, 로우패스 필터가 적용된 둔탁한 시계 초침 소리.',
          perspective: '공간 깊이: 학원 교실 환경 (Z: 10 - 20)',
        },
        {
          phase: '씬 02 // 프레임 121 – 230',
          title: '해결책 발견 & 테크놀로지 전환점',
          frames: '121 – 230 (4.6초 @ 24fps)',
          narrationVn: 'Nhất là khi nỗ lực thích đáng không đi kèm phần thưởng xứng đáng!',
          narrationKr: '적절한 노력에 보상이 없다면 말이죠!',
          visual: '원장님이 다가와 크래빗 앱이 실행 중인 스마트폰을 높이 들어 올린다. 앱 인터페이스에서 에메랄드 시안 렌즈 플레어가 뿜어져 나온다. 학생의 얼굴이 환하게 밝아지며, 지루함에서 놀라움과 호기심으로 표정이 단숨에 전환된다.',
          motionSpec: '원근 표준 규격: 벽시계는 최심부 배경(zIndex: 10)으로 후퇴, 스마트폰이 최전경(zIndex: 50)을 장악. 볼류메트릭 렌즈 플레어.',
          audioCue: '화면 켜짐 에너지 버스트, 고주파 크리스탈 차임 징글, 짧은 감탄의 호흡.',
          perspective: '원근 계층: 스마트폰 zIndex: 50 | 시계 zIndex: 10',
        },
        {
          phase: '씬 2.5 (1단계) // 프레임 231 – 265',
          title: '초고속 횡단 궤적 (Horizontal Energy Dash)',
          frames: '231 – 265 (1.5초 @ 24fps)',
          narrationVn: 'Vòng tuần hoàn học tập chủ động! Chuẩn mực động lực mới - Crabit!',
          narrationKr: '주도적인 학습 선순환! 동기부여의 새로운 기준 크래빗!',
          visual: '석영 다이아몬드가 담긴 에너지 구체가 화면 왼쪽 끝에서 중심점으로 공기역학적 모션 블러 꼬리를 남기며 직진 돌진한다. 반대 방향으로 흐르는 속도선이 시원한 바람을 가르는 느낌을 연출한다.',
          motionSpec: '수평 위치 X: -100vw -> 0 (중심) Easing.bezier(0.16, 1, 0.3, 1) 적용. 속도 블러(14px)가 중심 정지 시 0px로 감쇠.',
          audioCue: '초음속 풍절음 스우시(Sonic Whoosh), 350Hz에서 1.8kHz로 상승하는 도플러 효과음.',
          perspective: '모션 레이어: 공기역학 에너지 구체',
        },
        {
          phase: '씬 2.5 (2단계) // 프레임 266 – 300',
          title: '중심 에너지 압축 & 진동 팽창',
          frames: '266 – 300 (1.4초 @ 24fps)',
          narrationVn: '(Tiếp tục mạch âm nhạc cao trào tích tụ áp suất trước điểm nổ)',
          narrationKr: '(에너지 극대화 및 폭발 직전 고주파 긴장감 형성)',
          visual: '에너지 구체가 화면 중심 좌표에 즉시 제동하며 고주파수로 진동한다. 반지름이 원래 크기의 185%까지 급격히 팽창하며 방출 직전의 극대화된 압력을 축적한다.',
          motionSpec: '중심 흔들림 dX, dY: sin(frame * 1.5) * 6px (24Hz 진동). 반경 스케일 1.0 -> 1.85 팽창.',
          audioCue: '서브 베이스 럼블(40Hz) 빌드업과 고압 캐패시터 충전 와인 사운드.',
          perspective: '모션 레이어: 중심 충격파 진동 엔진',
        },
        {
          phase: '씬 2.5 (3단계) // 프레임 301 – 340',
          title: '발광 폭발 & 7대 학습도구 방사 스프링',
          frames: '301 – 340 (1.6초 @ 24fps)',
          narrationVn: '(Điểm rơi cao trào bung nổ âm thanh - Climax Drop Beat)',
          narrationKr: '(클라이맥스 드롭 비트와 전방위 방사 폭발)',
          visual: '구체가 눈부신 백색광과 함께 폭발한다. 3D 교과서, 스타일러스 펜, 삼각자, 컴퍼스, 돋보기, 100점 시험지, 스마트 계산기 7종의 학습 도구가 중심에서 7방향으로 스프링처럼 터져 나온다.',
          motionSpec: '방사형 스프링(질량: 1, 감쇠: 8, 강성: 120). 7방향 각도 분배 Theta = i * (360°/7). 최대 분산 제약 <= 0.12.',
          audioCue: '웅장한 크리스탈 파열음 폭발, 반짝이는 고음역 리버브.',
          perspective: '소품 레고: 7대 학습도구 방사 스프링 (zIndex: 40)',
        },
        {
          phase: '씬 2.5 (4단계) // 프레임 341 – 380',
          title: '무중력 궤도 스왑 댄스 (Orbital Swap Dance)',
          frames: '341 – 380 (1.6초 @ 24fps)',
          narrationVn: '(Giai điệu điều hòa hoán đổi quỹ đạo bay)',
          narrationKr: '(유연하고 경쾌한 수학적 궤도 교환 리듬)',
          visual: '7종의 도구가 무중력 상태에서 둥실거리며 떠다니다가, 포물선 호를 그리며 유려하게 서로의 궤도 위치를 맞바꾸는 조화로운 수학적 댄스를 펼친다.',
          motionSpec: '포물선 궤도 교환 순열. 사인파 상하 부유 Y-진폭: 12px. Y축 기준 -15° ~ +15° 3D 회전.',
          audioCue: '맑은 마림바 아르페지오 멜로디, 궤도 정점을 지날 때의 부드러운 스우시.',
          perspective: '모션 엔진: 무중력 부유 및 궤도 스왑',
        },
        {
          phase: '씬 2.5 (5단계) // 프레임 381 – 410',
          title: '구심력 수렴 흡입 & 광속 크래시 줌',
          frames: '381 – 410 (1.2초 @ 24fps)',
          narrationVn: '(Hiệu ứng bẻ cong không gian mở cổng portal)',
          narrationKr: '(다음 앱 인터페이스 화면으로 진입하는 광속 크래시 줌)',
          visual: '7종의 도구가 중심의 다이아몬드 구체를 향해 최대 가속도로 빨려 들어간다. 구체는 카메라 렌즈를 향해 폭발적으로 확장되며 다음 씬의 앱 화면으로 진입하는 크래시 줌 포털을 생성한다.',
          motionSpec: '구심 가속도 r(t) -> 0 (Easing.in(Easing.exp)). 카메라 스케일 1.0 -> 50.0 돌파. 화이트아웃 플래시 전환.',
          audioCue: '소용돌이 진공 흡입음 후 강렬한 서브 베이스 드롭 및 셔터 와이프음.',
          perspective: '화면 전환: 카메라 크래시 줌 (스케일 1.0 -> 50.0)',
        },
        {
          phase: '씬 03 // 프레임 411 – 500',
          title: '노력의 해방 & 크래빗 집게 시그니처',
          frames: '411 – 500 (3.7초 @ 24fps)',
          narrationVn: 'Crabit tích lũy \'Carat\' mỗi khi học sinh hoàn thành nhiệm vụ...',
          narrationKr: '크래빗은 학생이 미션을 완료할 때마다 ‘캐럿’을 적립하고...',
          visual: '학생이 크래빗 집게 모양에 맞춰 두 손을 번쩍 들고 자신감 넘치게 발표한다. 화면 하단에서 스마트폰 앱이 솟아오르고, 미션 완료 배지들이 통통 튀며 캐럿 잔액이 0에서 12,500까지 카운트업된다.',
          motionSpec: '앱 UI 하단 슬라이드업 Y: 100vh -> 0vh 스프링(감쇠: 14). 캐럿 숫자 선형 보간 0 -> 12,500. 배지 팝인 스케일 0 -> 1.15 -> 1.0.',
          audioCue: '배지별 경쾌한 버블 팝 효과음, 빠른 코인 카운트 차임, 활기찬 퍼커션 비트.',
          perspective: 'UI 레이어: 크래빗 앱 엔진 & 캐럿 카운터',
        },
        {
          phase: '씬 04 // 프레임 501 – 550',
          title: '장학금 전환 & 3D 메탈 크래빗 데빗 카드',
          frames: '501 – 550 (2.1초 @ 24fps)',
          narrationVn: '...và nạp thẳng vào thẻ Crabit như một suất học bổng thực thụ.',
          narrationKr: '...이를 실제 장학금처럼 크래빗 카드에 충전해 줍니다.',
          visual: '적립된 디지털 캐럿이 실물 데빗 카드의 장학금 잔액으로 실시간 충전된다. 최고급 메탈 소재의 크래빗 카드가 쏟아지는 크리스털 다이아몬드 비 속에서 720도 화려하게 3D 회전한다.',
          motionSpec: 'Three.js 3D 메시 회전(RotationY: 0 -> 720°, RotationX: -15°, Scale: 1.0 -> 1.25 -> 1.0). 120개 다이아몬드 파티클 자유낙하.',
          audioCue: '묵직한 메탈 회전음, 고급스러운 카드 마찰 효과음, 영롱한 다이아몬드 사운드.',
          perspective: '3D 메시 엔진: Three.js 메탈 데빗 카드 (zIndex: 60)',
        },
        {
          phase: '씬 04 (피날레) // 프레임 551 – 590',
          title: '승리의 비상: 학생과 크래빗 마스코트의 동반 상승',
          frames: '551 – 590 (1.6초 @ 24fps)',
          narrationVn: 'Học tập chủ động – Tương lai rộng mở cùng Crabit!',
          narrationKr: '주도적인 학습 선순환! 크래빗과 함께 미래로 비상하세요!',
          visual: '자신감을 되찾은 학생과 크래빗 마스코트가 함께 힘차게 날아오르며 하늘 높이 솟구친다. 학생의 얼굴은 승리와 성취감으로 가득 차며 주도적 학습 선순환의 완성을 알린다.',
          motionSpec: '포물선 비상 모션: Y축 -1200px 상단 이탈 (Easing.out(Easing.cubic)). 마스코트 집게발 세리머니, 역방향 스피드라인 80개 분사.',
          audioCue: '고속 에어 제트 사운드, 승리의 피아노 & 신디사이저 피날레 화음, 웅장한 아웃트로.',
          perspective: '다이내믹 벡터 리그: 비상하는 학생 & 마스코트 (zIndex: 50)',
        },
      ],
      close: '[ × 스토리보드 닫기 ]',
    },
    footer: {
      copyright: 'CRABIT KOREA // 비디오 애즈 코드 자동화 엔진',
      techStack: 'POWERED BY REMOTION 4.0 • REACT 18 • THREE.JS • GOOGLE FLOW AI • 사이버네틱 스위스 브루탈리즘',
    },
  },

  vi: {
    nav: {
      brandSubtitle: 'KOREA COMMERCIAL SHOWCASE',
      engineLiveBadge: 'ENGINE LIVE (60FPS)',
      links: {
        pipeline: 'Quy trình Kép',
        brandAssets: 'Nhận diện & Mascot',
        telemetry: 'Toán học Chuyển động',
        deliverables: 'Trung tâm Bàn giao',
      },
      githubTooltip: 'Xem kho mã nguồn trên GitHub',
      portfolioBtn: 'PORTFOLIO ↗',
    },
    hero: {
      categoryBadge: '00 // THÔNG SỐ VIDEO-AS-CODE TỰ ĐỘNG HÓA',
      headline: 'CRABIT KOREA: THE FUTURE OF VIDEO-AS-CODE',
      subheadline:
        'Từ 4 dòng kịch bản sơ sài đến hệ sinh thái Video-as-Code thương mại hoàn chỉnh vận hành chuẩn xác 60FPS.',
      badges: {
        fps: 'Deterministic 60FPS',
        engine: 'React + Remotion Engine',
        ai: 'Google Flow AI Visual',
        zeroAE: 'Zero After Effects Keyframe Hell',
      },
      player: {
        modeMaster: 'Bản Hoàn Thiện',
        modeTelemetry: 'Bản Phân Tích Chuyển Động (Telemetry HUD)',
        compositionSelect: 'Phân đoạn Composition',
        compCommercial: 'Toàn bộ 6 Cảnh Thương Mại (894 khung hình @ 24fps)',
        compConvergence: 'Cảnh 3: Hội tụ 7 Dụng Cụ Học Tập (180 khung hình @ 30fps)',
        liveStatus: 'REMOTION VIRTUAL CANVAS // HOẠT ĐỘNG',
        fpsGauge: '60.0 FPS KHÓA CỨNG',
        resolution: '1920 × 1080 FHD',
        frameLabel: 'KHUNG HÌNH',
        timecodeLabel: 'MÃ THỜI GIAN',
        motionCurve: 'VẬT LÝ LÒ XO: SPRING (DAMP:14, MASS:0.8)',
        activeSequence: 'PHÂN CẢNH HIỆN HÀNH',
        cameraZ: 'CAMERA_Z: 1000px',
        damping: 'HỆ SỐ GIẢM XÓC: 14',
        pitch: 'GÓC NGHIÊNG ISOMETRIC: 18.5°',
        clickHint: 'Phím cách hoặc bấm chuột để Phát / Tạm dừng trực tiếp Remotion Canvas',
      },
    },
    pillars: {
      sectionTag: '01 // ĐỘT PHÁ CHIẾN LƯỢC',
      sectionTitle: 'BA TRỤ CỘT GIÁ TRỊ CỐT LÕI',
      sectionDesc:
        'Những bổ sung chiến lược giúp chuyển hóa ý tưởng sơ sài thành trải nghiệm thương hiệu chuẩn mực K-Fintech Toss / KakaoBank.',
      pillar1: {
        tag: 'TRỤ CỘT 01 // HỆ THỐNG THIẾT KẾ',
        title: 'Brand Identity Foundry',
        desc: 'Chuẩn hóa bảng màu K-Fintech pastel & dark squircle, thiết kế UI/UX ứng dụng Crabit mô phỏng chuẩn xác Toss & KakaoBank.',
        specs: [
          'Hệ phông Pretendard Hàn Quốc chuẩn mực (Tracking -0.02em)',
          'Bảng màu Toss Blue (#3182F6) & Ngọc Lục Bảo Carat (#10B981)',
          'Vết cắt cơ học 45° CAD Chisel & Phản hồi xúc giác UI',
        ],
        uiTag: 'UI CHUẨN TOSS / KAKAOBANK',
      },
      pillar2: {
        tag: 'TRỤ CỘT 02 // RIGGING & TÍNH LIỀN MẠCH',
        title: 'Character & Context Locking',
        desc: 'Khóa cứng tỷ lệ cơ thể nhân vật học sinh Hàn Quốc, loại bỏ triệt để asset rác và duy trì tính liền mạch trong bối cảnh lớp học Hagwon.',
        specs: [
          'Bộ Rigging Vector 2D tháo rời chuẩn mực (Đầu/Thân/Tứ chi)',
          'Hình chiếu phối cảnh không trôi lệch tọa độ theo thời gian',
          'Vùng biên an toàn 80px Safe Margin không bao giờ bị cắt mép',
        ],
        uiTag: 'KHÓA RIG TRẢI NGHIỆM',
      },
      pillar3: {
        tag: 'TRỤ CỘT 03 // LINH VẬT & BIỂU TƯỢNG',
        title: 'Mascot Engineering (Chú Cua Crabit)',
        desc: 'Chơi chữ Crabit ➔ Cua với hai càng giơ cao biểu trưng cho học sinh tích cực phát biểu; thân hình ma trận code & kim cương biểu trưng Carat học bổng.',
        specs: [
          'Hai càng giơ cao = Sự tự tin chủ động phát biểu trong lớp',
          'Mặt cắt kim cương = Carat học bổng tích lũy sau mỗi bài học',
          'Truyền mã SVG trực tiếp vào Three.js với vật lý phản xạ sáng',
        ],
        uiTag: 'MASCOT KIM CƯƠNG CARAT',
      },
    },
    pipeline: {
      sectionTag: '02 // QUY TRÌNH ĐỘT PHÁ',
      sectionTitle: 'QUY TRÌNH KÉP: DUAL-TRACK ARCHITECTURE',
      sectionDesc:
        'Tách bạch giữa khung cảnh điện ảnh từ AI và chuyển động toán học từ Code, cho phép cập nhật kịch bản tức thì không giới hạn.',
      vsTitle: 'AFTER EFFECTS TRUYỀN THỐNG VS. VIDEO-AS-CODE',
      oldWayTitle: 'Quy trình Thủ công Truyền thống (After Effects)',
      oldWayDesc:
        'Hàng trăm layer keyframe rối rắm, mất 3 ngày chỉnh sửa mỗi khi thay đổi kịch bản, file nặng nề và thường xuyên crash render.',
      oldWayPoints: [
        'Mất 3+ ngày mỗi khi khách hàng sửa đổi văn bản hoặc kịch bản',
        'Keyframe xếp tầng dễ lệch pha âm thanh và giật chuyển động',
        'Cắt ghép âm thanh thủ công bằng cách tua timeline thủ công',
        'Không thể lập trình tự động hóa hay kết xuất hàng loạt',
      ],
      newWayTitle: 'Kiến trúc Tự động hóa Kép Crabit (Dual-Track)',
      newWayDesc:
        'Động cơ kết xuất hướng mã nguồn: hình ảnh, phương trình vật lý, âm thanh và dữ liệu được biên dịch thành video 60FPS không sai lệch.',
      tracks: {
        track1: {
          title: 'Track A: Google Flow (Visual AI)',
          engine: 'Phôi cảnh điện ảnh Flow Shot 01 – 05',
          desc: 'Tạo phôi khung cảnh lớp học Hagwon, cảm xúc chân thực của học sinh và ánh sáng điện ảnh mà không bị méo mó vật thể.',
          badge: 'VISUAL AI PHÔI CẢNH',
        },
        track2: {
          title: 'Track B: Remotion + React (Code Engine)',
          engine: 'Chuyển động toán học xác định',
          desc: 'Xử lý vật lý lò xo (Spring damping: 14), đường cong Bezier, camera dolly 3D Three.js và chữ động Kinetic Typography 60FPS.',
          badge: 'ĐỘNG CƠ REMOTION',
        },
        track3: {
          title: 'Track C: Interactive Sound Design',
          engine: 'Hệ thống 15+ âm thanh tương tác chuẩn K-Fintech',
          desc: 'Âm thanh viết phấn, lật thẻ, trượt ngăn kéo, tiếng nổ đồng xu và chuông 장학금 tích lũy khớp chính xác đến từng mili-giây.',
          badge: 'SFX CHÍNH XÁC',
        },
      },
    },
    telemetrySection: {
      sectionTag: '03 // ĐỘ CHÍNH XÁC TOÁN HỌC',
      sectionTitle: 'TELEMETRY & MOTION PHYSICS',
      sectionDesc:
        'Mọi chuyển động của pixel đều là phương trình giải tích có giới hạn kẹp (clamped bounds). Không sử dụng keyframe thủ công ước lượng.',
      curvesTitle: 'Đường cong Easing Toán học',
      curvesDesc:
        'Các phương trình dao động điều hòa và Bezier bậc 3 triệt tiêu hoàn toàn rung giật và trôi lệch điểm ảnh.',
      mathSpecs: {
        formula1Name: 'DAO ĐỘNG ĐIỀU HÒA GIẢM CHẤN (SPRING OSCILLATOR)',
        formula1Expr: 'x(t) = e^(-ζω_n t) * (A cos(ω_d t) + B sin(ω_d t))',
        formula1Desc: 'Áp dụng cho thẻ UI & 7 dụng cụ học tập. Giảm xóc ζ = 0.85, khối lượng = 0.8kg.',
        formula2Name: 'HÌNH HỌC PHỐI CẢNH FRUSTUM CAMERA 3D',
        formula2Expr: 'H_frustum = 2 * cameraZ * tan(FOV * π / 360)',
        formula2Desc: 'Tính toán động bảo đảm mép an toàn 80px ở mọi góc quay 3D isometric.',
        formula3Name: 'NỘI SUY KẸP BIÊN ĐỘ (CLAMPED BEZIER)',
        formula3Expr: 'f(t) = interpolate(frame, [t_0, t_1], [v_0, v_1], { clamp: true })',
        formula3Desc: 'Khóa cứng giá trị chặn, triệt tiêu hiện tượng văng phần tử ra ngoài khung hình.',
      },
    },
    deliverables: {
      sectionTag: '04 // TÀI NGUYÊN SẢN XUẤT',
      sectionTitle: 'TRUNG TÂM BÀN GIAO TÀI NGUYÊN',
      sectionDesc:
        'Toàn bộ sản phẩm bàn giao minh bạch, chuẩn mực sản xuất: mở Storyboard trực quan từ dự án, tải trọn bộ SVG và video master hoàn chỉnh.',
      storyboard: {
        title: 'Storyboard Showcase',
        desc: 'Khung mẫu kịch bản điện ảnh 5 pha trích xuất trực tiếp từ các scene thực tế của dự án.',
        action: 'MỞ XEM STORYBOARD',
      },
      svgAssets: {
        title: 'Vector Assets (.ZIP)',
        desc: '7 dụng cụ học tập, Mascot Cua kim cương & bộ Rig nhân vật học sinh.',
        action: 'TẢI BỘ VECTOR SVG',
      },
      masterVideo: {
        title: 'Video Master (.MP4)',
        desc: '1080p 60FPS có Full 15-channel SFX đồng bộ chuẩn xác.',
        action: 'TẢI VIDEO MASTER',
      },
      afterEffects: {
        title: 'After Effects (.AEP)',
        desc: 'Dự án thủ công truyền thống chứa hàng trăm layer keyframe.',
        warningTag: '⚠️ BẪY THỦ CÔNG HOÀI CỔ',
        action: 'TẢI FILE .AEP',
      },
      modal: {
        tag: 'CẢNH BÁO QUY TRÌNH THỦ CÔNG // HỆ THỐNG',
        headline: 'BẠN THỰC SỰ MUỐN QUAY LẠI THỜI KỲ THỦ CÔNG?',
        body: 'File After Effects chứa hàng trăm layer keyframe rối rắm, mất 3 ngày chỉnh sửa mỗi khi thay đổi kịch bản...',
        bodyHighlight:
          'Tại đây, toàn bộ video đã được điều khiển 100% bằng Code: render tự động 60FPS, thay đổi kịch bản bằng 1 dòng lệnh!',
        btnHire: '💼 Thuê tôi ngay để nhận file thủ công',
        orDivider: 'HOẶC LỰA CHỌN TƯƠNG LAI',
        btnAutomate: '🚀 Khám phá sức mạnh Tự Động Hoá Video!',
      },
    },
    storyboardViewer: {
      modalTitle: 'CRABIT KOREA // BẢN THIẾT KẾ PHÂN CẢNH CHI TIẾT (10 PHÂN CẢNH)',
      downloadBtn: 'TẢI BẢN VẼ BLUEPRINT PDF (3.6MB)',
      downloadSubtitle: 'BẢN THIẾT KẾ ĐỊNH LƯỢNG CHUẨN IN ẤN & KỸ THUẬT RENDER',
      phases: [
        {
          phase: 'SCENE 01 // KHUNG HÌNH 000 – 120',
          title: 'Xung Đột Ban Đầu & Thực Trạng Thiếu Động Lực',
          frames: '000 – 120 (5.0s @ 24fps)',
          narrationVn: 'Động lực, nói thì dễ hơn làm.',
          narrationKr: '동기부여, 말처럼 쉽지 않죠.',
          visual: 'Không gian lớp học viện đào tạo (Hagwon). Viện trưởng đứng quan sát với ánh mắt trăn trở. Học sinh ngồi gục đầu bên bàn học, xung quanh là sách vở dày đặc, biểu cảm mệt mỏi và mất phương hướng. Chiếc đồng hồ treo tường hiển thị thời gian trôi chậm chạp, nhấn mạnh sự ngột ngạt của lối học truyền thống thiếu phần thưởng.',
          motionSpec: 'Camera slow push-in scale 1.0 -> 1.15 bằng Easing.bezier(0.42, 0, 0.58, 1). Đồng hồ kim giây giật chậm rãi.',
          audioCue: 'Tiếng tích tắc đồng hồ cơ học với bộ lọc low-pass, tiếng thở dài trĩu nặng của viện trưởng.',
          perspective: 'PHỐI CẢNH: LỚP HỌC HAGWON (Z: 10 - 20)',
        },
        {
          phase: 'SCENE 02 // KHUNG HÌNH 121 – 230',
          title: 'Khám Phá Giải Pháp & Bước Ngoặt Công Nghệ',
          frames: '121 – 230 (4.6s @ 24fps)',
          narrationVn: 'Nhất là khi nỗ lực thích đáng không đi kèm phần thưởng xứng đáng!',
          narrationKr: '적절한 노력에 보상이 없다면 말이죠!',
          visual: 'Viện trưởng bước đến và giơ cao chiếc điện thoại thông minh đang chạy ứng dụng Crabit. Giao diện ứng dụng tỏa ra luồng sáng thấu kính màu xanh ngọc bích. Khuôn mặt học sinh bừng sáng, mắt mở to, biểu cảm chuyển đổi dứt khoát từ chán chường sang kinh ngạc và tò mò.',
          motionSpec: 'Quy chuẩn phối cảnh: Đồng hồ lùi về lớp hậu cảnh sâu nhất (zIndex: 10), nhường toàn bộ tiền cảnh nổi bật cho chiếc điện thoại (zIndex: 50). Volumetric cyan lens flare.',
          audioCue: 'Âm thanh kích hoạt màn hình ngọc bích bùng nổ, tiếng chuông pha lê ngân vang sắc sảo.',
          perspective: 'QUY CHUẨN: ĐIỆN THOẠI zIndex: 50 | ĐỒNG HỒ zIndex: 10',
        },
        {
          phase: 'SCENE 2.5 (PHA 1) // KHUNG HÌNH 231 – 265',
          title: 'Lao Vút Ngang Siêu Tốc (Horizontal Energy Dash)',
          frames: '231 – 265 (1.5s @ 24fps)',
          narrationVn: 'Vòng tuần hoàn học tập chủ động! Chuẩn mực động lực mới - Crabit!',
          narrationKr: '주도적인 학습 선순환! 동기부여의 새로운 기준 크래빗!',
          visual: 'Quả cầu năng lượng chứa kim cương thạch anh lao thẳng tắp từ mép trái vào tâm màn hình với đuôi khí động học mờ ảo, nền tốc độ trôi ngược chiều xé gió.',
          motionSpec: 'Tọa độ X: -100vw -> 0 (Tâm) áp dụng Easing.bezier(0.16, 1, 0.3, 1), vệt blur 14px giảm dần về 0px khi chạm tâm.',
          audioCue: 'Tiếng rít xé gió siêu thanh (sonic whoosh) quét tần số Doppler từ 350Hz lên 1.8kHz.',
          perspective: 'LỚP ĐỘNG HỌC: QUẢ CẦU NĂNG LƯỢNG KHÍ ĐỘNG',
        },
        {
          phase: 'SCENE 2.5 (PHA 2) // KHUNG HÌNH 266 – 300',
          title: 'Tụ Năng Lượng Tại Tâm & Rung Chấn Phình Đại',
          frames: '266 – 300 (1.4s @ 24fps)',
          narrationVn: '(Tiếp tục mạch âm nhạc cao trào tích tụ áp suất trước điểm nổ)',
          narrationKr: '(에너지 극대화 및 폭발 직전 고주파 긴장감 형성)',
          visual: 'Quả cầu dừng ở tâm, rung lắc tần số cao và phình đại cực điểm, tích tụ áp suất trước pha giải phóng.',
          motionSpec: 'Dao động tâm dX, dY tần số 24Hz, bán kính quả cầu phình đại 1.0 -> 1.85 lần tích tụ năng lượng trước kích nổ.',
          audioCue: 'Tiếng nạp tụ điện cao thế whine tăng dần cùng dải sub-bass 40Hz nén chặt.',
          perspective: 'LỚP ĐỘNG HỌC: RUNG CHẤN DAO ĐỘNG ĐIỀU HÒA TÂM',
        },
        {
          phase: 'SCENE 2.5 (PHA 3) // KHUNG HÌNH 301 – 340',
          title: 'Kích Nổ Phát Quang: Bung 7 Dụng Cụ Học Tập',
          frames: '301 – 340 (1.6s @ 24fps)',
          narrationVn: '(Điểm rơi cao trào bung nổ âm thanh - Climax Drop Beat)',
          narrationKr: '(클라이맥스 드롭 비트와 전방위 방사 폭발)',
          visual: 'Quả cầu phát nổ; 7 dụng cụ học tập (Sách giáo khoa 3D, Bút cảm ứng, Thước kẻ tam giác, Thước compa, Kính lúp, Bài thi 100 điểm, Máy tính thông minh) bung nổ lò xo từ tâm tỏa ra 7 góc.',
          motionSpec: 'Radial Spring(mass: 1, damping: 8, stiffness: 120), góc phân bố 7 nan hoa Theta = i * (360°/7). Clamped dispersion <= 0.12.',
          audioCue: 'Tiếng nổ pha lê tinh khiết rền vang, âm thanh thủy tinh tán sắc lấp lánh (sparkling reverb).',
          perspective: 'LEGO ASSETS: 7 DỤNG CỤ HỌC TẬP (zIndex: 40)',
        },
        {
          phase: 'SCENE 2.5 (PHA 4) // KHUNG HÌNH 341 – 380',
          title: 'Vũ Đạo Quỹ Đạo Không Trọng Lực (Orbital Swap)',
          frames: '341 – 380 (1.6s @ 24fps)',
          narrationVn: '(Giai điệu điều hòa hoán đổi quỹ đạo bay)',
          narrationKr: '(유연하고 경쾌한 수학적 궤도 교환 리듬)',
          visual: '7 dụng cụ dập dềnh không trọng lực và bay theo quỹ đạo cánh cung hoán đổi vị trí cho nhau tạo cảm giác nhịp điệu toán học hoàn mỹ.',
          motionSpec: 'Parabolic orbital swap cánh cung, dao động sóng sin Y-Amp: 12px, xoay tự do quanh trục Y từ -15° đến +15°.',
          audioCue: 'Giai điệu arpeggio marimba trong trẻo, tiếng vút nhẹ khi từng dụng cụ cắt chéo quỹ đạo.',
          perspective: 'ENGINE: VŨ ĐẠO KHÔNG TRỌNG LỰC & HOÁN ĐỔI QUỸ ĐẠO',
        },
        {
          phase: 'SCENE 2.5 (PHA 5) // KHUNG HÌNH 381 – 410',
          title: 'Hút Xuyên Tâm & Chuyển Cảnh Crash-Zoom',
          frames: '381 – 410 (1.2s @ 24fps)',
          narrationVn: '(Hiệu ứng bẻ cong không gian mở cổng portal)',
          narrationKr: '(다음 앱 인터페이스 화면으로 진입하는 광속 크래시 줌)',
          visual: 'Toàn bộ 7 dụng cụ bị hút thẳng tắp về quả cầu kim cương trung tâm. Quả cầu phóng cực đại xuyên qua camera tạo cú chuyển cảnh Crash-Zoom mở ra màn hình ứng dụng của phân cảnh tiếp theo.',
          motionSpec: 'Gia tốc hút xuyên tâm Easing.in(Easing.exp), camera Crash-Zoom phóng cực đại scale 1.0 -> 50.0, Flash wipe.',
          audioCue: 'Âm thanh hố đen hút chân không xoáy mạnh, tiếng sập máy ảnh cơ học và cú nổ âm trầm.',
          perspective: 'CHUYỂN CẢNH: CAMERA CRASH-ZOOM (SCALE 1.0 -> 50.0)',
        },
        {
          phase: 'SCENE 03 // KHUNG HÌNH 411 – 500',
          title: 'Sự Giải Phóng Nỗ Lực & Càng Cua Crabit',
          frames: '411 – 500 (3.7s @ 24fps)',
          narrationVn: 'Crabit tích lũy "Carat" mỗi khi học sinh hoàn thành nhiệm vụ...',
          narrationKr: '크래빗은 학생이 미션을 완료할 때마다 ‘캐럿’을 적립하고...',
          visual: 'Học sinh hăng hái giơ cao hai tay phát biểu (đồng điệu với hình tượng càng cua Crabit). Màn hình ứng dụng trồi lên từ đáy, các huy hiệu nhiệm vụ nảy pop-in kèm âm thanh bọt khí trong trẻo. Số dư Carat nhảy số liên tục.',
          motionSpec: 'Giao diện điện thoại trượt từ đáy Y: 100% -> 0% bằng Spring(damping: 14), số dư Carat nhảy 0 -> 12,500.',
          audioCue: 'Tiếng bọt khí pop-in trong trẻo của các huy hiệu, tiếng xu xu leng keng dồn dập.',
          perspective: 'LỚP UI: CRABIT APP ENGINE & BỘ ĐẾM CARAT',
        },
        {
          phase: 'SCENE 04 // KHUNG HÌNH 501 – 550',
          title: 'Chuyển Hóa Học Bổng: Thẻ Crabit Debit Card Kim Loại 3D',
          frames: '501 – 550 (2.1s @ 24fps)',
          narrationVn: '...và nạp thẳng vào thẻ Crabit như một suất học bổng thực thụ.',
          narrationKr: '...이를 실제 장학금처럼 크래빗 카드에 충전해 줍니다.',
          visual: 'Điểm Carat số hóa được quy đổi trực tiếp thành số dư học bổng nạp vào thẻ vật lý. Cú xoay lật 3D ngoạn mục của chiếc thẻ ghi nợ Crabit Debit Card bằng kim loại cao cấp giữa cơn mưa tinh thể lấp lánh.',
          motionSpec: 'Three.js 3D Mesh xoay 720 độ quanh trục nghiêng -15°, mưa 120 hạt tinh thể kim cương rơi tự do phản chiếu ánh sáng kim loại.',
          audioCue: 'Âm thanh xoay thẻ kim loại sang trọng, hiệu ứng kim hoàn leng keng, hợp âm vang.',
          perspective: 'ĐỘNG CƠ 3D: THREE.JS METALLIC DEBIT CARD (zIndex: 60)',
        },
        {
          phase: 'SCENE 04 (OUTRO) // KHUNG HÌNH 551 – 590',
          title: 'Cất Cánh Khải Hoàn: Cậu Bé Học Sinh & Chú Cua Crabit Bay Lên',
          frames: '551 – 590 (1.6s @ 24fps)',
          narrationVn: 'Học tập chủ động – Tương lai rộng mở cùng Crabit!',
          narrationKr: '주도적인 학습 선순환! 크래빗과 함께 미래로 비상하세요!',
          visual: 'Cậu bé học sinh và chú cua Crabit (mascot) cùng nhau tung cánh cất cánh bay lên không trung rực rỡ. Nét mặt học sinh bừng sáng niềm tin và niềm vui chiến thắng, chấm dứt hoàn toàn sự bế tắc ban đầu.',
          motionSpec: 'Cất cánh parabol: Tọa độ Y dịch chuyển -1200px xuyên qua cạnh trên màn hình với Easing.out(Easing.cubic). Mascot Crabit vung vẩy càng cua hân hoan. 80 vệt sáng tốc độ.',
          audioCue: 'Tiếng động cơ phản lực khí nén vút cao, hợp âm piano + synth khải hoàn vang dội, kết thúc trọn vẹn mạch phim.',
          perspective: 'VECTOR RIG LINH HOẠT: HỌC SINH & MASCOT CẤT CÁNH (zIndex: 50)',
        },
      ],
      close: '[ × ĐÓNG STORYBOARD ]',
    },
    footer: {
      copyright: 'CRABIT KOREA // HỆ THỐNG VIDEO-AS-CODE TỰ ĐỘNG HÓA',
      techStack: 'POWERED BY REMOTION 4.0 • REACT 18 • THREE.JS • GOOGLE FLOW AI • CYBERNETIC SWISS BRUTALISM',
    },
  },
};
