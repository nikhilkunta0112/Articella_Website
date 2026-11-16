"""Grade the hero photo (cook/refs/R14.png) to the Articella palette.
The supplied photo has an indigo-to-violet studio background. The Brand Book allows only royal blue
(#00008B), white and black, so the violet is pulled to blue. Only the background is touched
(saturated, blue-ish, not too bright); skin, hair, the white coat and the sweater are left alone.
Usage: python scripts/grade_hero.py   (writes public/img/photos/heroDoctor.jpg, keeps the original)"""
import colorsys
import os
import sys

import numpy as np
from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "../../cook/refs/R14.png")
OUT = os.path.join(HERE, "../public/img/photos/heroDoctor.jpg")
ORIG = os.path.join(HERE, "../public/img/photos/originals/heroDoctor-original.jpg")

im = Image.open(SRC).convert("RGB")
im.thumbnail((2400, 2400), Image.LANCZOS)
os.makedirs(os.path.dirname(ORIG), exist_ok=True)
im.save(ORIG, "JPEG", quality=90)

a = np.asarray(im).astype(np.float32) / 255.0
r, g, b = a[..., 0], a[..., 1], a[..., 2]
mx = a.max(-1)
mn = a.min(-1)
v = mx
s = np.where(mx > 1e-5, (mx - mn) / np.maximum(mx, 1e-5), 0)
# hue in degrees
d = np.maximum(mx - mn, 1e-5)
h = np.zeros_like(v)
mr, mg, mb = (mx == r), (mx == g) & (mx != r), (mx == b) & (mx != r) & (mx != g)
h = np.where(mr, ((g - b) / d) % 6, h)
h = np.where(mg, (b - r) / d + 2, h)
h = np.where(mb, (r - g) / d + 4, h)
h = h * 60.0

# Background mask by HUE. Measured on this photo: the studio backdrop and its violet glow are hue 242 to 258
# and strongly saturated; the sweater and scrubs are hue 221 to 225; skin, coat and hair are neutral or
# orange. So hue 236 to 290 plus saturation separates the backdrop cleanly, with no brightness ceiling
# (the glow is brighter than the backdrop). Near-black shadows are left alone.
hue_ok = np.clip((h - 232) / 6, 0, 1) * np.clip((300 - h) / 10, 0, 1)
sat_ok = np.clip((s - 0.28) / 0.2, 0, 1)
val_ok = np.clip((v - 0.10) / 0.06, 0, 1)
mask = hue_ok * sat_ok * val_ok
mask = np.asarray(Image.fromarray((mask * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32) / 255.0

# Target for background pixels: pure Articella Blue hue, value remapped so the dark left reads as a deep
# royal blue (about #00008B at mid-left) and the former violet glow becomes a brighter blue.
v2 = np.clip(0.25 + 0.80 * v, 0, 1)
tr = np.zeros_like(v)
tg = np.zeros_like(v)
tb = v2
# keep a little of the original luminance variation so the grain and soft vignette survive
tgt = np.stack([tr + 0.03 * v, tg + 0.03 * v, tb], -1)
out = a * (1 - mask[..., None]) + tgt * mask[..., None]
out = np.clip(out, 0, 1)
Image.fromarray((out * 255).astype(np.uint8)).save(OUT, "JPEG", quality=88)
print("graded", OUT, Image.open(OUT).size)
for (x, y) in [(0.03, 0.05), (0.2, 0.3), (0.35, 0.5), (0.2, 0.9), (0.9, 0.05), (0.75, 0.2), (0.5, 0.1)]:
    W, H = Image.open(OUT).size
    print((x, y), "#%02x%02x%02x" % Image.open(OUT).getpixel((int(W * x), int(H * y))))
