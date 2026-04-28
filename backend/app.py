from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import subprocess
import uuid
import os

app = FastAPI()

@app.get("/")
def home():
    return {"status": "running"}

@app.post("/remove-bg")
async def remove_bg(file: UploadFile = File(...)):
    input_path = f"input_{uuid.uuid4()}.png"
    output_path = f"output_{uuid.uuid4()}.png"

    try:
        # Save file
        with open(input_path, "wb") as f:
            f.write(await file.read())

        # Run rembg
        result = subprocess.run(
            ["rembg", "i", input_path, output_path],
            capture_output=True,
            text=True
        )

        # Check if failed
        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=result.stderr)

        # Check output exists
        if not os.path.exists(output_path):
            raise HTTPException(status_code=500, detail="Output not generated")

        return FileResponse(output_path, media_type="image/png")

    finally:
        # Cleanup (important)
        if os.path.exists(input_path):
            os.remove(input_path)