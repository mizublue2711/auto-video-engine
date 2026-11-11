import os
import xml.etree.ElementTree as ET

# Exact locked color palette:
# Base Skin: #F6D6BA (Natural healthy Asian ivory/peach)
# Skin Shading: #E5B995
# Hair (Main Silhouette): Obsidian Charcoal #1E2430
# Hair Highlights (Temple Silver Strands): Slate Silver #64748B & #94A3B8
# Eyeglasses Frame: Titanium Silver #94A3B8 (stroke-width: 1.4)
# Eyes (Irises): Deep Espresso Black #111827, Specular Glint: Pure White #FFFFFF
# Lips / Smile Line: Warm Rose Muted #C28472

svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="100%" height="100%">
  <defs>
    <!-- Crisp Vector Rendering Optimizations -->
    <style>
      .skin-base { fill: #F6D6BA; }
      .skin-shade { fill: #E5B995; }
      .hair-base { fill: #1E2430; }
      .hair-highlight { fill: #64748B; }
      .hair-highlight-light { fill: #94A3B8; }
      .glasses-line { stroke: #94A3B8; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; fill: none; }
      .feature-line { stroke: #DFA884; stroke-linecap: round; stroke-linejoin: round; fill: none; }
      .feature-accent { stroke: #C88D68; stroke-linecap: round; stroke-linejoin: round; fill: none; }
      .eye-crease { stroke: #B98063; stroke-linecap: round; stroke-linejoin: round; fill: none; }
      .mouth-line { stroke: #C28472; stroke-linecap: round; stroke-linejoin: round; fill: none; }
    </style>
  </defs>

  <!-- ========================================================================= -->
  <!-- LAYER 1: NECK & JAW SHADOW                                                -->
  <!-- ========================================================================= -->
  <g id="part-director-neck" data-pivot="100 230">
    <!-- Neck Base Column extending from y: 195 to y: 235, width 38px (x: 81 to 119) -->
    <!-- Anatomically sloped outward at trapezius base (x: 75 to 125 at y: 235) -->
    <path id="neck-base-pillar"
      d="M 81 195
         L 75 235
         L 125 235
         L 119 195
         Z"
      class="skin-base" />

    <!-- Trapezius slope cel-shading at collar socket -->
    <path id="neck-trapezius-shade"
      d="M 75 235
         C 82 227 89 224 100 224
         C 111 224 118 227 125 235
         Z"
      class="skin-shade" opacity="0.5" />

    <!-- Crisp Anatomical Triangular Cast Shadow below Jawline -->
    <!-- Extends down from jawline at y: 195 to deep triangular point at (100, 220) -->
    <path id="neck-jaw-cast-shadow"
      d="M 81 195
         C 87 197 94 198 100 198
         C 106 198 113 197 119 195
         L 115 208
         L 100 221
         L 85 208
         Z"
      class="skin-shade" />

    <!-- Sternocleidomastoid Tendon Guides & Adam's Apple Shadow -->
    <path id="neck-adams-apple"
      d="M 98 222 L 100 225 L 102 222"
      class="feature-accent" stroke-width="1.0" />
    <path id="neck-scm-tendon-left"
      d="M 88 212 L 84 235"
      stroke="#E5B995" stroke-width="1.3" stroke-linecap="round" fill="none" opacity="0.65" />
    <path id="neck-scm-tendon-right"
      d="M 112 212 L 116 235"
      stroke="#E5B995" stroke-width="1.3" stroke-linecap="round" fill="none" opacity="0.65" />
  </g>

  <!-- ========================================================================= -->
  <!-- LAYER 2: EARS & HEAD SILHOUETTE                                           -->
  <!-- ========================================================================= -->
  <g id="part-director-head-base">
    <!-- Back-of-Head Hair Volume behind ears (anchors silhouette depth) -->
    <path id="hair-behind-ears-left"
      d="M 64 125 C 59 135 59 148 63 158 L 68 154 C 65 146 64 136 67 127 Z"
      fill="#151922" />
    <path id="hair-behind-ears-right"
      d="M 136 125 C 141 135 141 148 137 158 L 132 154 C 135 146 136 136 133 127 Z"
      fill="#151922" />

    <!-- Left Ear (Viewer's Left, y: 130 to 165, outer span x: 55 to 71) -->
    <g id="head-ear-left">
      <!-- Outer Ear Pinna -->
      <path id="ear-pinna-left"
        d="M 71 130
           C 57 131 53 138 53 148
           C 53 158 57 165 65 166
           C 69 166 71 164 72 161"
        class="skin-base" stroke="#DFA884" stroke-width="0.9" />
      <!-- Inner Cavity Cel-Shading -->
      <path id="ear-cavity-left"
        d="M 65 137
           C 59 140 58 147 60 154
           C 62 159 66 160 67 157
           C 65 152 64 147 68 143 Z"
        class="skin-shade" />
      <!-- Cartilage Contours (Concha and Antihelix) -->
      <path id="ear-concha-left"
        d="M 62 145 C 60 148 61 153 64 155"
        class="feature-accent" stroke-width="1.0" />
      <path id="ear-helix-left"
        d="M 67 134 C 59 135 57 142 57 148"
        class="feature-line" stroke-width="1.0" />
    </g>

    <!-- Right Ear (Viewer's Right, y: 130 to 165, outer span x: 129 to 145) -->
    <g id="head-ear-right">
      <!-- Outer Ear Pinna -->
      <path id="ear-pinna-right"
        d="M 129 130
           C 143 131 147 138 147 148
           C 147 158 143 165 135 166
           C 131 166 129 164 128 161"
        class="skin-base" stroke="#DFA884" stroke-width="0.9" />
      <!-- Inner Cavity Cel-Shading -->
      <path id="ear-cavity-right"
        d="M 135 137
           C 141 140 142 147 140 154
           C 138 159 134 160 133 157
           C 135 152 136 147 132 143 Z"
        class="skin-shade" />
      <!-- Cartilage Contours (Concha and Antihelix) -->
      <path id="ear-concha-right"
        d="M 138 145 C 140 148 139 153 136 155"
        class="feature-accent" stroke-width="1.0" />
      <path id="ear-helix-right"
        d="M 133 134 C 141 135 143 142 143 148"
        class="feature-line" stroke-width="1.0" />
    </g>

    <!-- Mature Rectangular-Oval Cranium & Jaw Contour -->
    <!-- MASCULINE SQUARE JAWLINE: Flat chin base exactly 34px wide (x: 83 to 117 at y: 195). NO TRIANGULAR CHIN! -->
    <path id="head-jaw-base"
      d="M 71 115
         C 70 94 77 70 100 68
         C 123 70 130 94 129 115
         C 131 132 132 148 131 162
         C 130 174 127 182 122 188
         C 119 192 117 195 117 195
         L 83 195
         C 83 195 81 192 78 188
         C 73 182 70 174 69 162
         C 68 148 69 132 71 115
         Z"
      class="skin-base" stroke="#DFA884" stroke-width="0.8" />

    <!-- Jaw Edge Shadow Planes (Defines Mature Masculine Structure) -->
    <path id="jaw-plane-shade-left"
      d="M 69 162
         C 70 174 73 182 78 188
         C 81 192 83 195 83 195
         L 86 195
         C 84 192 81 186 78 178
         C 75 168 75 158 76 150
         L 70 150
         C 69 154 69 158 69 162 Z"
      class="skin-shade" opacity="0.45" />
    <path id="jaw-plane-shade-right"
      d="M 131 162
         C 130 174 127 182 122 188
         C 119 192 117 195 117 195
         L 114 195
         C 116 192 119 186 122 178
         C 125 168 125 158 124 150
         L 130 150
         C 131 154 131 158 131 162 Z"
      class="skin-shade" opacity="0.45" />

    <!-- Subtle Flat Chin Base Indentation Accent -->
    <path id="chin-base-crease"
      d="M 94 191 Q 100 193 106 191"
      class="feature-line" stroke-width="1.0" />
  </g>

  <!-- ========================================================================= -->
  <!-- LAYER 3: FACIAL FEATURES (EYES, NOSE, MOUTH)                              -->
  <!-- ========================================================================= -->
  <g id="part-director-face-details">
    <!-- Forehead Maturity Lines (Distinguished Mentor Wisdom) -->
    <path id="forehead-wrinkle-upper"
      d="M 86 102 C 93 99 107 99 114 102"
      class="feature-line" stroke-width="1.1" />
    <path id="forehead-wrinkle-lower"
      d="M 84 111 C 93 108 107 108 116 111"
      class="feature-line" stroke-width="1.1" />
    <!-- Glabella Furrow Marks between Brows -->
    <line x1="97" y1="120" x2="97" y2="123" stroke="#DFA884" stroke-width="0.9" stroke-linecap="round" />
    <line x1="103" y1="120" x2="103" y2="123" stroke="#DFA884" stroke-width="0.9" stroke-linecap="round" />

    <!-- Masculine Dark Charcoal Eyebrows (#1E2430) -->
    <!-- Calm horizontal slant, tapering cleanly at the temples -->
    <path id="eyebrow-left"
      d="M 72 127
         C 77 122 85 121 96 124
         C 93 128 83 126 72 127 Z"
      class="hair-base" />
    <path id="eyebrow-right"
      d="M 104 124
         C 115 121 123 122 128 127
         C 117 126 107 128 104 124 Z"
      class="hair-base" />

    <!-- Soft Cheek Warmth (Natural healthy vitality) -->
    <ellipse cx="78" cy="155" rx="8" ry="4" class="skin-shade" opacity="0.32" />
    <ellipse cx="122" cy="155" rx="8" ry="4" class="skin-shade" opacity="0.32" />

    <!-- Narrow, Kind Smiling Asian Eyes with Double Eyelids & Crow's Feet -->
    <!-- LEFT EYE (Viewer's Left, cx ~ 84.5, cy ~ 142) -->
    <g id="eye-left-assembly">
      <!-- Sclera -->
      <path id="eye-sclera-left"
        d="M 75 142
           C 78 137 87 137 93 143
           C 89 146 79 146 75 142 Z"
        fill="#FFFFFF" />
      <!-- Iris: Deep Espresso Black #111827 -->
      <circle id="eye-iris-left" cx="84.5" cy="141.5" r="4.3" fill="#111827" />
      <!-- Specular Glint: Pure White #FFFFFF -->
      <circle id="eye-glint-left" cx="83.3" cy="140.0" r="1.3" fill="#FFFFFF" />
      <circle id="eye-glint-secondary-left" cx="86.0" cy="142.8" r="0.6" fill="#FFFFFF" opacity="0.6" />
      <!-- Double Eyelid Crease Line -->
      <path id="eye-double-lid-left"
        d="M 75 136 C 81 133 88 133 93 137"
        class="eye-crease" stroke-width="1.0" />
      <!-- Upper Smiling Lash Line -->
      <path id="eye-upper-lid-left"
        d="M 74 142 C 78 137 88 137 94 143"
        stroke="#1E2430" stroke-width="1.8" stroke-linecap="round" fill="none" />
      <!-- Lower Eyelid Line -->
      <path id="eye-lower-lid-left"
        d="M 76 144 C 81 146 87 146 92 144"
        class="eye-crease" stroke-width="0.9" />
      <!-- Aegyo-sal Smiling Contour -->
      <path id="eye-aegyo-sal-left"
        d="M 77 148 C 82 150 87 150 91 148"
        stroke="#E5B995" stroke-width="1.1" stroke-linecap="round" fill="none" />
      <!-- Crow's Feet Maturity Lines at Outer Temple Corner -->
      <path id="eye-crow-foot-upper-left"
        d="M 73 140 L 68 138"
        class="feature-accent" stroke-width="0.9" />
      <path id="eye-crow-foot-lower-left"
        d="M 73 143 L 67 144"
        class="feature-accent" stroke-width="0.9" />
    </g>

    <!-- RIGHT EYE (Viewer's Right, cx ~ 115.5, cy ~ 142) -->
    <g id="eye-right-assembly">
      <!-- Sclera -->
      <path id="eye-sclera-right"
        d="M 107 143
           C 113 137 122 137 125 142
           C 121 146 111 146 107 143 Z"
        fill="#FFFFFF" />
      <!-- Iris: Deep Espresso Black #111827 -->
      <circle id="eye-iris-right" cx="115.5" cy="141.5" r="4.3" fill="#111827" />
      <!-- Specular Glint: Pure White #FFFFFF -->
      <circle id="eye-glint-right" cx="114.3" cy="140.0" r="1.3" fill="#FFFFFF" />
      <circle id="eye-glint-secondary-right" cx="117.0" cy="142.8" r="0.6" fill="#FFFFFF" opacity="0.6" />
      <!-- Double Eyelid Crease Line -->
      <path id="eye-double-lid-right"
        d="M 107 137 C 112 133 119 133 125 136"
        class="eye-crease" stroke-width="1.0" />
      <!-- Upper Smiling Lash Line -->
      <path id="eye-upper-lid-right"
        d="M 106 143 C 112 137 122 137 126 142"
        stroke="#1E2430" stroke-width="1.8" stroke-linecap="round" fill="none" />
      <!-- Lower Eyelid Line -->
      <path id="eye-lower-lid-right"
        d="M 108 144 C 113 146 119 146 124 144"
        class="eye-crease" stroke-width="0.9" />
      <!-- Aegyo-sal Smiling Contour -->
      <path id="eye-aegyo-sal-right"
        d="M 109 148 C 113 150 118 150 123 148"
        stroke="#E5B995" stroke-width="1.1" stroke-linecap="round" fill="none" />
      <!-- Crow's Feet Maturity Lines at Outer Temple Corner -->
      <path id="eye-crow-foot-upper-right"
        d="M 127 140 L 132 138"
        class="feature-accent" stroke-width="0.9" />
      <path id="eye-crow-foot-lower-right"
        d="M 127 143 L 133 144"
        class="feature-accent" stroke-width="0.9" />
    </g>

    <!-- Clean Semi-Realistic Nose Structure with Flat Cel Shading -->
    <g id="head-nose-features">
      <!-- Straight Nose Bridge Shading Line -->
      <path id="nose-bridge-profile"
        d="M 99 135 L 98 156"
        class="feature-line" stroke-width="1.0" />
      <!-- Nose Tip Base Cast Shadow -->
      <path id="nose-tip-shadow-cel"
        d="M 96 160 Q 100 163 104 160 Q 100 164.5 96 160 Z"
        class="skin-shade" />
      <!-- Nose Tip Curve -->
      <path id="nose-tip-contour"
        d="M 96 160 Q 100 163 104 160"
        class="feature-accent" stroke-width="1.2" />
      <!-- Nostril Flare Wings -->
      <path id="nose-nostril-left"
        d="M 93 159 Q 95 160 97 160"
        class="feature-accent" stroke-width="1.0" />
      <path id="nose-nostril-right"
        d="M 103 160 Q 105 160 107 159"
        class="feature-accent" stroke-width="1.0" />
    </g>

    <!-- Nasolabial Laugh Folds (Warm Mentorship Expression) -->
    <path id="nasolabial-fold-left"
      d="M 86 163 C 83 171 82 178 85 184"
      class="feature-line" stroke-width="1.1" />
    <path id="nasolabial-fold-right"
      d="M 114 163 C 117 171 118 178 115 184"
      class="feature-line" stroke-width="1.1" />

    <!-- Kind, Proud, Reassuring Closed Smiling Mouth (#C28472) -->
    <g id="head-mouth-features">
      <!-- Philtrum -->
      <path id="mouth-philtrum"
        d="M 99 167 L 98.5 172 M 101 167 L 101.5 172"
        class="feature-line" stroke-width="0.8" />
      <!-- Main Curved Smile Line -->
      <path id="mouth-smile-lip-line"
        d="M 88 178
           C 93 180 107 180 112 178"
        class="mouth-line" stroke-width="1.8" />
      <!-- Upward Tucked Smile Corners -->
      <path id="mouth-corner-crease-left"
        d="M 87.5 177.5 Q 88.5 178 89.5 178.5"
        stroke="#B57463" stroke-width="1.2" stroke-linecap="round" fill="none" />
      <path id="mouth-corner-crease-right"
        d="M 112.5 177.5 Q 111.5 178 110.5 178.5"
        stroke="#B57463" stroke-width="1.2" stroke-linecap="round" fill="none" />
      <!-- Lower Lip Shadow -->
      <path id="mouth-lower-lip-crease"
        d="M 94 183 Q 100 185 106 183"
        class="feature-line" stroke-width="1.2" />
    </g>
  </g>

  <!-- ========================================================================= -->
  <!-- LAYER 4: GLASSES                                                          -->
  <!-- ========================================================================= -->
  <g id="part-director-glasses">
    <!-- Thin Titanium Silver Center Bridge over Nose (y: 142) -->
    <line id="glasses-bridge-wire"
      x1="97" y1="142" x2="103" y2="142"
      class="glasses-line" />

    <!-- Thin Temples Extending Horizontally back to Ears at y: 142 -->
    <line id="glasses-temple-wire-left"
      x1="71" y1="142" x2="56" y2="142"
      class="glasses-line" />
    <line id="glasses-temple-wire-right"
      x1="129" y1="142" x2="144" y2="142"
      class="glasses-line" />

    <!-- Modern Rectangular Wire Frames (#94A3B8, stroke-width: 1.4) -->
    <rect id="glasses-rim-left"
      x="71" y="131" width="26" height="22" rx="4"
      class="glasses-line" />
    <rect id="glasses-rim-right"
      x="103" y="131" width="26" height="22" rx="4"
      class="glasses-line" />

    <!-- Nose Pad Hinge Arms -->
    <path id="glasses-pad-hinge-left"
      d="M 97 143 Q 95 145 96 148"
      stroke="#94A3B8" stroke-width="1.0" fill="none" />
    <path id="glasses-pad-hinge-right"
      d="M 103 143 Q 105 145 104 148"
      stroke="#94A3B8" stroke-width="1.0" fill="none" />

    <!-- Subtle Optical Lens Tinting -->
    <rect id="lens-optical-tint-left"
      x="71.7" y="131.7" width="24.6" height="20.6" rx="3.3"
      fill="#E2E8F0" opacity="0.10" />
    <rect id="lens-optical-tint-right"
      x="103.7" y="131.7" width="24.6" height="20.6" rx="3.3"
      fill="#E2E8F0" opacity="0.10" />

    <!-- Crisp Diagonal White Glare Reflection Bars across Lenses (opacity: 0.35) -->
    <polygon id="lens-specular-glare-left"
      points="77,132 84,132 73,151 72,147"
      fill="#FFFFFF" opacity="0.35" />
    <polygon id="lens-specular-glare-right"
      points="109,132 116,132 105,151 104,147"
      fill="#FFFFFF" opacity="0.35" />
  </g>

  <!-- ========================================================================= -->
  <!-- LAYER 5: 7/3 PARTED HAIR                                                  -->
  <!-- ========================================================================= -->
  <g id="part-director-hair">
    <!-- Base Hair Volume in Obsidian Charcoal (#1E2430) -->
    <!-- Classic professional 7/3 Korean side-part framing the distinguished brow cleanly -->
    <path id="hair-main-mass"
      d="M 71 126
         L 67 114
         C 63 102 62 88 64 76
         C 66 60 72 48 78 39
         C 80 37 81 36 82 43
         C 83 48 85 52 86 48
         C 90 38 98 34 110 33
         C 122 34 131 40 136 50
         C 139 58 138 72 137 86
         C 136 98 137 114 133 126
         L 129 126
         C 129 110 128 98 123 88
         C 117 76 108 72 98 68
         C 88 65 83 58 82 50
         C 81 58 77 66 73 78
         C 70 88 69 104 70 126
         Z"
      class="hair-base" />

    <!-- 7/3 Part Seam Definition & Bang Flow Strands -->
    <path id="hair-part-accent"
      d="M 82 43 C 83 52 83 58 83 62"
      stroke="#151922" stroke-width="1.4" stroke-linecap="round" fill="none" />
    <path id="hair-bang-flow-primary"
      d="M 85 52 C 90 62 98 66 108 70"
      stroke="#2C3647" stroke-width="1.2" stroke-linecap="round" fill="none" />
    <path id="hair-bang-flow-secondary"
      d="M 100 68 C 110 72 118 78 124 88"
      stroke="#2C3647" stroke-width="1.2" stroke-linecap="round" fill="none" />

    <!-- Crown Cel-Shading Specular Sheen (#3A4559) -->
    <path id="hair-crown-sheen"
      d="M 90 40
         C 98 37 108 37 116 38
         C 123 39 128 44 130 48
         C 126 43 120 40 114 39
         C 106 39 98 40 90 44 Z"
      fill="#3A4559" opacity="0.75" />

    <!-- Distinguished Temple Silver Strands (#64748B & #94A3B8) -->
    <!-- Matches exact 1:1 reference styling from "thầy giáo 1.jpg" -->
    <!-- Left Temple Silver Wedges (Viewer's Left) -->
    <g id="hair-silver-left">
      <path id="silver-left-tier1"
        d="M 65 88 C 67 93 69 98 71 102 L 70 103 C 67 98 65 92 63 87 Z"
        class="hair-highlight" />
      <path id="silver-left-tier2"
        d="M 64 96 C 66 101 68 107 70 111 L 69 112 C 66 106 64 100 62 95 Z"
        class="hair-highlight-light" />
      <path id="silver-left-tier3"
        d="M 65 106 C 67 110 68 115 70 119 L 69 120 C 67 115 65 110 63 105 Z"
        class="hair-highlight" />
    </g>

    <!-- Right Temple Silver Wedges (Viewer's Right) -->
    <g id="hair-silver-right">
      <path id="silver-right-tier1"
        d="M 135 88 C 133 93 131 98 129 102 L 130 103 C 133 98 135 92 137 87 Z"
        class="hair-highlight" />
      <path id="silver-right-tier2"
        d="M 136 96 C 134 101 132 107 130 111 L 131 112 C 134 106 136 100 138 95 Z"
        class="hair-highlight-light" />
      <path id="silver-right-tier3"
        d="M 135 106 C 133 110 132 115 130 119 L 131 120 C 133 115 135 110 137 105 Z"
        class="hair-highlight" />
    </g>
  </g>
</svg>"""

target_path = "/Users/macbookpro/.gemini/antigravity/scratch/auto-video-engine/site-configs/crabit-korea/assets/master/rig/char_director_head.svg"
os.makedirs(os.path.dirname(target_path), exist_ok=True)
with open(target_path, "w") as f:
    f.write(svg_content.strip() + "\n")

# Validate XML structure
tree = ET.fromstring(svg_content)
print("Successfully validated XML root:", tree.tag)
print("Saved cleanly to:", target_path)
