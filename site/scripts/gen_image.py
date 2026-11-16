"""Generate one image with the Gemini REST API (key via x-goog-api-key header).
Usage: python gen_image.py <model> <aspect> <out.jpg> <prompt-file>
Reads the key from env GEMINI_API_KEY. Prints a one-line result, never the key."""
import base64, io, json, os, sys, urllib.request, urllib.error
from PIL import Image

model, aspect, out, pfile = sys.argv[1:5]
key = os.environ["GEMINI_API_KEY"]
prompt = open(pfile, encoding="utf8").read().strip()
body = {
    "contents": [{"parts": [{"text": prompt}]}],
    "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": aspect}},
}
req = urllib.request.Request(
    f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
    json.dumps(body).encode(),
    {"Content-Type": "application/json", "x-goog-api-key": key},
)
try:
    d = json.load(urllib.request.urlopen(req, timeout=180))
except urllib.error.HTTPError as e:
    msg = e.read().decode("utf8", "ignore")
    try:
        j = json.loads(msg)["error"]
        print("FAIL", e.code, j.get("status"), j.get("message", "")[:200])
    except Exception:
        print("FAIL", e.code, msg[:200])
    sys.exit(1)
for c in d.get("candidates", []):
    for p in c.get("content", {}).get("parts", []):
        inline = p.get("inlineData") or p.get("inline_data")
        if inline:
            im = Image.open(io.BytesIO(base64.b64decode(inline["data"]))).convert("RGB")
            im.thumbnail((1600, 1600))
            os.makedirs(os.path.dirname(out), exist_ok=True)
            im.save(out, "JPEG", quality=86)
            print("OK", out, im.size)
            sys.exit(0)
print("FAIL no image in response", json.dumps(d)[:300])
sys.exit(1)
