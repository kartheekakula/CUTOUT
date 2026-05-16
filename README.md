# 🎥 AI Background Removal System

An AI-powered **Background Removal System** for both **images and videos** using **FastAPI, OpenCV, Rembg, and Remove.bg API**.

This project allows users to:

- Remove image backgrounds using **Remove.bg API**
- Remove video backgrounds frame-by-frame using **AI segmentation**
- Improve video quality using **temporal smoothing** and **edge stabilization**

---

# 🚀 What This Project Does

This project provides a complete solution for **background removal** in images and videos.

### 🖼️ Image Background Removal
Users can upload an image, and the system removes the background using the **Remove.bg API**, returning a transparent PNG image.

### 🎬 Video Background Removal
The system processes videos frame-by-frame using **Rembg AI segmentation**, removes the background, smooths edges, reduces flickering, and generates a processed output video.

---

# ✨ Features

✅ Image background removal using Remove.bg API  
✅ Video background removal using Rembg AI  
✅ Motion-aware temporal smoothing for stable video output  
✅ Edge stabilization using Gaussian Blur  
✅ FastAPI backend support  
✅ CORS enabled for frontend integration  
✅ Transparent PNG output for images  
✅ Processed video output generation

---

# 🛠️ Technologies Used

- Python
- FastAPI
- OpenCV
- NumPy
- Pillow (PIL)
- Rembg
- ONNX Runtime
- Remove.bg API

---

# 📂 Project Structure

```bash
project-folder/
│── backend/
│   │── main.py                 # FastAPI API for image background removal
│   │── video_bg_remove.py      # Video background removal script
│
│── frontend/                   # Frontend files (if added)
│
│── requirements.txt            # Required dependencies
│── README.md                   # Project documentation
│── input.mp4                   # Sample input video
│── output.avi                  # Generated output video
```

### Folder Explanation

### `backend/`
Contains the backend logic:

- **main.py** → Handles image background removal API using FastAPI.
- **video_bg_remove.py** → Processes videos and removes backgrounds.

### `frontend/`
Contains frontend files (React/HTML/CSS/JS) to interact with backend APIs.

### `requirements.txt`
Contains all required Python dependencies.

---

# ⚙️ Installation Steps

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

---

## 2. Create Virtual Environment (Recommended)

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 📦 Dependencies

Install the following packages:

```txt
fastapi
uvicorn[standard]
rembg
onnxruntime
pillow
python-multipart
opencv-python
numpy
requests
```

---

# ▶️ How to Run Backend

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Server runs at:

```txt
http://127.0.0.1:8000
```

### Test API

Open:

```txt
http://127.0.0.1:8000/docs
```

to access FastAPI Swagger UI.

---

# 🌐 How to Run Frontend

If frontend exists:

1. Navigate to frontend folder

```bash
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Run frontend

```bash
npm start
```

Frontend will run on:

```txt
http://localhost:3000
```

---

# 📸 Example Usage

### Image Background Removal API

Send an image file to:

```txt
POST /remove-bg
```

The API returns a **background removed PNG image**.

### Video Background Removal

Run:

```python
remove_video_background("input.mp4", "output.avi")
```

Output video will be saved as:

```txt
output.avi
```

---

# 🚀 Future Improvements

- Green screen background support
- Custom background replacement
- Real-time webcam background removal
- GPU acceleration support
- MP4 output support
- Better frontend UI

---

# 👨‍💻 Author

**Anudeep Gaddam**

If you found this project useful, consider giving it a ⭐ on GitHub.
