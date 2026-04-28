from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
import requests
import io

app = FastAPI()

API_KEY = "hhuz9aTEMZbrEbBQvC3BFRdK"

@app.get("/")
def home():
    return {"status": "CUTOUT API running"}

@app.post("/remove-bg")
async def remove_bg(file: UploadFile = File(...)):
    image_bytes = await file.read()

    response = requests.post(
        "https://api.remove.bg/v1.0/removebg",
        files={"image_file": image_bytes},
        data={"size": "auto"},
        headers={"X-Api-Key": API_KEY},
    )

    return StreamingResponse(
        io.BytesIO(response.content),
        media_type="image/png"
    )