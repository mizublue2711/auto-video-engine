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
    phases: {
      phase: string;
      title: string;
      frames: string;
      visual: string;
      motionSpec: string;
      audioCue: string;
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
      modalTitle: 'CRABIT KOREA // 5-PHASE CINEMATIC STORYBOARD',
      phases: [
        {
          phase: 'PHASE 01 // FRAMES 000 – 119',
          title: 'Academy Struggle & Clock Zoom-Out',
          frames: '0 – 119 (5.0s @ 24fps)',
          visual: 'Hagwon classroom twilight, bored student with slumped head, analog wall clock ticking away minutes.',
          motionSpec: 'Smooth camera zoom-out from 2.2 down to 1.0 on clock dial. Easing.bezier(0.16, 1, 0.3, 1).',
          audioCue: 'Tick-tock mechanical clock tempo with subtle ambient study drone.',
        },
        {
          phase: 'PHASE 02 // FRAMES 120 – 239',
          title: 'Solution Reveal & Mobile Handover',
          frames: '120 – 239 (5.0s @ 24fps)',
          visual: 'Crabit Smartphone 3D hero hardware reveal, dynamic island notification, vibrant screen illumination.',
          motionSpec: 'Isometric pitch locked at 18.5°, 360° fluid Y-axis spin, spring scale-in (damping: 12).',
          audioCue: 'App swoosh soft + subtle energy burst upon screen activation.',
        },
        {
          phase: 'PHASE 03 // FRAMES 240 – 539',
          title: 'Study Gear Convergence & FinTech Tickets',
          frames: '240 – 539 (12.5s @ 24fps)',
          visual: '7 Study Gear props (Calculator, Compass, Ruler, Stylus, Textbook, Timer, Tablet) orbiting into focus.',
          motionSpec: 'Harmonic orbital pathing, kinetic stagger wrapper (4-frame offset), spatial camera dolly.',
          audioCue: 'Swapping chimes, portal zoom, and crystal sparkle chimes.',
        },
        {
          phase: 'PHASE 04 // FRAMES 540 – 659',
          title: 'Active Study & Blackboard Math',
          frames: '540 – 659 (5.0s @ 24fps)',
          visual: 'Clean green chalkboard, mathematical equations forming, student raising hand with alert confidence.',
          motionSpec: 'SVG morph stroke dashoffset write-in, idea pop star explosion, 100 score badge bounce.',
          audioCue: 'Chalk writing loop, bubble pop UI, and level-up sparkle chime.',
        },
        {
          phase: 'PHASE 05 // FRAMES 660 – 894',
          title: 'K-Fintech Reward & Gate Takeoff',
          frames: '660 – 894 (9.75s @ 24fps)',
          visual: 'Crabit Debit Card 3D hero showcase, Carat scholarship balance incrementing to 50,000 KRW.',
          motionSpec: 'Dual-engine 3D card tilt, particle coin explosion, subway turnstile NFC card tap takeoff.',
          audioCue: 'Coin explosion, high-velocity whoosh, and final triumphant K-Fintech success chime.',
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
      modalTitle: '크래빗 코리아 // 5단계 시네마틱 스토리보드',
      phases: [
        {
          phase: '단계 01 // 프레임 000 – 119',
          title: '학원에서의 지루함 & 아날로그 시계 줌아웃',
          frames: '0 – 119 (5.0초 @ 24fps)',
          visual: '황혼의 학원 교실, 지루해하며 책상에 엎드린 학생, 째깍거리며 흘러가는 벽시계.',
          motionSpec: '시계 중심 2.2배 확대에서 1.0배로 부드러운 줌아웃. Easing.bezier(0.16, 1, 0.3, 1).',
          audioCue: '째깍거리는 기계식 시계 초침 소리와 조용한 학원 앰비언스 드론.',
        },
        {
          phase: '단계 02 // 프레임 120 – 239',
          title: '해결책 등장 & 스마트폰 핸드오버',
          frames: '120 – 239 (5.0초 @ 24fps)',
          visual: 'Crabit 3D 스마트폰 하드웨어 등장, 다이내믹 아일랜드 알림, 밝게 빛나는 앱 화면.',
          motionSpec: '아이소메트릭 피치 18.5° 고정, 360° 유려한 Y축 회전, 스프링 진입 (감쇠: 12).',
          audioCue: '앱 스우시 사운드와 화면 켜짐 에너지 버스트.',
        },
        {
          phase: '단계 03 // 프레임 240 – 539',
          title: '학습 도구 궤도 수렴 & 핀테크 티켓',
          frames: '240 – 539 (12.5초 @ 24fps)',
          visual: '계산기, 컴퍼스, 삼각자, 스타일러스 펜, 태블릿, 플래너, 타이머 7종의 궤도 수렴.',
          motionSpec: '조화 궤도 비행, 키네틱 스태거 래퍼 (4프레임 오프셋), 공간 카메라 돌리.',
          audioCue: '도구 전환 차임, 포털 줌, 크리스탈 반짝임 효과음.',
        },
        {
          phase: '단계 04 // 프레임 540 – 659',
          title: '몰입 학습 & 칠판 수학 챌린지',
          frames: '540 – 659 (5.0초 @ 24fps)',
          visual: '깔끔한 녹색 칠판, 쓰여지는 수학 공식, 번쩍 손을 들며 자신감을 회복한 학생.',
          motionSpec: 'SVG 대시옵셋 분필 필기 애니메이션, 아이디어 팝 별빛 폭발, 100점 배지 바운스.',
          audioCue: '사각사각 칠판 글씨 루프, 버블 팝 UI, 레벨업 징글.',
        },
        {
          phase: '단계 05 // 프레임 660 – 894',
          title: 'K-핀테크 보상 & 게이트 도약',
          frames: '660 – 894 (9.75초 @ 24fps)',
          visual: 'Crabit 체크카드 3D 등장, 50,000원 장학금 잔액 카운팅, 지하철 개찰구 태그 도약.',
          motionSpec: '듀얼 엔진 3D 카드 틸트, 장학금 코인 폭발 파티클, 개찰구 NFC 태그 가속.',
          audioCue: '코인 폭발음, 고속 질주 후쉬, 최종 승리의 K-핀테크 성공 차임벨.',
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
      modalTitle: 'CRABIT KOREA // STORYBOARD ĐIỆN ẢNH 5 PHA',
      phases: [
        {
          phase: 'PHA 01 // KHUNG HÌNH 000 – 119',
          title: 'Khủng hoảng tại lớp học & Đồng hồ Zoom-out',
          frames: '0 – 119 (5.0 giây @ 24fps)',
          visual: 'Hoàng hôn buông xuống lớp học Hagwon, học sinh gục đầu mệt mỏi, đồng hồ kim trôi đi trong áp lực.',
          motionSpec: 'Camera thu phóng mượt mà từ 2.2 xuống 1.0 tập trung vào mặt đồng hồ. Easing.bezier(0.16, 1, 0.3, 1).',
          audioCue: 'Tiếng tích tắc đồng hồ cơ học cùng dải âm trầm ambient ngột ngạt.',
        },
        {
          phase: 'PHA 02 // KHUNG HÌNH 120 – 239',
          title: 'Giải pháp xuất hiện & Trao tay điện thoại',
          frames: '120 – 239 (5.0 giây @ 24fps)',
          visual: 'Crabit Smartphone 3D lộ diện với viền kim loại, Dynamic Island nhấp nháy, màn hình tỏa sáng.',
          motionSpec: 'Góc nghiêng Isometric 18.5° khóa cứng, xoay 360° quanh trục Y, spring scale-in (damping: 12).',
          audioCue: 'Tiếng lướt app mềm mại cùng chùm năng lượng bừng sáng khi bật màn hình.',
        },
        {
          phase: 'PHA 03 // KHUNG HÌNH 240 – 539',
          title: 'Hội tụ 7 dụng cụ học tập & Thẻ FinTech',
          frames: '240 – 539 (12.5 giây @ 24fps)',
          visual: '7 dụng cụ học tập (Máy tính, Compa, Thước kẻ, Bút cảm ứng, Sách, Hẹn giờ, Tablet) bay hội tụ theo quỹ đạo.',
          motionSpec: 'Quỹ đạo điều hòa không gian, kinetic stagger wrapper (độ trễ 4 frame), spatial camera dolly.',
          audioCue: 'Tiếng chuông tráo đổi, hiệu ứng cổng không gian portal zoom, tiếng lách cách pha lê.',
        },
        {
          phase: 'PHA 04 // KHUNG HÌNH 540 – 659',
          title: 'Học tập tích cực & Thử thách bảng đen',
          frames: '540 – 659 (5.0 giây @ 24fps)',
          visual: 'Bảng xanh học đường, các công thức toán học hiện lên, học sinh giơ cao tay tràn đầy tự tin.',
          motionSpec: 'Hiệu ứng vẽ phấn SVG dashoffset, bùng nổ ngôi sao ý tưởng, huy hiệu 100 điểm nảy lò xo.',
          audioCue: 'Tiếng phấn viết bảng lách cách, pop-up bong bóng UI, tiếng ting ting thăng cấp.',
        },
        {
          phase: 'PHA 05 // KHUNG HÌNH 660 – 894',
          title: 'K-Fintech Phần thưởng & Cất cánh qua cổng',
          frames: '660 – 894 (9.75 giây @ 24fps)',
          visual: 'Thẻ Crabit Debit Card 3D hiện ra, số dư học bổng Carat nhảy số lên 50,000 KRW, quẹt thẻ tàu điện cất cánh.',
          motionSpec: 'Nghiêng thẻ 3D hai trục, bùng nổ hạt xu học bổng, tăng tốc NFC bay qua cổng soát vé.',
          audioCue: 'Tiếng nổ xu học bổng, tiếng vụt gió tốc độ cao và tiếng chuông thành công vang dội.',
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
