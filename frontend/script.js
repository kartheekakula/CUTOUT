const fileInput = document.getElementById("fileInput");
const originalCard = document.getElementById("original");
const resultCard = document.getElementById("result");
const downloadBtn = document.getElementById("downloadBtn");

let resultImageURL = "";

// HANDLE FILE UPLOAD
fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;

    // SHOW ORIGINAL IMAGE
    const reader = new FileReader();
    reader.onload = () => {
        originalCard.innerHTML = `<img src="${reader.result}">`;
    };
    reader.readAsDataURL(file);

    // LOADING STATE (better UI)
    resultCard.innerHTML = `
        <div style="text-align:center;">
            <p style="opacity:0.7;">Processing...</p>
        </div>
    `;

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://127.0.0.1:8000/remove-bg", {
            method: "POST",
            body: formData
        });

        const blob = await response.blob();
        resultImageURL = URL.createObjectURL(blob);

        // SHOW RESULT
        resultCard.innerHTML = `<img src="${resultImageURL}">`;

    } catch (error) {
        console.error(error);
        resultCard.innerHTML = "Something went wrong";
    }
});


// DOWNLOAD BUTTON
downloadBtn.addEventListener("click", () => {
    if (!resultImageURL) {
        alert("Upload an image first");
        return;
    }

    const a = document.createElement("a");
    a.href = resultImageURL;
    a.download = "cutout.png";
    a.click();
});


// DRAG & DROP SUPPORT 🔥
const uploadBox = document.querySelector(".upload-box");

uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = "#b6ff3c";
});

uploadBox.addEventListener("dragleave", () => {
    uploadBox.style.borderColor = "#444";
});

uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (!file) return;

    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event("change"));
});