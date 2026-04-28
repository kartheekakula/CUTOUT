from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import requests
import io

app = FastAPI()

# ✅ CORS FIX (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = "hhuz9aTEMZbrEbBQvC3BFRdK"

# ✅ Optional root check
@app.get("/")
def home():
    return {"status": "CUTOUT API running"}

@app.post("/remove-bg")
async def remove_bg(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()

        response = requests.post(
            "https://api.remove.bg/v1.0/removebg",
            files={"image_file": image_bytes},
            data={"size": "auto"},
            headers={"X-Api-Key": API_KEY},
        )

        # 🔥 HANDLE ERROR PROPERLY
        if response.status_code != 200:
            print("REMOVE.BG ERROR:", response.text)
            return JSONResponse(
                content={"error": response.text},
                status_code=400
            )

        return StreamingResponse(
            io.BytesIO(response.content),
            media_type="image/png"
        )

    except Exception as e:
        print("SERVER ERROR:", str(e))
        return JSONResponse(
            content={"error": "Internal server error"},
            status_code=500
        )