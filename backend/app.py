from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from rembg import remove
from PIL import Image
import io

app = FastAPI()

@app.get("/")
def home():
    return {"status": "running"}

@app.post("/remove-bg")
async def remove_bg(file: UploadFile = File(...)):
    input_bytes = await file.read()

    input_image = Image.open(io.BytesIO(input_bytes)).convert("RGBA")
    output_image = remove(input_image, model_name="u2netp")

    buf = io.BytesIO()
    output_image.save(buf, format="PNG")
    buf.seek(0)

    return StreamingResponse(buf, media_type="image/png")