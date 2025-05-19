const btn = document.getElementById("celebrateBtn");
const modal = document.getElementById("modal");
const main = document.querySelector(".main");
const music = document.getElementById("music");
const cake = document.getElementById("cake");

window.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const modal = document.getElementById("modal");
  const main = document.querySelector(".main");
  const nameInput = document.getElementById("nameInput");
  const startBtn = document.getElementById("startBtn");
  const errorMsg = document.getElementById("errorMsg");

  // Pastikan tidak ada yang terlihat selain intro saat awal
  intro.style.display = "flex";
  modal.style.display = "none";
  main.classList.add("hidden");

startBtn.addEventListener("click", () => {
  const inputName = nameInput.value.trim().toUpperCase();

  if (inputName === "ENGGAR") {
    // Nama cocok, lanjut ke modal
    intro.style.display = "none";
    modal.style.display = "flex";
    errorMsg.textContent = "";
    errorMsg.style.visibility = "hidden";

    // Isi nama di halaman utama
    document.querySelector(".glow").textContent = `Happy Birthday ${inputName} 🥳`;
    document.querySelector(".modal-content h2").textContent = `🎉 ${inputName}, HALLOOO?🎉`;
  } else {
    // Nama salah, tampilkan error
    errorMsg.textContent = "🚫 Nononono, Selain Enggar Nonono. Gak boleh masuk!";
    errorMsg.style.visibility = "visible";
    errorMsg.style.opacity = "1";
    modal.style.display = "none";
    main.classList.add("hidden");
  }
});

});

// Confetti setup
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettis = [];

for (let i = 0; i < 150; i++) {
  confettis.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 100,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.random() * 10 - 5,
    tiltAngle: 0,
    tiltAngleIncrement: Math.random() * 0.07 + 0.05
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettis.forEach(p => {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt, p.y);
    ctx.lineTo(p.x + p.tilt + p.r, p.y + p.tilt + p.r);
    ctx.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  confettis.forEach(p => {
    p.y += 2;
    p.tiltAngle += p.tiltAngleIncrement;
    p.tilt = Math.sin(p.tiltAngle) * 10;
    if (p.y > confettiCanvas.height) {
      p.y = -10;
      p.x = Math.random() * confettiCanvas.width;
    }
  });
}

function launchConfetti() {
  setInterval(drawConfetti, 30);
}

// Kue jatuh ala Python
function dropCakePythonic() {
  let y = -100;

  function animate() {
    y += 5; // mirip per frame di Python
    cake.style.top = y + "px";

    if (y < window.innerHeight / 2) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

// Mulai perayaan
btn.addEventListener("click", () => {
  modal.style.display = "none";
  main.classList.remove("hidden");
  music.play();
  launchConfetti();
  dropCakePythonic();
});

