fileInput.addEventListener("change", async function () {
    const file = fileInput.files[0];
    if (!file) return;

    // show original
    const reader = new FileReader();
    reader.onload = () => {
        originalCard.innerHTML = `<img src="${reader.result}">`;
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
        resultCard.classList.add("loading");

        const response = await fetch("https://cutout.onrender.com/remove-bg", {
            method: "POST",
            body: formData
        });

        // 🔥 HANDLE NON-200
        if (!response.ok) {
            const text = await response.text();

            console.error("Server error:", text);

            resultCard.classList.remove("loading");
            resultCard.innerHTML = `
                <div style="text-align:center;">
                    <p style="color:#ff6b6b;">Server error</p>
                    <small style="opacity:0.6;">
                        ${text.slice(0, 120)}
                    </small>
                </div>
            `;
            return;
        }

        // 🔥 CHECK IF RESPONSE IS IMAGE
        const contentType = response.headers.get("content-type");

        if (!contentType || !contentType.includes("image")) {
            const text = await response.text();

            console.error("Invalid response:", text);

            resultCard.classList.remove("loading");
            resultCard.innerHTML = `
                <div style="text-align:center;">
                    <p style="color:#ff6b6b;">API failed</p>
                    <small style="opacity:0.6;">
                        Not an image response
                    </small>
                </div>
            `;
            return;
        }

        // ✅ SUCCESS
        const blob = await response.blob();

        if (!blob || blob.size === 0) {
            throw new Error("Empty image received");
        }

        resultImageURL = URL.createObjectURL(blob);

        resultCard.innerHTML = `<img src="${resultImageURL}">`;
        resultCard.classList.remove("loading");

    } catch (error) {
        console.error("Fetch failed:", error);

        resultCard.classList.remove("loading");

        resultCard.innerHTML = `
            <div style="text-align:center;">
                <p style="color:#ff6b6b;">Server not responding</p>
                <small style="opacity:0.6;">
                    Render may be waking up (30s delay)
                </small>
            </div>
        `;
    }
});