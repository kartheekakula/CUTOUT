try {
    const response = await fetch("https://cutout.onrender.com/remove-bg", {
        method: "POST",
        body: formData
    });

    // 🔥 SAFER ERROR HANDLING
    if (!response.ok) {
        const text = await response.text(); // don't assume JSON
        resultCard.classList.remove("loading");
        resultCard.innerHTML = `
            <div style="text-align:center;">
                <p style="color:#ff6b6b;">Error from server</p>
                <small style="opacity:0.6;">${text}</small>
            </div>
        `;
        return;
    }

    // 🔥 CHECK RESPONSE TYPE
    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("image")) {
        const text = await response.text();
        resultCard.classList.remove("loading");
        resultCard.innerHTML = `
            <div style="text-align:center;">
                <p style="color:#ff6b6b;">Invalid response</p>
                <small style="opacity:0.6;">${text}</small>
            </div>
        `;
        return;
    }

    // ✅ SUCCESS
    const blob = await response.blob();

    if (blob.size === 0) {
        throw new Error("Empty response");
    }

    resultImageURL = URL.createObjectURL(blob);

    resultCard.innerHTML = `<img src="${resultImageURL}">`;
    resultCard.classList.remove("loading");

} catch (error) {
    console.error(error);

    resultCard.classList.remove("loading");

    resultCard.innerHTML = `
        <div style="text-align:center;">
            <p style="color:#ff6b6b;">Server not responding</p>
            <small style="opacity:0.6;">
                Render might be sleeping 😴 or API failed
            </small>
        </div>
    `;
}