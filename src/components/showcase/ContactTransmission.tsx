import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, ExternalLink, Globe, Github, Linkedin, Camera } from 'lucide-react';
import { Language } from '../../i18n/showcaseDict';

interface ContactTransmissionProps {
  currentLang: Language;
}

export const ContactTransmission: React.FC<ContactTransmissionProps> = ({ currentLang }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('mizu2711@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const labels = {
    en: {
      tag: '05 // TELEMETRY TRANSMISSION',
      title: 'CONNECT & TRANSMIT',
      desc: 'Direct communication line for enterprise consulting, spatial engineering, and Video-as-Code automation.',
      emailLabel: 'PRIMARY EMAIL',
      phoneLabel: 'SECURE TELEPHONE',
      locationLabel: 'BASE OF OPERATIONS',
      copyBtn: copied ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL',
      channelsTitle: 'VERIFIED EXTERNAL CHANNELS',
    },
    kr: {
      tag: '05 // 텔레메트리 전송 & 협업',
      title: '프로젝트 문의 & 협업 채널',
      desc: '엔터프라이즈 컨설팅, 3D 모션 그래픽 및 비디오 애즈 코드 자동화 시스템 구축 문의.',
      emailLabel: '공식 이메일',
      phoneLabel: '비즈니스 연락처',
      locationLabel: '활동 거점',
      copyBtn: copied ? '클립보드에 복사됨' : '이메일 주소 복사',
      channelsTitle: '공식 인증 외부 채널',
    },
    vi: {
      tag: '05 // TRUYỀN TÍN HIỆU & KẾT NỐI',
      title: 'KẾT NỐI TRỰC TIẾP & HỢP TÁC',
      desc: 'Kênh liên lạc trực tiếp cho tư vấn giải pháp doanh nghiệp, kỹ thuật motion và tự động hóa Video-as-Code.',
      emailLabel: 'EMAIL CHÍNH THỨC',
      phoneLabel: 'ĐIỆN THOẠI TRỰC TIẾP',
      locationLabel: 'ĐỊA BÀN HOẠT ĐỘNG',
      copyBtn: copied ? 'ĐÃ SAO CHÉP VÀO BỘ NHỚ' : 'SAO CHÉP EMAIL',
      channelsTitle: 'HỆ THỐNG LIÊN KẾT CHÍNH THỨC',
    },
  }[currentLang];

  const channels = [
    {
      name: 'FRAMER PORTFOLIO',
      url: 'https://thuy-vu-designer.framer.website/',
      tag: 'FRAMER LIVE',
      icon: ExternalLink,
      color: '#00E5FF',
    },
    {
      name: 'ARTIFICIAL CRAFT',
      url: 'https://artificialcraft.space/',
      tag: 'SYSTEM HUB',
      icon: Globe,
      color: '#5322FF',
    },
    {
      name: 'LINKEDIN PROFILE',
      url: 'https://www.linkedin.com/in/thuy-thu-vu-271190/',
      tag: 'PROFILE',
      icon: Linkedin,
      color: '#3182F6',
    },
    {
      name: 'GITHUB CODEBASE',
      url: 'https://github.com/mizublue2711/auto-video-engine',
      tag: 'CODE REPO',
      icon: Github,
      color: '#10B981',
    },
    {
      name: 'UNSPLASH ARCHIVE',
      url: 'https://unsplash.com/@mizu2711',
      tag: 'PHOTO ARCHIVE',
      icon: Camera,
      color: '#E0E7FF',
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto brutalist-strict">
      {/* SECTION HEADER */}
      <div className="mb-14 text-center md:text-left border-b border-[#1F1F2E] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00E5FF] px-2.5 py-1 bg-[#031E2B] border border-[#00E5FF]/40 mb-3">
            <span className="w-1.5 h-1.5 bg-[#00E5FF]" />
            <span>{labels.tag}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-black text-white tracking-tight uppercase">
            {labels.title}
          </h2>
          <p className="text-sm md:text-base text-[#8A8FA3] mt-2 max-w-2xl font-sans">
            {labels.desc}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 font-mono text-xs text-[#10B981]">
          <span>[ ⏣ TRANSMISSION_READY • LAT 10.82°N // LNG 106.63°E ]</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: TERMINAL CONTACT BOX */}
        <div className="lg:col-span-7 bg-[#0A0C14] border-2 border-[#00E5FF]/60 p-6 sm:p-8 relative shadow-cyan-glow">
          <div className="flex items-center justify-between border-b border-[#1F1F2E] pb-4 mb-6 text-xs font-mono">
            <span className="text-[#00E5FF] font-bold">NODE: THUY VU // MIZU2711</span>
            <span className="text-[#10B981] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#10B981] animate-ping" />
              <span>ONLINE</span>
            </span>
          </div>

          <div className="space-y-6">
            {/* Primary Email */}
            <div className="bg-[#05050A] border border-[#1F1F2E] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-mono text-[#8A8FA3] uppercase flex items-center gap-1.5 mb-1">
                  <Mail size={12} className="text-[#00E5FF]" />
                  <span>{labels.emailLabel}</span>
                </div>
                <a
                  href="mailto:mizu2711@gmail.com"
                  className="font-mono text-base sm:text-lg text-white font-bold hover:text-[#00E5FF] transition-colors"
                >
                  mizu2711@gmail.com
                </a>
              </div>

              <button
                onClick={copyEmail}
                className="px-3 py-1.5 bg-[#031E2B] border border-[#00E5FF]/60 hover:bg-[#00E5FF] text-[#00E5FF] hover:text-[#05050A] font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all self-start sm:self-center"
              >
                {copied ? <Check size={14} className="text-[#10B981]" /> : <Copy size={14} />}
                <span>{labels.copyBtn}</span>
              </button>
            </div>

            {/* Telephone */}
            <div className="bg-[#05050A] border border-[#1F1F2E] p-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-[#8A8FA3] uppercase flex items-center gap-1.5 mb-1">
                  <Phone size={12} className="text-[#10B981]" />
                  <span>{labels.phoneLabel}</span>
                </div>
                <a
                  href="tel:+84979203507"
                  className="font-mono text-base text-white font-bold hover:text-[#10B981] transition-colors"
                >
                  +84 979 203 507
                </a>
              </div>
              <span className="text-[10px] font-mono text-[#10B981] bg-[#0A1A14] border border-[#10B981]/30 px-2 py-0.5">
                SECURE LINE
              </span>
            </div>

            {/* Base of Operations */}
            <div className="bg-[#05050A] border border-[#1F1F2E] p-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-[#8A8FA3] uppercase flex items-center gap-1.5 mb-1">
                  <MapPin size={12} className="text-[#5322FF]" />
                  <span>{labels.locationLabel}</span>
                </div>
                <div className="font-mono text-sm text-slate-300">
                  Ho Chi Minh City, Vietnam (Global Remote)
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#8A8FA3]">
                UTC+7 // GLOBAL
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: VERIFIED EXTERNAL CHANNELS */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="text-xs font-mono text-[#8A8FA3] uppercase mb-1">
            {labels.channelsTitle}
          </div>

          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <a
                key={ch.name}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF] p-3.5 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#05050A] border border-[#1F1F2E] text-slate-400 group-hover:text-[#00E5FF] group-hover:border-[#00E5FF] transition-all">
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-sans font-bold text-sm text-white group-hover:text-[#00E5FF] transition-colors">
                      {ch.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#8A8FA3] truncate max-w-[200px]">
                      {ch.url.replace('https://', '')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-[#05050A] border border-[#1F1F2E] text-[#8A8FA3] group-hover:text-[#00E5FF] group-hover:border-[#00E5FF]/40 transition-all">
                    {ch.tag}
                  </span>
                  <span className="text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
