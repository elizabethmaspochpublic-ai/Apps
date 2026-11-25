"""Builds index.html from src/app.html by embedding the label reader (tesseract.js) as base64.
Run: python3 build.py   (needs the files in vendor/tesseract)"""
import base64, pathlib
here = pathlib.Path(__file__).parent; root = here.parent; v = here / "vendor" / "tesseract"
parts = {"ocr-main": "tesseract.min.js", "ocr-worker": "worker.min.js",
         "ocr-core": "tesseract-core-simd-lstm.wasm.js", "ocr-eng": "eng.traineddata.gz",
         "bc-main": "../zxing/zxing-reader.js", "bc-wasm": "../zxing/zxing_reader.wasm"}
blocks = "\n".join(f'<script type="application/octet-stream" id="{k}">{base64.b64encode((v/f).read_bytes()).decode()}</script>' for k, f in parts.items())
src = (here / "src" / "app.html").read_text()
(root / "index.html").write_text(src.replace("<!--OCR_PAYLOAD-->", blocks))
print("index.html", round((root / "index.html").stat().st_size / 1e6, 1), "MB")
