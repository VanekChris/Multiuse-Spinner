const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

// Student Numbers. change length depending on class size
// comment out topics depending on desired usage.
const topics = Array.from({ length: 40 }, (_, i) => (i + 1).toString());

// Full List
// const topics = ["Memories", "My Hero", "Holidays", "Famous People", "Family", "Jobs", "Enjoy", "Rules", "World Heritage Sites", "Food", "Places", "Weekends", "Subjects", "Animals", "Events", "Sports"];
// Shorter List
//const topics = ["Trips", "My Hero", "Family", "Jobs", "Colors", "Food", "Weekends", "Subjects", "Animals", "Sports"];

const totalSlices = topics.length;
const anglePerSlice = 2 * Math.PI / totalSlices;

let rotation = 0;
let spinning = false;
let spinVelocity = 0;

// draws the image of the wheel on the screen.
function drawWheel() {
    const radius = canvas.width / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(rotation);

    // draws each slice
    for (let i = 0; i < totalSlices; i++) {
        ctx.beginPath();
        // alternates the slice colors
        ctx.fillStyle = i % 2 === 0 ? "#FFD700" : "#FF6347";

        // draws the slices
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, i * anglePerSlice, (i + 1) * anglePerSlice);
        ctx.lineTo(0, 0);
        ctx.fill();
        
        // draw the label in the middle of a slice
        ctx.save();
        ctx.rotate(i * anglePerSlice + anglePerSlice / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "black";
        ctx.font = "16px sans-serif";
        ctx.fillText(topics[i], radius - 10, 0);
        ctx.restore();
    }

    ctx.restore();

    // draws the pointer triangle
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 20);
    ctx.lineTo(canvas.width / 2 - 15, 50);
    ctx.lineTo(canvas.width / 2 + 15, 50);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
}

// spins the wheel
function spinWheel() {
    if (spinning) return;
    spinVelocity = Math.random() * 0.3 + 0.5;
    spinning = true;
    requestAnimationFrame(updateSpin);
}

// changes the speed of the spinning wheel.
function updateSpin() {
    if (!spinning) return;
    rotation += spinVelocity;
    spinVelocity *= 0.99;

    if (spinVelocity < 0.002) {
        spinning = false;
        spinVelocity = 0;
    }

    drawWheel();
    requestAnimationFrame(updateSpin);
}

drawWheel();
