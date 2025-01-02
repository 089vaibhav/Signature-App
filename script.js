const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("successButton");
const fontPicker = document.getElementById("fontSize");
const retrieveButton = document.getElementById("retriveButton");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Initialize canvas with a default background color
ctx.fillStyle = "#ffffff"; // Default background color (white)
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Change stroke and fill color
colorPicker.addEventListener("change", (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

// Start drawing
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

// Draw on canvas
canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

// Stop drawing
canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

canvas.addEventListener("mouseout", () => {
    isDrawing = false;
});

// Change canvas background color
canvasColor.addEventListener("change", (e) => {
    const currentData = canvas.toDataURL(); // Save current drawing
    const img = new Image();
    img.src = currentData;

    img.onload = () => {
        ctx.fillStyle = e.target.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Set new background color
        ctx.drawImage(img, 0, 0); // Restore previous drawing
    };
});

// Adjust line width (font size)
fontPicker.addEventListener("change", (e) => {
    ctx.lineWidth = e.target.value;
});

// Clear the canvas
clearButton.addEventListener("click", () => {
    ctx.fillStyle = "#ffffff"; // Reset to white background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Save the canvas image by downloading
saveButton.addEventListener("click", () => {
    const canvasData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = canvasData;
    link.download = "my-canvas.png"; // Default file name
    link.click(); // Triggers the download
});

// Retrieve and display the saved canvas data from local storage
retrieveButton.addEventListener("click", () => {
    const savedCanvasData = localStorage.getItem("myCanvas");
    if (savedCanvasData) {
        const img = new Image();
        img.src = savedCanvasData;

        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    } else {
        console.log("No saved canvas found in local storage!");
    }
});
