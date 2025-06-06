const btn = document.getElementById("celebrateBtn");
const modal = document.getElementById("modal");
const main = document.querySelector(".main");
const music = document.getElementById("music");
const cake = document.getElementById("cake");

const openLetterButton = document.getElementById('openLetter');
const letterModal = document.getElementById('letterModal');
const closeLetterButton = document.getElementById('closeLetter');

openLetterButton.addEventListener('click', () => {
  letterModal.classList.add('show');  // Menampilkan surat
});

closeLetterButton.addEventListener('click', () => {
  letterModal.classList.remove('show');  // Menyembunyikan surat
});

window.addEventListener('click', (event) => {
  if (event.target === letterModal) {
    letterModal.classList.remove('show');  // Menyembunyikan surat jika klik di luar surat
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const music = document.getElementById("music");
  const modal = document.getElementById("modal");
  const main = document.querySelector(".main");
  const nameInput = document.getElementById("nameInput");
  const startBtn = document.getElementById("startBtn");
  const errorMsg = document.getElementById("errorMsg");

  // Tampilkan hanya intro di awal
  intro.style.display = "flex";
  modal.style.display = "none";
  main.classList.add("hidden");

  startBtn.addEventListener("click", () => {
    // Ambil posisi tombol untuk efek ledakan
    const rect = startBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    createExplosion(centerX, centerY);

    const inputName = nameInput.value.trim().toUpperCase();

    if (inputName === "ENGGAR") {
      music.play()
      intro.style.display = "none";
      modal.style.display = "flex";
      errorMsg.textContent = "";
      errorMsg.style.visibility = "hidden";

      // Update nama di tampilan
      document.querySelector(".glow").textContent = `Happy Birthday ${inputName} 🥳`;
      document.querySelector(".modal-content h2").textContent = `🎉 ${inputName}, HALLOOO?🎉`;
    } else {
      errorMsg.textContent = "🚫 Nononono, Gak boleh masuk!";
      errorMsg.style.visibility = "visible";
      errorMsg.style.opacity = "1";
      modal.style.display = "none";
      main.classList.add("hidden");
    }
  });
});

// Confetti
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

// Animasi kue jatuh
function dropCakePythonic() {
  let y = -200;

  function animate() {
    y += 5;
    cake.style.top = y + "px";

    if (y < window.innerHeight / 2) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

// Mulai pesta
btn.addEventListener("click", () => {
  modal.style.display = "none";
  main.classList.remove("hidden");
  launchConfetti();
  dropCakePythonic();
});

// ==== LEDAKAN EFEK ====

function createExplosion(x, y, count = 20) {
  const container = document.getElementById("explosion-container");

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 80;

    const dx = Math.cos(angle) * radius + "px";
    const dy = Math.sin(angle) * radius + "px";

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty("--x", dx);
    particle.style.setProperty("--y", dy);
    particle.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;

    container.appendChild(particle);

    setTimeout(() => {
      container.removeChild(particle);
    }, 600);
  }
}
