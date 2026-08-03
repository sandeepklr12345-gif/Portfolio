// ============ NAV ============
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  updateProgress();
}, { passive: true });

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
}));

// ============ SCROLL PROGRESS ============
const progressFill = document.getElementById('progressFill');
function updateProgress(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressFill.style.width = scrolled + '%';
}

// ============ REVEAL ON SCROLL ============
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), i * 60);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ============ CURSOR GLOW ============
const glow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
}, { passive: true });

// ============ BUTTON RIPPLE ============
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e){
    const rect = this.getBoundingClientRect();
    this.style.setProperty('--x', (e.clientX - rect.left) + 'px');
    this.style.setProperty('--y', (e.clientY - rect.top) + 'px');
    this.classList.remove('rippling');
    void this.offsetWidth;
    this.classList.add('rippling');
  });
});

// ============ TYPING TERMINAL ============
const typedCodeEl = document.getElementById('typedCode');
const profileLines = [
  '{',
  '  "name": "Sandeep K",',
  '  "role": "AI / Full Stack Engineer",',
  '  "education": "B.E. CSE (AI), 2027",',
  '  "cgpa": 8.53,',
  '  "patent": "Filed",',
  '  "stack": ["Python", "Java", "React",',
  '            "Spring Boot", "TensorFlow"],',
  '  "openTo": ["SDE Internship", "AI/ML",',
  '             "Full Stack"]',
  '}'
];
const fullText = profileLines.join('\n');
let charIndex = 0;
function typeCode(){
  if (charIndex <= fullText.length) {
    typedCodeEl.textContent = highlightJSON(fullText.slice(0, charIndex));
    charIndex += 2;
    setTimeout(typeCode, 14);
  }
}
function highlightJSON(str){
  return str; // plain text keeps this dependency-free & safe from HTML injection
}
// start typing once hero is in view
setTimeout(typeCode, 600);

// ============ NEURAL NETWORK CANVAS BG ============
const canvas = document.getElementById('net-canvas');
const ctx = canvas.getContext('2d');
let w, h, nodes;
const NODE_COUNT = 46;

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = Math.max(window.innerHeight, document.body.scrollHeight * 0.4);
}
function initNodes(){
  nodes = Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
  }));
}
function step(){
  ctx.clearRect(0, 0, w, h);
  const linkDist = 150;

  for (const n of nodes) {
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > w) n.vx *= -1;
    if (n.y < 0 || n.y > h) n.vy *= -1;
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < linkDist) {
        ctx.strokeStyle = `rgba(100,255,218,${(1 - dist / linkDist) * 0.12})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }
  for (const n of nodes) {
    ctx.fillStyle = 'rgba(100,255,218,0.5)';
    ctx.beginPath();
    ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(step);
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  resize();
  initNodes();
  requestAnimationFrame(step);
  window.addEventListener('resize', () => { resize(); });
}

// ============ CONTACT FORM (front-end only demo) ============
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Thanks for reaching out — this form is a static demo, so please email me directly at Sandeepklr12345@gmail.com for now.';
  form.reset();
});
