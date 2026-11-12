#!/usr/bin/env python3
"""
High-quality procedural audio synthesizer for Remotion SFX.
Generates 48kHz 16-bit stereo WAVs and encodes them into clean MP3s using ffmpeg.
"""

import math
import os
import random
import struct
import subprocess
import wave

SAMPLE_RATE = 48000
SFX_DIR = "/Users/macbookpro/.gemini/antigravity/scratch/auto-video-engine/public/audio/sfx"

def clamp(v, min_v=-1.0, max_v=1.0):
    return max(min_v, min(max_v, v))

def write_wav(filename, samples_l, samples_r):
    num_samples = len(samples_l)
    wav_path = filename + ".wav"
    with wave.open(wav_path, 'w') as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        raw_bytes = bytearray(num_samples * 4)
        for i in range(num_samples):
            # Soft limiting
            val_l = math.tanh(samples_l[i])
            val_r = math.tanh(samples_r[i])
            s16_l = int(val_l * 32760)
            s16_r = int(val_r * 32760)
            struct.pack_into('<hh', raw_bytes, i * 4, s16_l, s16_r)
        wf.writeframes(raw_bytes)

    # Convert to MP3 via ffmpeg
    mp3_path = filename + ".mp3"
    cmd = [
        "ffmpeg", "-y", "-i", wav_path,
        "-codec:a", "libmp3lame", "-b:a", "192k",
        mp3_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    if os.path.exists(wav_path):
        os.remove(wav_path)
    print(f"Generated: {mp3_path}")

def gen_whoosh_fast():
    """Whoosh / Hyperspeed Fly-by (Left-to-Right panning with Doppler)"""
    duration = 1.1
    num_samples = int(duration * SAMPLE_RATE)
    samples_l = [0.0] * num_samples
    samples_r = [0.0] * num_samples

    noise = [random.uniform(-1, 1) for _ in range(num_samples)]
    lp_val = 0.0

    for i in range(num_samples):
        t = i / SAMPLE_RATE
        progress = t / duration

        env = math.exp(-((t - 0.42) ** 2) / (2 * (0.16 ** 2)))
        freq = 160.0 + 460.0 * math.sin(math.pi * min(1.0, progress * 1.3))
        phase = 2.0 * math.pi * freq * t

        tone = 0.45 * math.sin(phase) + 0.25 * math.sin(phase * 1.5) + 0.15 * math.sin(phase * 2.2)

        alpha = min(0.6, 0.08 + 0.5 * env)
        lp_val += alpha * (noise[i] - lp_val)
        air_noise = lp_val * 1.2

        signal = (tone * 0.55 + air_noise * 0.75) * env

        pan = (t / duration) * 2.0 - 1.0
        pan = math.tanh(pan * 1.8)
        left_gain = math.sqrt(0.5 * (1.0 - pan))
        right_gain = math.sqrt(0.5 * (1.0 + pan))

        samples_l[i] = signal * left_gain
        samples_r[i] = signal * right_gain

    write_wav(os.path.join(SFX_DIR, "whoosh_fast"), samples_l, samples_r)

def gen_energy_burst():
    """Glass / Energy Detonation (Crystalline burst + deep punch + shimmer)"""
    duration = 1.6
    num_samples = int(duration * SAMPLE_RATE)
    samples_l = [0.0] * num_samples
    samples_r = [0.0] * num_samples

    bell_freqs = [880.0, 1320.0, 1760.0, 2640.0, 3520.0, 4400.0, 5280.0]
    bell_decays = [0.45, 0.65, 0.85, 1.1, 1.3, 1.6, 2.0]
    bell_pans = [-0.6, 0.5, -0.4, 0.4, -0.2, 0.2, 0.0]

    for i in range(num_samples):
        t = i / SAMPLE_RATE

        punch_env = math.exp(-t * 22.0)
        punch_freq = 45.0 + 95.0 * math.exp(-t * 30.0)
        punch = math.sin(2.0 * math.pi * punch_freq * t) * punch_env * 0.9

        chime_l = 0.0
        chime_r = 0.0
        for f, d, p in zip(bell_freqs, bell_decays, bell_pans):
            env_b = math.exp(-t * (4.0 / d))
            sig = math.sin(2.0 * math.pi * f * t) * env_b
            chime_l += sig * math.sqrt(0.5 * (1.0 - p))
            chime_r += sig * math.sqrt(0.5 * (1.0 + p))

        noise_env = math.exp(-t * 14.0)
        burst_noise = random.uniform(-1, 1) * noise_env * 0.35

        sig_l = punch * 0.6 + chime_l * 0.22 + burst_noise
        sig_r = punch * 0.6 + chime_r * 0.22 + burst_noise

        samples_l[i] = sig_l
        samples_r[i] = sig_r

    write_wav(os.path.join(SFX_DIR, "energy_burst"), samples_l, samples_r)

def gen_swapping_chimes():
    """Air Swish / Swapping Chimes (Staggered pentatonic wind chime shimmer)"""
    duration = 1.7
    num_samples = int(duration * SAMPLE_RATE)
    samples_l = [0.0] * num_samples
    samples_r = [0.0] * num_samples

    tones = [
        (0.00, 1046.5, 0.9, -0.5), # C6
        (0.12, 1318.5, 0.8, 0.4),  # E6
        (0.24, 1567.9, 0.7, -0.3), # G6
        (0.36, 1975.5, 0.6, 0.5),  # B6
        (0.48, 2093.0, 0.7, 0.0),  # C7
        (0.60, 2637.0, 0.5, 0.3),  # E7
    ]

    for i in range(num_samples):
        t = i / SAMPLE_RATE

        swish_env = math.exp(-((t - 0.4) ** 2) / (2 * (0.2 ** 2)))
        swish = random.uniform(-1, 1) * swish_env * 0.12

        l_acc = swish
        r_acc = swish

        for st, f, dec, pan in tones:
            if t >= st:
                dt = t - st
                env = math.exp(-dt * (3.5 / dec))
                mod = 1.0 + 0.003 * math.sin(2.0 * math.pi * 7.0 * dt)
                tone = math.sin(2.0 * math.pi * f * mod * dt) * env * 0.3
                l_acc += tone * math.sqrt(0.5 * (1.0 - pan))
                r_acc += tone * math.sqrt(0.5 * (1.0 + pan))

        samples_l[i] = l_acc
        samples_r[i] = r_acc

    write_wav(os.path.join(SFX_DIR, "swapping_chimes"), samples_l, samples_r)

def gen_drawer_slide():
    """App Drawer Slide (Smooth pneumatic mechanical slide up)"""
    duration = 0.85
    num_samples = int(duration * SAMPLE_RATE)
    samples_l = [0.0] * num_samples
    samples_r = [0.0] * num_samples

    for i in range(num_samples):
        t = i / SAMPLE_RATE
        env = math.sin(math.pi * min(1.0, t / 0.65)) if t < 0.65 else 0.0

        freq = 120.0 + 280.0 * (t / 0.65)
        tone = math.sin(2.0 * math.pi * freq * t) * 0.25
        air = random.uniform(-1, 1) * 0.2

        tick = 0.0
        if 0.54 <= t <= 0.58:
            tick_t = (t - 0.54) / 0.04
            tick = math.sin(2.0 * math.pi * 1800.0 * t) * math.exp(-tick_t * 6.0) * 0.45

        sig = (tone + air) * env * 0.8 + tick
        samples_l[i] = sig
        samples_r[i] = sig

    write_wav(os.path.join(SFX_DIR, "drawer_slide"), samples_l, samples_r)

def gen_pop_click():
    """Pop / Click (Crisp bubble pop / tactile mobile UI snap)"""
    duration = 0.22
    num_samples = int(duration * SAMPLE_RATE)
    samples_l = [0.0] * num_samples
    samples_r = [0.0] * num_samples

    for i in range(num_samples):
        t = i / SAMPLE_RATE

        pop_freq = 240.0 + 960.0 * math.exp(-t * 90.0)
        pop_env = math.exp(-t * 35.0)
        pop_tone = math.sin(2.0 * math.pi * pop_freq * t) * pop_env

        click_env = math.exp(-t * 300.0)
        click_tone = math.sin(2.0 * math.pi * 2600.0 * t) * click_env * 0.6

        sig = (pop_tone * 0.85 + click_tone * 0.4)
        samples_l[i] = sig
        samples_r[i] = sig

    write_wav(os.path.join(SFX_DIR, "pop_click"), samples_l, samples_r)

def gen_portal_zoom():
    """Crash-Zoom Portal / Bass Drop (Reverse suction crescendo + deep sub-bass drop)"""
    duration = 2.2
    num_samples = int(duration * SAMPLE_RATE)
    samples_l = [0.0] * num_samples
    samples_r = [0.0] * num_samples

    impact_t = 0.85

    for i in range(num_samples):
        t = i / SAMPLE_RATE

        if t < impact_t:
            prog = t / impact_t
            suction_env = math.pow(prog, 2.5)
            suction_freq = 120.0 + 680.0 * math.pow(prog, 3.0)
            tone = math.sin(2.0 * math.pi * suction_freq * t) * 0.35
            noise = random.uniform(-1, 1) * 0.35
            sig = (tone + noise) * suction_env * 0.75
            samples_l[i] = sig
            samples_r[i] = sig
        else:
            dt = t - impact_t
            decay_env = math.exp(-dt * 4.0)

            sub_freq = 32.0 + 53.0 * math.exp(-dt * 6.0)
            sub_bass = math.sin(2.0 * math.pi * sub_freq * dt) * decay_env * 0.95

            mid_thump = math.sin(2.0 * math.pi * (sub_freq * 2.2) * dt) * math.exp(-dt * 12.0) * 0.4
            rumble = random.uniform(-1, 1) * math.exp(-dt * 2.5) * 0.15

            sig = (sub_bass + mid_thump + rumble) * 0.95
            samples_l[i] = sig
            samples_r[i] = sig

    write_wav(os.path.join(SFX_DIR, "portal_zoom"), samples_l, samples_r)

def gen_card_flip():
    """Card 3D Flip Whoosh (Metallic card rotation & sleek snap)"""
    duration = 0.65
    num_samples = int(duration * SAMPLE_RATE)
    samples_l = [0.0] * num_samples
    samples_r = [0.0] * num_samples

    for i in range(num_samples):
        t = i / SAMPLE_RATE

        env = math.exp(-((t - 0.18) ** 2) / (2 * (0.07 ** 2)))
        whoosh_freq = 320.0 + 400.0 * (t / 0.45)
        air = random.uniform(-1, 1) * 0.45
        tone = math.sin(2.0 * math.pi * whoosh_freq * t) * 0.3

        metallic = 0.0
        if t >= 0.16:
            dt = t - 0.16
            m_env = math.exp(-dt * 25.0)
            metallic = (
                math.sin(2.0 * math.pi * 2100.0 * dt) * 0.4 +
                math.sin(2.0 * math.pi * 3800.0 * dt) * 0.25
            ) * m_env

        sig = (tone + air) * env * 0.75 + metallic * 0.5
        pan = math.sin((t / 0.65) * math.pi) * 0.5
        samples_l[i] = sig * math.sqrt(0.5 * (1.0 - pan))
        samples_r[i] = sig * math.sqrt(0.5 * (1.0 + pan))

    write_wav(os.path.join(SFX_DIR, "card_flip"), samples_l, samples_r)

def gen_success_chime():
    """Success Chime / Cash Register Ring (Bright crystal ding + coin explosion shimmer)"""
    duration = 1.6
    num_samples = int(duration * SAMPLE_RATE)
    samples_l = [0.0] * num_samples
    samples_r = [0.0] * num_samples

    chimes = [
        (0.00, 1046.5, 1.2, -0.2),
        (0.06, 1318.5, 1.3, 0.2),
        (0.12, 1567.9, 1.4, -0.1),
        (0.18, 2093.0, 1.5, 0.3),
    ]

    for i in range(num_samples):
        t = i / SAMPLE_RATE
        sig_l = 0.0
        sig_r = 0.0

        for st, freq, decay, pan in chimes:
            if t >= st:
                dt = t - st
                env = math.exp(-dt * (2.8 / decay))
                shimmer = 1.0 + 0.004 * math.sin(2.0 * math.pi * 8.0 * dt)
                tone = math.sin(2.0 * math.pi * freq * shimmer * dt) * env * 0.35
                overtone = math.sin(2.0 * math.pi * freq * 2.76 * dt) * math.exp(-dt * 7.0) * 0.12
                total = tone + overtone
                sig_l += total * math.sqrt(0.5 * (1.0 - pan))
                sig_r += total * math.sqrt(0.5 * (1.0 + pan))

        sparkle = 0.0
        if 0.12 <= t <= 0.65:
            sp_t = t - 0.12
            sparkle = random.uniform(-1, 1) * math.exp(-sp_t * 6.0) * 0.08

        samples_l[i] = sig_l + sparkle
        samples_r[i] = sig_r + sparkle

    write_wav(os.path.join(SFX_DIR, "success_chime"), samples_l, samples_r)

# =============================================================================
# NEW TASK SFX GENERATORS
# =============================================================================

def gen_magic_whoosh_light():
    """1. magic_whoosh_light.mp3 (Vút thẻ nhẹ nhàng, thanh thoát, zero gloom)"""
    duration = 0.55
    num_samples = int(duration * SAMPLE_RATE)
    samples_l = [0.0] * num_samples
    samples_r = [0.0] * num_samples

    # White noise buffer
    noise = [random.uniform(-1, 1) for _ in range(num_samples)]
    # High-pass filtered air shimmer
    hp_prev = 0.0
    x_prev = 0.0

    for i in range(num_samples):
        t = i / SAMPLE_RATE

        # Bell-shaped curve peaked at t = 0.22s
        env = math.exp(-((t - 0.22) ** 2) / (2 * (0.08 ** 2)))

        # Airy ascending high tone (800Hz up to 2400Hz)
        freq = 800.0 + 1600.0 * (t / duration)
        tone = math.sin(2.0 * math.pi * freq * t) * 0.22

        # Light shimmer high noise
        hp = 0.85 * (hp_prev + noise[i] - x_prev)
        hp_prev = hp
        x_prev = noise[i]
        shimmer = hp * 0.35

        sig = (tone + shimmer) * env * 0.8

        # Gentle stereo swirl
        pan = math.sin((t / duration) * math.pi) * 0.6
        samples_l[i] = sig * math.sqrt(0.5 * (1.0 - pan))
        samples_r[i] = sig * math.sqrt(0.5 * (1.0 + pan))

    write_wav(os.path.join(SFX_DIR, "magic_whoosh_light"), samples_l, samples_r)

def gen_crystal_sparkle_chime():
    """2. crystal_sparkle_chime.mp3 (Tiếng ngân pha lê thành tựu Scene 6 - uplifting, sparkling)"""
    duration = 2.4
    num_samples = int(duration * SAMPLE_RATE)
    samples_l = [0.0] * num_samples
    samples_r = [0.0] * num_samples

    # Uplifting Major 7th / Pentatonic crystalline chords (High diamond sparkle)
    # E6 (1318.5), G#6 (1661.2), B6 (1975.5), D#7 (2489.0), E7 (2637.0), G#7 (3322.4), B7 (3951.0)
    sparkles = [
        (0.00, 1318.5, 1.8, -0.3),
        (0.05, 1661.2, 1.9, 0.3),
        (0.10, 1975.5, 2.0, -0.2),
        (0.15, 2489.0, 2.1, 0.4),
        (0.20, 2637.0, 2.2, 0.0),
        (0.26, 3322.4, 2.0, -0.4),
        (0.32, 3951.0, 1.9, 0.3),
    ]

    for i in range(num_samples):
        t = i / SAMPLE_RATE
        sig_l = 0.0
        sig_r = 0.0

        for st, freq, decay, pan in sparkles:
            if t >= st:
                dt = t - st
                env = math.exp(-dt * (2.2 / decay))
                # Shimmer vibrato
                trem = 1.0 + 0.005 * math.sin(2.0 * math.pi * 9.0 * dt)
                tone = math.sin(2.0 * math.pi * freq * trem * dt) * env * 0.28
                # High crystalline bell chime overtone
                overtone = math.sin(2.0 * math.pi * (freq * 2.0) * dt) * math.exp(-dt * 6.0) * 0.12

                total = tone + overtone
                sig_l += total * math.sqrt(0.5 * (1.0 - pan))
                sig_r += total * math.sqrt(0.5 * (1.0 + pan))

        # Fairy dust sparkle shimmer trail
        if 0.15 <= t <= 1.2:
            st_d = t - 0.15
            dust_env = math.exp(-st_d * 2.5)
            fairy_dust = math.sin(2.0 * math.pi * (4400.0 + 800.0 * math.sin(20.0 * t)) * t) * dust_env * 0.06
            sig_l += fairy_dust
            sig_r += fairy_dust

        samples_l[i] = sig_l
        samples_r[i] = sig_r

    write_wav(os.path.join(SFX_DIR, "crystal_sparkle_chime"), samples_l, samples_r)

def gen_app_swoosh_soft():
    """3. app_swoosh_soft.mp3 (App trượt vào Scene 4 - smooth pneumatic airy swoosh)"""
    duration = 0.75
    num_samples = int(duration * SAMPLE_RATE)
    samples_l = [0.0] * num_samples
    samples_r = [0.0] * num_samples

    noise = [random.uniform(-1, 1) for _ in range(num_samples)]
    lp_val = 0.0

    for i in range(num_samples):
        t = i / SAMPLE_RATE

        # Asymmetric rise & smooth decay
        env = math.exp(-((t - 0.28) ** 2) / (2 * (0.12 ** 2)))

        # Soft pneumatic frequency sweep (280Hz -> 680Hz)
        freq = 280.0 + 400.0 * (t / duration)
        tone = math.sin(2.0 * math.pi * freq * t) * 0.25

        # Smooth air filter
        alpha = min(0.4, 0.05 + 0.35 * env)
        lp_val += alpha * (noise[i] - lp_val)
        air = lp_val * 0.65

        sig = (tone + air) * env * 0.75

        # Soft stereo placement
        samples_l[i] = sig * 0.95
        samples_r[i] = sig * 1.05

    write_wav(os.path.join(SFX_DIR, "app_swoosh_soft"), samples_l, samples_r)

def gen_bubble_pop_ui():
    """4. bubble_pop_ui.mp3 (Huy hiệu pop-in Scene 4 - crisp bubble pop / click)"""
    duration = 0.18
    num_samples = int(duration * SAMPLE_RATE)
    samples_l = [0.0] * num_samples
    samples_r = [0.0] * num_samples

    for i in range(num_samples):
        t = i / SAMPLE_RATE

        # Rapid descending pitch (1400Hz down to 480Hz in 25ms)
        pop_freq = 480.0 + 920.0 * math.exp(-t * 85.0)
        pop_env = math.exp(-t * 40.0)
        pop_tone = math.sin(2.0 * math.pi * pop_freq * t) * pop_env

        # Tactile UI click tick (3200Hz for 6ms)
        click_env = math.exp(-t * 350.0)
        click_tone = math.sin(2.0 * math.pi * 3200.0 * t) * click_env * 0.55

        sig = (pop_tone * 0.85 + click_tone * 0.45)
        samples_l[i] = sig
        samples_r[i] = sig

    write_wav(os.path.join(SFX_DIR, "bubble_pop_ui"), samples_l, samples_r)

def gen_chalk_writing_loop():
    """5. chalk_writing_loop.mp3 (Tiếng ma sát phấn viết bảng nhẹ nhàng, sắc nét Scene 5)"""
    duration = 2.0
    num_samples = int(duration * SAMPLE_RATE)
    samples_l = [0.0] * num_samples
    samples_r = [0.0] * num_samples

    # Rhythmic chalk stroke events: (start_time, stroke_duration, pressure, stroke_freq)
    strokes = [
        (0.00, 0.28, 0.8, 2800.0), # First equation stroke
        (0.32, 0.22, 0.7, 3100.0), # Second tick
        (0.58, 0.35, 0.85, 2600.0), # Square root / integral curve
        (0.98, 0.18, 0.75, 3400.0), # Minus / equals stroke
        (1.20, 0.30, 0.8, 2900.0), # Fraction line
        (1.54, 0.38, 0.9, 2700.0), # Underline flourish
    ]

    for i in range(num_samples):
        t = i / SAMPLE_RATE
        sig = 0.0

        for st, s_dur, press, s_freq in strokes:
            if st <= t <= st + s_dur:
                dt = t - st
                # Smooth stroke attack/release
                stroke_env = math.sin(math.pi * (dt / s_dur)) * press

                # Chalk friction texture: gritty bandpass noise around s_freq
                grit = (random.uniform(-1, 1) + 0.6 * random.uniform(-1, 1)) * 0.55
                # Slate resonance ring
                chalk_whistle = math.sin(2.0 * math.pi * s_freq * dt) * 0.08
                chalk_harmonic = math.sin(2.0 * math.pi * (s_freq * 1.6) * dt) * 0.04

                # Tap at start of stroke
                tap = 0.0
                if dt <= 0.015:
                    tap = math.sin(2.0 * math.pi * 1800.0 * dt) * math.exp(-dt * 300.0) * 0.5

                stroke_sound = (grit * 0.7 + chalk_whistle + chalk_harmonic + tap) * stroke_env
                sig += stroke_sound

        # Soft overall envelope
        fade_in = min(1.0, t / 0.08)
        fade_out = min(1.0, (duration - t) / 0.12)
        final_sig = sig * fade_in * fade_out * 0.85

        samples_l[i] = final_sig * 0.95
        samples_r[i] = final_sig * 1.05

    write_wav(os.path.join(SFX_DIR, "chalk_writing_loop"), samples_l, samples_r)

def gen_magic_ascending_chime():
    """Triumphant Ascending Magic Chime (C-E-G-C high, glockenspiel / glass harp + sparkle shimmer)"""
    duration = 2.4
    num_samples = int(duration * SAMPLE_RATE)
    samples_l = [0.0] * num_samples
    samples_r = [0.0] * num_samples

    # Pure ascending major arpeggio: C5 -> E5 -> G5 -> C6 -> E6 -> G6 -> C7
    # (start_time, freq, decay, pan)
    notes = [
        (0.00,  523.25, 1.4, -0.4), # C5
        (0.08,  659.25, 1.5, -0.2), # E5
        (0.16,  783.99, 1.6,  0.0), # G5
        (0.24, 1046.50, 1.8,  0.2), # C6
        (0.32, 1318.51, 1.9, -0.1), # E6
        (0.40, 1567.98, 2.0,  0.3), # G6
        (0.48, 2093.00, 2.2,  0.0), # C7 (High apex)
        (0.56, 3135.96, 1.8, -0.2), # High harmonic sparkle
        (0.64, 4186.01, 1.6,  0.2), # Pure diamond overtone
    ]

    for i in range(num_samples):
        t = i / SAMPLE_RATE
        sig_l = 0.0
        sig_r = 0.0

        for st, freq, decay, pan in notes:
            if t >= st:
                dt = t - st
                # Glockenspiel bell envelope: instant attack, exponential ring
                env = math.exp(-dt * (2.6 / decay))

                # Pure crystal bell tone (fundamental + 2.76x chime overtone + 5.4x glass shimmer)
                bell_fund = math.sin(2.0 * math.pi * freq * dt)
                bell_over1 = math.sin(2.0 * math.pi * (freq * 2.756) * dt) * math.exp(-dt * 6.0) * 0.25
                bell_over2 = math.sin(2.0 * math.pi * (freq * 5.404) * dt) * math.exp(-dt * 10.0) * 0.12

                # Crisp mallet strike tick (first 8ms)
                mallet = 0.0
                if dt <= 0.008:
                    mallet = math.sin(2.0 * math.pi * 3200.0 * dt) * math.exp(-dt * 400.0) * 0.45

                note_signal = (bell_fund * 0.7 + bell_over1 + bell_over2 + mallet) * env * 0.35

                left_gain = math.sqrt(0.5 * (1.0 - pan))
                right_gain = math.sqrt(0.5 * (1.0 + pan))
                sig_l += note_signal * left_gain
                sig_r += note_signal * right_gain

        # Golden sparkle shimmer overlay during apex (t = 0.45 to 1.6s)
        if 0.45 <= t <= 1.8:
            dt_sparkle = t - 0.45
            sparkle_env = math.exp(-dt_sparkle * 2.2)
            # High frequency fairy dust flutter
            flutter = math.sin(2.0 * math.pi * 14.0 * dt_sparkle) * 0.5 + 0.5
            sparkle_tone = (
                math.sin(2.0 * math.pi * 5200.0 * t) * 0.05 +
                math.sin(2.0 * math.pi * 6800.0 * t) * 0.03
            ) * flutter * sparkle_env
            sig_l += sparkle_tone
            sig_r += sparkle_tone

        samples_l[i] = sig_l
        samples_r[i] = sig_r

    write_wav(os.path.join(SFX_DIR, "magic_ascending_chime"), samples_l, samples_r)
    # Also copy / generate level_up_sparkle as alias
    write_wav(os.path.join(SFX_DIR, "level_up_sparkle"), samples_l, samples_r)

if __name__ == "__main__":
    print(f"Synthesizing all SFX into {SFX_DIR}...")
    gen_whoosh_fast()
    gen_energy_burst()
    gen_swapping_chimes()
    gen_drawer_slide()
    gen_pop_click()
    gen_portal_zoom()
    gen_card_flip()
    gen_success_chime()
    # New task SFX
    gen_magic_whoosh_light()
    gen_crystal_sparkle_chime()
    gen_app_swoosh_soft()
    gen_bubble_pop_ui()
    gen_chalk_writing_loop()
    gen_magic_ascending_chime()
    print("All SFX successfully generated!")
