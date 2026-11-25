#!/usr/bin/env python3
"""
Chai Communication x Meritz Partners (Project 2611)
5-Cut Timeline & Remotion Production Spec PDF Generator

Uses PIL + macOS Unicode & Korean Hangul fonts (Arial Unicode + AppleSDGothicNeo + Menlo)
and rasterizes visual plates from public/storyboard/Chai/spec 1.svg & spec 2.svg.
"""

import os
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
STORYBOARD_DIR = ROOT / "public" / "storyboard" / "Chai"
OUT_DIR = ROOT / "public" / "downloads" / "chai"
OUT_PDF = OUT_DIR / "Meritz_Partners_5Cut_Timeline_Spec.pdf"
TMP_DIR = Path("/tmp/chai_pdf_assets")

PAGE_W = 1920
PAGE_H = 1080

# Cyber-Brutalist + Meritz Amber Palette
BG_DARK = (5, 5, 10)          # #05050A
SURFACE_DARK = (10, 12, 20)   # #0A0C14
CARD_DARK = (14, 18, 30)      # #0E121E
BORDER_DARK = (31, 31, 46)    # #1F1F2E
AMBER = (249, 115, 22)        # #F97316 (Meri Signature Amber)
AMBER_DIM = (45, 22, 8)
CYAN = (0, 229, 255)          # #00E5FF
CYAN_DIM = (3, 30, 43)
EMERALD = (16, 185, 129)      # #10B981
EMERALD_DIM = (10, 26, 20)
TEXT_WHITE = (255, 255, 255)
TEXT_SLATE = (203, 213, 225)
TEXT_MUTED = (138, 143, 163)

# Fonts (100% Vietnamese + Korean Hangul + Monospace)
# Arial Unicode supports BOTH full Vietnamese diacritics AND full Korean Hangul with zero tofu boxes.
FONT_MONO_PATH = "/System/Library/Fonts/Menlo.ttc"
FONT_VI_PATH = "/Library/Fonts/Arial Unicode.ttf"
FONT_KR_PATH = "/System/Library/Fonts/AppleSDGothicNeo.ttc"

f_mono_xs = ImageFont.truetype(FONT_MONO_PATH, 13)
f_mono_sm = ImageFont.truetype(FONT_MONO_PATH, 15)
f_mono_md = ImageFont.truetype(FONT_MONO_PATH, 18)

f_vi_sm = ImageFont.truetype(FONT_VI_PATH, 16)
f_vi_md = ImageFont.truetype(FONT_VI_PATH, 19)
f_vi_lg = ImageFont.truetype(FONT_VI_PATH, 24)
f_vi_xl = ImageFont.truetype(FONT_VI_PATH, 30)
f_vi_hero = ImageFont.truetype(FONT_VI_PATH, 42)

# Use Arial Unicode for mixed KR+VI lines so neither Korean Hangul nor Vietnamese diacritics ever tofu
f_kr_sm = ImageFont.truetype(FONT_VI_PATH, 16)
f_kr_md = ImageFont.truetype(FONT_VI_PATH, 20)
f_kr_lg = ImageFont.truetype(FONT_KR_PATH, 26, index=7)


def ensure_assets():
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    resvg_bin = ROOT / "node_modules" / ".bin" / "resvg-js"

    spec_pngs = {}
    for idx in (1, 2, 3):
        svg_path = STORYBOARD_DIR / f"spec {idx}.svg"
        png_path = TMP_DIR / (f"spec_{idx}_new.png" if idx == 3 else f"spec_{idx}.png")
        if svg_path.exists():
            if not png_path.exists() or png_path.stat().st_mtime < svg_path.stat().st_mtime:
                subprocess.run([str(resvg_bin), str(svg_path), str(png_path)], check=True)
            spec_pngs[idx] = png_path

    # Ensure cut5 keyframe still exists
    cut5_path = TMP_DIR / "cut5_frame650.png"
    mp4_path = OUT_DIR / "Chai_Communication_Meritz_Partners_24fps_v2.mp4"
    if not cut5_path.exists() and mp4_path.exists():
        subprocess.run(
            [
                "ffmpeg", "-y", "-i", str(mp4_path),
                "-vf", "select=eq(n\\,650)", "-vframes", "1",
                str(cut5_path), "-loglevel", "error",
            ],
            check=True,
        )
    return spec_pngs, cut5_path if cut5_path.exists() else None


def crop_phone_slot(sheet_img: Image.Image, slot_idx: int) -> Image.Image:
    """Crop 1 of 3 equal horizontal phone mockup slots from a 1920x1080 SVG sheet."""
    w, h = sheet_img.size
    third = w // 3
    x0 = slot_idx * third
    x1 = (slot_idx + 1) * third if slot_idx < 2 else w
    cropped = sheet_img.crop((x0, 0, x1, h))
    # Trim transparent/white outer margin slightly while keeping aspect ratio
    bbox = cropped.getbbox()
    if bbox:
        cropped = cropped.crop(bbox)
    return cropped


def draw_grid_bg(draw: ImageDraw.ImageDraw):
    grid_color = (14, 18, 30)
    for x in range(0, PAGE_W, 60):
        draw.line([(x, 0), (x, PAGE_H)], fill=grid_color, width=1)
    for y in range(0, PAGE_H, 60):
        draw.line([(0, y), (PAGE_W, y)], fill=grid_color, width=1)

    draw.rectangle([20, 20, PAGE_W - 20, PAGE_H - 20], outline=BORDER_DARK, width=2)
    b = 28
    for (x1, y1, x2, y2) in [
        (20, 20, 20 + b, 20), (20, 20, 20, 20 + b),
        (PAGE_W - 20 - b, 20, PAGE_W - 20, 20), (PAGE_W - 20, 20, PAGE_W - 20, 20 + b),
        (20, PAGE_H - 20, 20 + b, PAGE_H - 20), (20, PAGE_H - 20 - b, 20, PAGE_H - 20),
        (PAGE_W - 20 - b, PAGE_H - 20, PAGE_W - 20, PAGE_H - 20), (PAGE_W - 20, PAGE_H - 20 - b, PAGE_W - 20, PAGE_H - 20),
    ]:
        draw.line([(x1, y1), (x2, y2)], fill=AMBER, width=3)


def draw_header(draw: ImageDraw.ImageDraw, tag: str, title: str, page_num: int, total_pages: int):
    tb = draw.textbbox((0, 0), tag, font=f_mono_xs)
    tag_w = (tb[2] - tb[0]) + 34
    draw.rectangle([44, 34, 44 + tag_w, 64], fill=AMBER_DIM, outline=AMBER, width=1)
    draw.rectangle([54, 45, 60, 53], fill=AMBER)
    draw.text((68, 41), tag, font=f_mono_xs, fill=AMBER)

    draw.text((44 + tag_w + 22, 34), title, font=f_vi_lg, fill=TEXT_WHITE)

    right_txt = f"PROJECT 2611 // 1080x1920 & 1080x1080 @ 24.00 FPS // [ PAGE {page_num:02d} / {total_pages:02d} ]"
    rb = draw.textbbox((0, 0), right_txt, font=f_mono_xs)
    draw.text((PAGE_W - 44 - (rb[2] - rb[0]), 41), right_txt, font=f_mono_xs, fill=TEXT_MUTED)

    draw.line([(44, 76), (PAGE_W - 44, 76)], fill=AMBER, width=2)
    draw.line([(44, 80), (PAGE_W - 44, 80)], fill=BORDER_DARK, width=1)


def draw_footer(draw: ImageDraw.ImageDraw, page_num: int, total_pages: int):
    draw.line([(44, PAGE_H - 52), (PAGE_W - 44, PAGE_H - 52)], fill=BORDER_DARK, width=1)
    draw.text(
        (44, PAGE_H - 38),
        "CHAI COMMUNICATION (KOSDAQ) × MERITZ PARTNERS // GENIE 4 + REMOTION ENGINE",
        font=f_mono_xs,
        fill=TEXT_MUTED,
    )
    mid = "EBU R128 (-19.8 dB INTEGRATED) • 720 FRAMES (30.0s)"
    mb = draw.textbbox((0, 0), mid, font=f_mono_xs)
    draw.text(((PAGE_W - (mb[2] - mb[0])) // 2, PAGE_H - 38), mid, font=f_mono_xs, fill=CYAN)

    right = f"DOC: MERITZ-5CUT-SPEC-2611 // {page_num:02d}/{total_pages:02d}"
    rb = draw.textbbox((0, 0), right, font=f_mono_xs)
    draw.text((PAGE_W - 44 - (rb[2] - rb[0]), PAGE_H - 38), right, font=f_mono_xs, fill=TEXT_MUTED)


def wrap_lines(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_w: int):
    out = []
    for para in text.split("\n"):
        if not para.strip():
            out.append("")
            continue
        words = para.split(" ")
        cur = ""
        for w in words:
            cand = f"{cur} {w}".strip()
            if draw.textbbox((0, 0), cand, font=font)[2] <= max_w:
                cur = cand
            else:
                if cur:
                    out.append(cur)
                cur = w
        if cur:
            out.append(cur)
    return out


def draw_wrapped(draw, x, y, text, font, color, max_w, line_h):
    for line in wrap_lines(draw, text, font, max_w):
        draw.text((x, y), line, font=font, fill=color)
        y += line_h
    return y


def paste_fit(page: Image.Image, img: Image.Image, box: tuple):
    x0, y0, x1, y1 = box
    bw, bh = x1 - x0, y1 - y0
    src = img.convert("RGBA")
    ratio = min(bw / src.width, bh / src.height)
    nw, nh = max(1, int(src.width * ratio)), max(1, int(src.height * ratio))
    resized = src.resize((nw, nh), Image.Resampling.LANCZOS)
    px = x0 + (bw - nw) // 2
    py = y0 + (bh - nh) // 2
    page.paste(resized, (px, py), resized)


def draw_cut_card(page: Image.Image, draw: ImageDraw.ImageDraw, y_top: int, h: int, cut_img: Image.Image, data: dict):
    x0, x1 = 44, PAGE_W - 44
    draw.rectangle([x0, y_top, x1, y_top + h], fill=SURFACE_DARK, outline=BORDER_DARK, width=2)
    draw.rectangle([x0, y_top, x0 + 6, y_top + h], fill=AMBER)

    # Left visual panel
    img_panel = (x0 + 20, y_top + 18, x0 + 360, y_top + h - 18)
    draw.rectangle(img_panel, fill=BG_DARK, outline=BORDER_DARK, width=1)
    if cut_img is not None:
        paste_fit(page, cut_img, (img_panel[0] + 10, img_panel[1] + 10, img_panel[2] - 10, img_panel[3] - 10))

    # Right text panel
    tx = x0 + 388
    max_w = x1 - tx - 28
    y = y_top + 20

    # Tag & Frame badge
    tag_txt = f"{data['code']}  //  {data['frames']}"
    tb = draw.textbbox((0, 0), tag_txt, font=f_mono_sm)
    draw.rectangle([tx, y, tx + (tb[2] - tb[0]) + 24, y + 30], fill=AMBER_DIM, outline=AMBER, width=1)
    draw.text((tx + 12, y + 6), tag_txt, font=f_mono_sm, fill=AMBER)
    y += 40

    # Cut Title
    draw.text((tx, y), data["title"], font=f_vi_xl, fill=TEXT_WHITE)
    y += 42

    # Visual Plate
    draw.text((tx, y), "GENIE 4 VISUAL PLATE:", font=f_mono_xs, fill=CYAN)
    y += 20
    y = draw_wrapped(draw, tx, y, data["visual"], f_vi_sm, TEXT_SLATE, max_w, 23) + 10

    # Voiceover box (KO + VI)
    vo_y0 = y
    vo_lines_kr = wrap_lines(draw, data["vo_kr"], f_kr_md, max_w - 28)
    vo_lines_vi = wrap_lines(draw, data["vo_vi"], f_vi_sm, max_w - 28)
    vo_h = 26 + len(vo_lines_kr) * 28 + len(vo_lines_vi) * 23 + 16
    draw.rectangle([tx, vo_y0, tx + max_w, vo_y0 + vo_h], fill=BG_DARK, outline=(55, 65, 90), width=1)
    draw.text((tx + 14, vo_y0 + 8), "VOICEOVER (KR / VI):", font=f_mono_xs, fill=AMBER)
    cy = vo_y0 + 28
    for ln in vo_lines_kr:
        draw.text((tx + 14, cy), ln, font=f_kr_md, fill=TEXT_WHITE)
        cy += 28
    for ln in vo_lines_vi:
        draw.text((tx + 14, cy), ln, font=f_vi_sm, fill=TEXT_MUTED)
        cy += 23
    y = vo_y0 + vo_h + 12

    # Remotion Motion Layer
    draw.text((tx, y), "REMOTION MOTION LAYER:", font=f_mono_xs, fill=EMERALD)
    y += 20
    draw_wrapped(draw, tx, y, data["motion"], f_vi_sm, TEXT_SLATE, max_w, 23)


def strip_outer_white(img: Image.Image, threshold: int = 242) -> Image.Image:
    """Convert contiguous outer white background (connected to image edges) to transparent."""
    rgba = img.convert("RGBA")
    w, h = rgba.size
    pix = rgba.load()
    visited = bytearray(w * h)
    stack = []

    def is_white(x, y):
        r, g, b, a = pix[x, y]
        return a > 0 and r >= threshold and g >= threshold and b >= threshold

    for x in range(w):
        if is_white(x, 0):
            stack.append((x, 0))
            visited[x] = 1
        if is_white(x, h - 1):
            stack.append((x, h - 1))
            visited[(h - 1) * w + x] = 1
    for y in range(h):
        if is_white(0, y):
            stack.append((0, y))
            visited[y * w] = 1
        if is_white(w - 1, y):
            stack.append((w - 1, y))
            visited[y * w + (w - 1)] = 1

    while stack:
        cx, cy = stack.pop()
        pix[cx, cy] = (0, 0, 0, 0)
        for nx, ny in ((cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)):
            if 0 <= nx < w and 0 <= ny < h:
                idx = ny * w + nx
                if not visited[idx] and is_white(nx, ny):
                    visited[idx] = 1
                    stack.append((nx, ny))
    return rgba


def build_pdf():
    spec_pngs, cut5_path = ensure_assets()
    sheet1 = Image.open(spec_pngs[1]).convert("RGBA") if 1 in spec_pngs else None
    sheet2 = Image.open(spec_pngs[2]).convert("RGBA") if 2 in spec_pngs else None
    sheet3 = strip_outer_white(Image.open(spec_pngs[3])) if 3 in spec_pngs else None
    cut5_fallback = Image.open(cut5_path).convert("RGBA") if cut5_path else None

    cut1_img = crop_phone_slot(sheet1, 2) if sheet1 else None
    cut2_img = crop_phone_slot(sheet2, 0) if sheet2 else None
    cut3_img = crop_phone_slot(sheet2, 1) if sheet2 else None
    cut4_img = crop_phone_slot(sheet2, 2) if sheet2 else None
    cut5_img = crop_phone_slot(sheet3, 0) if sheet3 else cut5_fallback

    pages = []
    total_pages = 6 if sheet3 is not None else 5

    # ── PAGE 1: COVER & PRODUCTION OVERVIEW + SPEC 1 VISUAL SHEET ────────
    p1 = Image.new("RGB", (PAGE_W, PAGE_H), BG_DARK)
    d1 = ImageDraw.Draw(p1)
    draw_grid_bg(d1)
    draw_header(d1, "00 // EXECUTIVE SPEC", "MERITZ PARTNERS × CHAI COMMUNICATION", 1, total_pages)

    # Top Title Banner
    d1.rectangle([44, 96, PAGE_W - 44, 240], fill=SURFACE_DARK, outline=AMBER, width=2)
    d1.text((70, 112), "MERITZ PARTNERS (메리츠 파트너스) × CHAI COMMUNICATION", font=f_kr_lg, fill=AMBER)
    d1.text((70, 150), "SHORT DRAMA PERFORMANCE AD // 5-CUT TIMELINE & REMOTION PRODUCTION SPEC", font=f_vi_xl, fill=TEXT_WHITE)
    d1.text(
        (70, 196),
        'Core Hook: "150만원 소문에 장터가 뒤집혔다" — Chấn động chợ Joseon vì tin đồn phụ cấp 150 lượng',
        font=f_kr_md,
        fill=CYAN,
    )

    # Left Metadata Box
    d1.rectangle([44, 260, 740, PAGE_H - 72], fill=SURFACE_DARK, outline=BORDER_DARK, width=2)
    d1.text((68, 280), "[ PRODUCTION METADATA & TECH SPECS ]", font=f_mono_md, fill=AMBER)
    meta_rows = [
        ("CLIENT / AGENCY", "Chai Communication (KOSDAQ)"),
        ("CAMPAIGN", "Meritz Partners (메리츠 파트너스)\nNew Consultant Recruitment"),
        ("MASCOT", "Meri (메리) — Linh thú lông cam đội mũ gat (갓)\nvà áo hanbok Joseon"),
        ("DUAL-TRACK ENGINE", "Google Studio (Genie 4 Clean Plates)\n+ Remotion Engine (Kinetic Subtitles & Audio)"),
        ("ASPECT RATIOS", "1080x1920 (9:16 Vertical Shorts/Reels)\n& 1080x1080 (1:1 Square Kakao/In-Feed)"),
        ("FRAME SPEC", "24.00 FPS Cinematic • 720 Frames (30.0s)"),
        ("AUDIO STANDARD", "EBU R128 (-19.8 dB Integrated)"),
    ]
    my = 324
    for label, val in meta_rows:
        d1.text((68, my), label, font=f_mono_xs, fill=CYAN)
        my += 20
        for ln in val.split("\n"):
            font_use = f_kr_sm if any("\uac00" <= ch <= "\ud7a3" for ch in ln) else f_vi_sm
            d1.text((68, my), ln, font=font_use, fill=TEXT_WHITE)
            my += 24
        my += 16

    # Right Visual Board (spec 1.svg)
    d1.rectangle([764, 260, PAGE_W - 44, PAGE_H - 72], fill=SURFACE_DARK, outline=BORDER_DARK, width=2)
    d1.text((788, 280), "[ VISUAL BOARD 01 // MERI CHARACTER LOCK • CLEAN JOSEON PLATE • CUT 01 ]", font=f_mono_sm, fill=EMERALD)
    if sheet1 is not None:
        paste_fit(p1, sheet1, (784, 316, PAGE_W - 64, PAGE_H - 92))
    draw_footer(d1, 1, total_pages)
    pages.append(p1)

    # ── PAGE 2: CUT 01 & CUT 02 ──────────────────────────────────────────
    p2 = Image.new("RGB", (PAGE_W, PAGE_H), BG_DARK)
    d2 = ImageDraw.Draw(p2)
    draw_grid_bg(d2)
    draw_header(d2, "01 // TIMELINE CUTS 01–02", "BẢNG PHÂN RÃ CHI TIẾT 5 PHÂN CẢNH (PHẦN 1)", 2, total_pages)

    draw_cut_card(
        p2, d2, 98, 446, cut1_img,
        {
            "code": "CUT 01",
            "frames": "Frame 0 – 120 (5.0s / 24 FPS)",
            "title": "MERI LOAN BÁO TIN ĐỒN (THE ROYAL PROCLAMATION)",
            "visual": "Meri đứng một mình bên bảng cáo thị hoàng gia ở đầu chợ Joseon, tay chỉ dõng dạc loan báo. Khóa Safe Zone 60% trung tâm, chừa 20% đỉnh đầu cho Top Sticky Banner.",
            "vo_kr": '"듣거라! 보험설계사 위촉응시자 모집, 첫 달 평균 백오십냥!"',
            "vo_vi": 'Bản dịch: "Lắng nghe đây! Tuyển ứng viên tư vấn bảo hiểm, tháng đầu trung bình 150 lượng!"',
            "motion": '• Khởi tạo Top Sticky News Banner (ChaiTopBanner.tsx): "150만원 소문에 장터가 뒤집혔다".\n• Subtitle xuất hiện từ frame 24 bằng lò xo spring({ damping: 14, stiffness: 120 }).',
        },
    )
    draw_cut_card(
        p2, d2, 560, 446, cut2_img,
        {
            "code": "CUT 02",
            "frames": "Frame 120 – 192 (3.0s / 24 FPS)",
            "title": "DÂN LÀNG BÀN TÁN KINH NGẠC (MARKETPLACE COMMOTION)",
            "visual": "Cận cảnh nhóm dân làng bên quầy hàng: thanh niên áo trắng chỉ tay kinh ngạc, ông lão vuốt râu tò mò trước bảng cáo thị 150 lượng.",
            "vo_kr": 'Nam trẻ: "백오십냥?!"   |   Ông lão: "진짜 그 정도 준대?"',
            "vo_vi": 'Bản dịch: "150 lượng sao?! Thật sự cho nhiều thế ư?"',
            "motion": '• Huy hiệu nảy chữ Kinetic Pop-up: "150냥 (150 Lượng)" bung nổ đàn hồi ở giữa màn hình.\n• Âm thanh SFX: Tiếng xôn xao chợ phiên và tiếng gõ mõ "Clack".',
        },
    )
    draw_footer(d2, 2, total_pages)
    pages.append(p2)

    # ── PAGE 3: CUT 03 & CUT 04 ──────────────────────────────────────────
    p3 = Image.new("RGB", (PAGE_W, PAGE_H), BG_DARK)
    d3 = ImageDraw.Draw(p3)
    draw_grid_bg(d3)
    draw_header(d3, "02 // TIMELINE CUTS 03–04", "BẢNG PHÂN RÃ CHI TIẾT 5 PHÂN CẢNH (PHẦN 2)", 3, total_pages)

    draw_cut_card(
        p3, d3, 98, 446, cut3_img,
        {
            "code": "CUT 03",
            "frames": "Frame 192 – 384 (8.0s / 24 FPS)",
            "title": "CÔ GÁI ĐỐI THOẠI & MERI KHÍCH LỆ (INQUIRY & ENCOURAGEMENT)",
            "visual": "Cô gái gánh hàng rơm e dè bước tới hỏi Meri; Meri tươi cười gật đầu khích lệ, ánh mắt lấp lánh tự tin trên bục gỗ đầu chợ.",
            "vo_kr": 'Cô gái: "첫 달에 백오십냥을 벌 수 있단 말이오?"\nMeri: "그렇소! 마음만 먹으면 누구나 도전할 수 있소!"',
            "vo_vi": 'Bản dịch: "Tháng đầu có thể kiếm được 150 lượng thật sao?" — "Đúng vậy! Chỉ cần quyết tâm thì ai cũng có thể thử sức!"',
            "motion": "• Phụ đề đổi màu động theo người nói: Cô gái thoại (Chữ trắng viền đen) ➔ Meri đáp (Chữ vàng cam hổ phách #F97316).",
        },
    )
    draw_cut_card(
        p3, d3, 560, 446, cut4_img,
        {
            "code": "CUT 04",
            "frames": "Frame 384 – 528 (6.0s / 24 FPS)",
            "title": "GIẢI TỎA THẮC MẮC: SƯ PHỤ KÈM CẶP (THE MENTOR REASSURANCE)",
            "visual": "Thương nhân trung niên ngập ngừng hỏi khó; Meri giơ tay giải thích rõ ràng, phong thái đĩnh đạc trấn an người nghe.",
            "vo_kr": 'Nam trung niên: "과거시험 같은 것이오?"\nMeri: "그렇소. 대신 멘토 스승이 붙어 길잡이부터 다 알려주오!"',
            "vo_vi": 'Bản dịch: "Có khó như thi khoa cử không?" — "Đúng vậy. Nhưng có Sư phụ Mentor kèm cặp, chỉ dẫn từ đường đi nước bước!"',
            "motion": '• Badge nhận diện: "멘토 스승 (Sư Phụ Kèm Cặp)" phát sáng viền cyan, ghim chắc chắn trên ngực áo Meri.',
        },
    )
    draw_footer(d3, 3, total_pages)
    pages.append(p3)

    # ── PAGE 4: CUT 05 + REMOTION COMPONENT REGISTRY ─────────────────────
    p4 = Image.new("RGB", (PAGE_W, PAGE_H), BG_DARK)
    d4 = ImageDraw.Draw(p4)
    draw_grid_bg(d4)
    draw_header(d4, "03 // CUT 05 & CODE ARCHITECTURE", "COMMUNITY CALL, BRAND OUTRO & COMPONENT REGISTRY", 4, total_pages)

    draw_cut_card(
        p4, d4, 98, 520, cut5_img,
        {
            "code": "CUT 05",
            "frames": "Frame 528 – 720 (8.0s / 24 FPS)",
            "title": "ĐÁM ĐÔNG HƯỞNG ỨNG & THẺ KẾT THƯƠNG HIỆU (BRAND OUTRO)",
            "visual": "Cả đám đông ùa tới giơ đơn xin nộp; Meri bước về phía trước camera dang rộng hai tay chốt hạ thông điệp chiến dịch Meritz Partners.",
            "vo_kr": 'Đám đông: "나도 신청하겠소! 내가 먼저 도전하겠소!"\nMeri: "먼저 준비하는 사람이 임자, 메리츠파트너스!"',
            "vo_vi": 'Bản dịch: "Tôi cũng muốn đăng ký! Để tôi thử sức trước!" — "Người chuẩn bị trước là người nắm chắc phần thắng, Meritz Partners!"',
            "motion": '• ChaiEndingCard.tsx: Màn hình mờ dần (Dim 40%), Logo chính hãng Meritz Partners (logo_wh.png) hiển thị trang trọng.\n• Bảng số liệu: "첫달 평균 150만원 부수익" (Thu nhập phụ tháng đầu trung bình 1.5 triệu won).\n• Nút CTA K-Drama Ad: "메리츠 파트너스 지금 지원하기" (Ứng tuyển Meritz Partners ngay).',
        },
    )

    # Component Registry Box
    reg_y = 636
    d4.rectangle([44, reg_y, PAGE_W - 44, PAGE_H - 72], fill=SURFACE_DARK, outline=CYAN, width=2)
    d4.text((68, reg_y + 20), "KIẾN TRÚC THÀNH PHẦN MÃ NGUỒN REMOTION (COMPONENT REGISTRY)", font=f_vi_lg, fill=CYAN)

    comps = [
        ("01", "src/components/chai/ChaiTopBanner.tsx", "Sticky News Banner đỉnh màn hình (20% Top Safe Zone)"),
        ("02", "src/components/chai/ChaiDynamicSubtitle.tsx", "Phụ đề Kinetic Pop-up nảy theo frame với spring(damping: 14, stiffness: 120)"),
        ("03", "src/components/chai/ChaiEndingCard.tsx", "Thẻ kết thúc CTA, Dim 40% Overlay & Brand Logo Outro (logo_wh.png)"),
        ("04", "src/components/chai/ChaiSquareAdapter.tsx", "Tự động crop & gán nền mờ cho bản 1:1 Square (Kakao / In-Feed)"),
    ]
    cy = reg_y + 68
    for idx, comp_path, comp_desc in comps:
        d4.rectangle([68, cy, 114, cy + 34], fill=CYAN_DIM, outline=CYAN, width=1)
        d4.text((81, cy + 8), idx, font=f_mono_sm, fill=CYAN)
        d4.text((132, cy + 7), comp_path, font=f_mono_md, fill=TEXT_WHITE)
        d4.text((660, cy + 7), f"➔  {comp_desc}", font=f_vi_sm, fill=TEXT_SLATE)
        cy += 50

    draw_footer(d4, 4, total_pages)
    pages.append(p4)

    # ── PAGE 5: VISUAL CONTINUITY SHEET (SPEC 2) ─────────────────────────
    p5 = Image.new("RGB", (PAGE_W, PAGE_H), BG_DARK)
    d5 = ImageDraw.Draw(p5)
    draw_grid_bg(d5)
    draw_header(d5, "04 // VISUAL CONTINUITY BOARD", "GENIE 4 CLEAN PLATES — CUTS 02 / 03 / 04 STORYBOARD REFERENCE", 5, total_pages)

    d5.rectangle([44, 96, PAGE_W - 44, PAGE_H - 130], fill=SURFACE_DARK, outline=BORDER_DARK, width=2)
    if sheet2 is not None:
        paste_fit(p5, sheet2, (64, 112, PAGE_W - 64, PAGE_H - 146))

    # Bottom cut labels aligned under the 3 mockups
    labels = [
        ("CUT 02 // FRAMES 120–192 (3.0s)", "Marketplace Commotion • 150냥 Kinetic Badge"),
        ("CUT 03 // FRAMES 192–384 (8.0s)", "Inquiry & Encouragement • Dual-Color Subtitles"),
        ("CUT 04 // FRAMES 384–528 (6.0s)", "Mentor Reassurance • 멘토 스승 Cyan Badge"),
    ]
    col_w = (PAGE_W - 88) // 3
    for i, (t1, t2) in enumerate(labels):
        bx = 44 + i * col_w
        d5.rectangle([bx, PAGE_H - 118, bx + col_w - 12, PAGE_H - 64], fill=CARD_DARK, outline=AMBER, width=1)
        d5.text((bx + 16, PAGE_H - 110), t1, font=f_mono_sm, fill=AMBER)
        d5.text((bx + 16, PAGE_H - 88), t2, font=f_kr_sm, fill=TEXT_SLATE)

    draw_footer(d5, 5, total_pages)
    pages.append(p5)

    # ── PAGE 6: FINALE & BRAND OUTRO BOARD (SPEC 3) ──────────────────────
    if sheet3 is not None:
        p6 = Image.new("RGB", (PAGE_W, PAGE_H), BG_DARK)
        d6 = ImageDraw.Draw(p6)
        draw_grid_bg(d6)
        draw_header(d6, "05 // FINALE & BRAND OUTRO BOARD", "CUT 05 COMMUNITY CALL • MERI CLOSING • MERITZ PARTNERS OUTRO CARD", 6, total_pages)

        d6.rectangle([44, 96, PAGE_W - 44, PAGE_H - 130], fill=SURFACE_DARK, outline=BORDER_DARK, width=2)
        paste_fit(p6, sheet3, (64, 112, PAGE_W - 64, PAGE_H - 146))

        labels3 = [
            ("CUT 05A // COMMUNITY CALL", "Đám đông hưởng ứng • Meri dang rộng hai tay"),
            ("CUT 05B // MERI FINALE CLOSE-UP", 'Chốt thông điệp: "먼저 준비하는 사람이 임자!"'),
            ("CUT 05C // REMOTION BRAND OUTRO", "Dim 40% • Logo Meritz • CTA 메리츠 파트너스 지금 지원하기"),
        ]
        for i, (t1, t2) in enumerate(labels3):
            bx = 44 + i * col_w
            d6.rectangle([bx, PAGE_H - 118, bx + col_w - 12, PAGE_H - 64], fill=CARD_DARK, outline=CYAN, width=1)
            d6.text((bx + 16, PAGE_H - 110), t1, font=f_mono_sm, fill=CYAN)
            d6.text((bx + 16, PAGE_H - 88), t2, font=f_kr_sm, fill=TEXT_SLATE)

        draw_footer(d6, 6, total_pages)
        pages.append(p6)

    # Save multi-page PDF
    pages[0].save(
        str(OUT_PDF),
        "PDF",
        resolution=150.0,
        save_all=True,
        append_images=pages[1:],
    )
    print(f"✅ Generated PDF successfully: {OUT_PDF} ({OUT_PDF.stat().st_size / (1024*1024):.2f} MB, {len(pages)} pages)")


if __name__ == "__main__":
    build_pdf()
