"""Apply the site's shared photo grade to the given files, keeping the untouched originals.
Grade: saturation x0.80, contrast x0.96, a 4.5% Articella Blue tint, brightness x1.03.
Usage: python scripts/grade_photos.py [--duotone name] [--cool] names...   (names without .jpg, in public/img/photos)
--duotone name : map that photo to a brand-blue duotone (deep blue to pale tint), for washed-out photos
--cool         : extra cooler, less orange grade (saturation x0.72, 8% brand-blue tint)"""
import os, shutil, sys
from PIL import Image, ImageEnhance, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(HERE, "../public/img/photos")
os.makedirs(os.path.join(D, "originals"), exist_ok=True)
args = sys.argv[1:]
duo = set()
cool = "--cool" in args
while "--duotone" in args:
    i = args.index("--duotone"); duo.add(args[i + 1]); del args[i:i + 2]
args = [a for a in args if not a.startswith("--")]
for name in args:
    f = os.path.join(D, name + ".jpg")
    orig = os.path.join(D, "originals", name + ".jpg")
    if not os.path.exists(orig):
        shutil.copy2(f, orig)
    im = Image.open(orig).convert("RGB")
    if name in duo:
        g = ImageOps.autocontrast(ImageOps.grayscale(im), cutoff=2)
        im = ImageOps.colorize(g, black=(0, 0, 105), white=(236, 239, 255))
    else:
        im = ImageEnhance.Color(im).enhance(0.72 if cool else 0.80)
        im = ImageEnhance.Contrast(im).enhance(1.06 if cool else 0.96)
        im = Image.blend(im, Image.new("RGB", im.size, (0, 0, 139)), 0.08 if cool else 0.045)
    im = ImageEnhance.Brightness(im).enhance(1.03)
    im.save(f, "JPEG", quality=86)
    print("graded", name, im.size)
