/* ============================================================
   FRENCH FRY THE AGENT — main.js
   Full chaos engine. Built with attitude. No apologies.
   ============================================================ */

'use strict';

// ---- TAGLINES (rotating hero text) ----
const TAGLINES = [
  "I ran into your shin to say hello. That IS my handshake.",
  "Currently napping. Results still guaranteed. Somehow.",
  "I sat on your laptop. The project is now better. You're welcome.",
  "Half French. Half English. Zero chill.",
  "Available for work. Unavailable for nonsense. JK I love nonsense.",
  "Freelance. Stubborn. Slightly gassy. Very good at my job.",
  "My references will tell you I sneezed on them. They all gave 5 stars.",
  "I don't do standup. I do sit-down. On your lap. Without asking.",
  "Currently billing for this nap. It's important strategic rest.",
  "If you can read this, I am probably already in your office.",
  "Inbox: 0 (I cannot read). Results: 100. Coincidence? No.",
  "I don't have a LinkedIn. I have a treat bag. Same energy.",
];

// ---- SECRET CLICK MESSAGES ----
const SECRET_MESSAGES = [
  "woof 🐕",
  "biscuit? 🦴",
  "i heard a noise",
  "sniff sniff",
  "this is my lap now",
  "zzzzzz 💤",
  "did you say WALK",
  "excuse me that's my shin",
  "who said treats",
  "*loud breathing intensifies*",
  "i do not apologise for this",
  "what are you looking at",
  "i farted. you're welcome.",
  "squirrel???",
  "currently being a good boy",
  "actually i'm a great boy",
  "the BEST boy. objectively.",
];

// ---- VIBE RESPONSES ----
const VIBE_RESPONSES = [
  { max: 10,  mood: 'sad',      text: "oh no. oh no no no. come sit with me. i am sitting on you now." },
  { max: 25,  mood: 'sad',      text: "it's rough out there. i ran into a shin for you. felt right." },
  { max: 40,  mood: 'sad',      text: "managing, are we? let's have a nap. things look better after naps." },
  { max: 55,  mood: 'neutral',  text: "neutral. acceptable. have you eaten a biscuit today? do that." },
  { max: 65,  mood: 'neutral',  text: "solid middle ground energy. respectable. suspicious but respectable." },
  { max: 78,  mood: 'happy',    text: "NOW we're talking. i'm doing a little wiggle. just for you." },
  { max: 90,  mood: 'happy',    text: "GREAT vibes. i am thriving. you are thriving. let's both fart and celebrate." },
  { max: 100, mood: 'ecstatic', text: "MAXIMUM VIBE. ABSOLUTELY UNHINGED LEVELS OF GOOD. I AM RUNNING IN CIRCLES. 🍟🍟🍟" },
];

/* ============================================================
   DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initTaglines();
  initDogFace();
  initRevealObserver();
  initStatBars();
  initTestimonialCarousel();
  initVibeCheck();
  initBiscuitCounter();
  initSecretClicks();
  initTiltCards();
  initPhotoBreak();
});

/* ============================================================
   CUSTOM CURSOR + PAW TRAILS
   ============================================================ */
function initCursor() {
  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let lastPawX = 0, lastPawY = 0;
  let pawCount = 0;
  const PAW_DISTANCE = 60;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';

    // Spawn paw trail when moving
    const dx = mouseX - lastPawX;
    const dy = mouseY - lastPawY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > PAW_DISTANCE) {
      spawnPaw(mouseX, mouseY, Math.atan2(dy, dx) * (180/Math.PI));
      lastPawX = mouseX;
      lastPawY = mouseY;
      pawCount++;
    }
  });

  // Smooth ring follow
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  // Click sparkles
  document.addEventListener('click', (e) => {
    spawnSparkles(e.clientX, e.clientY);
  });
}

function spawnPaw(x, y, angleDeg) {
  const paws = ['🐾', '🐾', '🐾', '🐾'];
  const el = document.createElement('div');
  el.className = 'cursor-paw';
  el.textContent = paws[Math.floor(Math.random() * paws.length)];
  el.style.left = x + 'px';
  el.style.top  = y + 'px';
  el.style.setProperty('--rot', (angleDeg - 90) + 'deg');
  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

function spawnSparkles(x, y) {
  const emojis = ['✨', '⭐', '💥', '🌟', '🍟', '💫', '🦴'];
  const count  = 6 + Math.floor(Math.random() * 4);
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'sparkle-particle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    const angle  = (Math.random() * 360) * (Math.PI / 180);
    const radius = 40 + Math.random() * 60;
    el.style.setProperty('--dx', Math.cos(angle) * radius + 'px');
    el.style.setProperty('--dy', Math.sin(angle) * radius + 'px');
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

/* ============================================================
   ROTATING TAGLINES
   ============================================================ */
function initTaglines() {
  const el = document.getElementById('hero-tagline');
  if (!el) return;

  let idx = 0;

  function showNext() {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => {
      el.textContent = '"' + TAGLINES[idx] + '"';
      el.style.transition = 'opacity 0.5s, transform 0.5s';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      idx = (idx + 1) % TAGLINES.length;
    }, 400);
  }

  el.style.transition = 'opacity 0.5s, transform 0.5s';
  showNext();
  setInterval(showNext, 4000);
}

/* ============================================================
   DOG FACE — eye tracking + tongue on hover
   ============================================================ */
function initDogFace() {
  const dogFace    = document.getElementById('dog-face');
  const pupilLeft  = document.getElementById('pupil-left');
  const pupilRight = document.getElementById('pupil-right');
  const tongue     = document.getElementById('dog-tongue');
  const eyeLeft    = document.getElementById('eye-left');
  const eyeRight   = document.getElementById('eye-right');

  if (!dogFace) return;

  const MAX_TRAVEL = 6; // px

  document.addEventListener('mousemove', (e) => {
    movePupil(eyeLeft,  pupilLeft,  e.clientX, e.clientY);
    movePupil(eyeRight, pupilRight, e.clientX, e.clientY);
  });

  function movePupil(eyeEl, pupilEl, mx, my) {
    const rect  = eyeEl.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = mx - cx;
    const dy    = my - cy;
    const angle = Math.atan2(dy, dx);
    const dist  = Math.min(Math.sqrt(dx*dx + dy*dy), 40);
    const ratio = Math.min(dist / 40, 1) * MAX_TRAVEL;
    pupilEl.style.transform = `translate(calc(-50% + ${Math.cos(angle)*ratio}px), calc(-50% + ${Math.sin(angle)*ratio}px))`;
  }

  // Tongue on hover/click
  dogFace.addEventListener('mouseenter', () => tongue.classList.add('out'));
  dogFace.addEventListener('mouseleave', () => tongue.classList.remove('out'));

  // Click — shake and snort
  dogFace.addEventListener('click', () => {
    dogFace.style.animation = 'none';
    dogFace.style.transform = 'scale(1.1) rotate(5deg)';
    setTimeout(() => {
      dogFace.style.transform = 'scale(0.95) rotate(-3deg)';
    }, 100);
    setTimeout(() => {
      dogFace.style.transform = '';
      dogFace.style.animation = '';
    }, 300);
    showToast(SECRET_MESSAGES[Math.floor(Math.random() * SECRET_MESSAGES.length)]);
    bumpBiscuit();
  });

  // Random blink
  setInterval(() => {
    if (Math.random() > 0.6) {
      [eyeLeft, eyeRight].forEach(eye => {
        eye.style.transform = 'scaleY(0.1)';
        setTimeout(() => eye.style.transform = '', 120);
      });
    }
  }, 3000);

  // Ear wiggle on page click
  document.addEventListener('click', () => {
    const ears = document.querySelectorAll('.dog-ear');
    ears.forEach(ear => {
      ear.style.transition = 'transform 0.15s';
      const isLeft = ear.classList.contains('dog-ear-left');
      ear.style.transform = isLeft ? 'rotate(-35deg)' : 'rotate(35deg)';
      setTimeout(() => {
        ear.style.transform = isLeft ? 'rotate(-15deg)' : 'rotate(15deg)';
      }, 150);
    });
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initRevealObserver() {
  // Add reveal class to section children
  document.querySelectorAll('.section').forEach(section => {
    const children = section.querySelectorAll(
      '.about-card, .service-card, .work-card, .testimonial-card, .contact-method, .section-header, .mgmt-principle, .mgmt-james-card, .mgmt-orgchart, .mgmt-announcement, .mgmt-cta, .team-card'
    );
    children.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (i * 0.08) + 's';
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================================================
   STAT BAR ANIMATIONS
   ============================================================ */
function initStatBars() {
  const bars = document.querySelectorAll('.stat-bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const w   = bar.getAttribute('data-width');
        bar.style.width = w + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
}

/* ============================================================
   TESTIMONIAL CAROUSEL
   ============================================================ */
function initTestimonialCarousel() {
  const track  = document.getElementById('testimonials-track');
  const prev   = document.getElementById('t-prev');
  const next   = document.getElementById('t-next');
  const dotsEl = document.getElementById('t-dots');

  if (!track) return;

  const cards  = track.querySelectorAll('.testimonial-card');
  const perPage = window.innerWidth > 900 ? 2 : 1;
  const total   = Math.ceil(cards.length / perPage);
  let   current = 0;

  // Build dots
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 't-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  }

  function goTo(idx) {
    current = (idx + total) % total;
    const offset = current * (100 / perPage) * perPage;
    track.style.transform = `translateX(-${current * (100 / cards.length) * perPage * perPage}%)`;

    // recalc: each card is 50% wide on desktop
    const cardWidth  = track.querySelector('.testimonial-card').offsetWidth;
    const gap        = 24; // 1.5rem
    track.style.transform = `translateX(-${current * (cardWidth + gap) * perPage}px)`;

    dotsEl.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));

  // Auto-advance
  setInterval(() => goTo(current + 1), 6000);
}

/* ============================================================
   VIBE CHECK (FART-O-METER)
   ============================================================ */
function initVibeCheck() {
  const slider   = document.getElementById('fartometer-slider');
  const face     = document.getElementById('fartometer-face');
  const response = document.getElementById('fartometer-response');

  if (!slider) return;

  slider.addEventListener('input', () => {
    const val = parseInt(slider.value, 10);
    const vibe = VIBE_RESPONSES.find(v => val <= v.max) || VIBE_RESPONSES[VIBE_RESPONSES.length - 1];

    // Clear all mood classes
    face.classList.remove('sad', 'neutral', 'happy', 'ecstatic');
    face.classList.add(vibe.mood);

    response.style.opacity = '0';
    setTimeout(() => {
      response.textContent  = vibe.text;
      response.style.opacity = '1';
    }, 150);

    // Update slider track colour
    const pct = val + '%';
    slider.style.background = `linear-gradient(90deg, var(--yellow) ${pct}, rgba(255,255,255,0.1) ${pct})`;
  });

  // Trigger once at initial value
  slider.dispatchEvent(new Event('input'));
}

/* ============================================================
   BISCUIT COUNTER
   ============================================================ */
let biscuits = 0;

function bumpBiscuit() {
  biscuits++;
  const countEl = document.getElementById('biscuit-count');
  if (!countEl) return;
  countEl.textContent = biscuits;
  countEl.classList.remove('bump');
  void countEl.offsetWidth; // reflow
  countEl.classList.add('bump');
  setTimeout(() => countEl.classList.remove('bump'), 300);
}

function initBiscuitCounter() {
  // every click anywhere bumps the counter (we ARE a dog)
  document.addEventListener('click', bumpBiscuit);
}

/* ============================================================
   SECRET CLICKS (non-dog-face clicks)
   ============================================================ */
let toastTimeout;

function showToast(msg) {
  const toast = document.getElementById('secret-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2200);
}

function initSecretClicks() {
  let clickCount = 0;
  document.addEventListener('click', (e) => {
    // Only show toast for non-interactive element clicks
    const tag = e.target.tagName.toLowerCase();
    if (['button', 'a', 'input'].includes(tag)) return;
    if (e.target.closest('.dog-face')) return;

    clickCount++;
    if (clickCount % 3 === 0) {
      showToast(SECRET_MESSAGES[Math.floor(Math.random() * SECRET_MESSAGES.length)]);
    }
  });
}

/* ============================================================
   TILT EFFECT ON SERVICE CARDS
   ============================================================ */
function initTiltCards() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(600px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ============================================================
   GLOBAL MODAL FUNCTIONS (called from HTML onclick)
   ============================================================ */
window.triggerBark = function() {
  document.getElementById('bark-modal').classList.add('open');
  showToast("WOOF WOOF WOOF 🐕");
  // Shake the page
  document.body.style.animation = 'none';
  let shakes = 0;
  const shakeInterval = setInterval(() => {
    document.body.style.transform = shakes % 2 === 0 ? 'translateX(-4px)' : 'translateX(4px)';
    shakes++;
    if (shakes > 6) {
      clearInterval(shakeInterval);
      document.body.style.transform = '';
    }
  }, 50);
};

window.triggerLapSit = function() {
  document.getElementById('lap-modal').classList.add('open');
  showToast("*PLONK* 🐾");
};

window.triggerJamesAlert = function() {
  const messages = [
    "JAMES. YOU HAVE BEEN PROMOTED. TO BEING MANAGED BY ME. EFFECTIVE IMMEDIATELY. YOUR FIRST TASK IS TO GET ME A TREAT.",
    "Hello James. This is your performance review. It is happening now. Sit. Good.",
    "James. I have thought about this very carefully (during my last nap) and I have concluded you work for me now.",
    "ATTENTION DIRECT REPORT: please refill the water bowl. this is your first official management communication.",
    "James your 1:1 is scheduled for whenever I sit on you. which is always. you're welcome.",
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  const modal = document.getElementById('james-modal');
  const msgEl = document.getElementById('james-modal-msg');
  if (msgEl) msgEl.textContent = msg;
  if (modal) modal.classList.add('open');
  showToast("HI JAMES 🐕");

  // Rattle the James photo
  const img = document.getElementById('james-img');
  if (img) {
    img.style.transition = 'transform 0.15s';
    let shakes = 0;
    const i = setInterval(() => {
      img.style.transform = shakes % 2 === 0 ? 'scale(1.04) rotate(-2deg)' : 'scale(1.04) rotate(2deg)';
      shakes++;
      if (shakes > 5) { clearInterval(i); img.style.transform = ''; }
    }, 80);
  }
};

window.closeModal = function(id) {
  document.getElementById(id).classList.remove('open');
  bumpBiscuit();
};

// Close modals on backdrop click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('open');
  }
});

/* ============================================================
   PHOTO BREAK — parallax scroll + click interaction
   ============================================================ */
function initPhotoBreak() {
  const photoBreak = document.getElementById('photo-break');
  const img        = document.getElementById('photo-break-img');
  if (!photoBreak || !img) return;

  img.classList.add('parallax-ready');

  // Parallax: image moves slower than scroll, creates depth
  function onScroll() {
    const rect   = photoBreak.getBoundingClientRect();
    const viewH  = window.innerHeight;
    // Only run when the break is near the viewport
    if (rect.bottom < -200 || rect.top > viewH + 200) return;

    // Progress from 0 (entering bottom) to 1 (leaving top)
    const progress = 1 - (rect.bottom / (viewH + rect.height));
    // Shift image up to -8% as you scroll past — slower than the page
    const shift    = progress * 12 - 6; // range: -6% to +6%
    img.style.transform = `scale(1.06) translateY(${shift}%)`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // Click the photo: dramatic zoom-in toast — because I do not ignore attention
  img.addEventListener('click', () => {
    showToast(SECRET_MESSAGES[Math.floor(Math.random() * SECRET_MESSAGES.length)]);
    bumpBiscuit();
    // Quick scale pop on the break element
    photoBreak.style.transition = 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)';
    photoBreak.style.transform  = 'rotate(-1.2deg) scaleX(1.04) scale(1.015)';
    setTimeout(() => {
      photoBreak.style.transform = 'rotate(-1.2deg) scaleX(1.04) scale(1)';
    }, 200);
  });
}

/* ============================================================
   KONAMI CODE EASTER EGG
   ============================================================ */
(function() {
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let seq = [];
  document.addEventListener('keydown', (e) => {
    seq.push(e.key);
    seq = seq.slice(-KONAMI.length);
    if (seq.join(',') === KONAMI.join(',')) {
      showToast("🍟🍟🍟 MAXIMUM FRENCH FRY MODE ACTIVATED 🍟🍟🍟");
      document.body.style.animation = 'none';
      document.body.style.transition = 'filter 0.3s';

      // Rainbow flash
      let hue = 0;
      const interval = setInterval(() => {
        document.body.style.filter = `hue-rotate(${hue}deg)`;
        hue += 15;
        if (hue >= 360) {
          clearInterval(interval);
          document.body.style.filter = '';
        }
      }, 40);

      // Explosion of fries
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          spawnSparkles(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
          );
        }, i * 80);
      }
    }
  });
})();

/* ============================================================
   AMBIENT CHAOS — randomise chaos object positions on load
   ============================================================ */
(function() {
  document.querySelectorAll('.chaos-object').forEach(el => {
    el.style.top  = Math.random() * 80 + 5  + '%';
    el.style.left = Math.random() * 90 + 5  + '%';
  });
})();

/* ============================================================
   TITLE CLICK — make the title letters explode
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const titleLines = document.querySelectorAll('.title-line');
  titleLines.forEach(line => {
    line.addEventListener('click', () => {
      const chars = line.textContent.split('');
      line.innerHTML = chars.map(c =>
        `<span style="display:inline-block;transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${Math.random()*0.2}s,opacity 0.4s;transform:translate(${(Math.random()-0.5)*80}px,${(Math.random()-0.5)*80}px) rotate(${(Math.random()-0.5)*360}deg);opacity:0">${c}</span>`
      ).join('');
      setTimeout(() => {
        line.innerHTML = chars.join('');
      }, 600);
    });
  });

  // Scroll progress changes nav color subtly
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    document.documentElement.style.setProperty('--scroll-progress', scrolled.toString());
  });
});

/* ============================================================
   SNORE BUBBLE — only shows during idle
   ============================================================ */
(function() {
  let idleTimer;
  const snore = document.getElementById('snore-bubble');

  function resetIdle() {
    clearTimeout(idleTimer);
    if (snore) snore.style.opacity = '0';
    idleTimer = setTimeout(() => {
      if (snore) snore.style.opacity = '1';
    }, 5000); // after 5 seconds of no input, start snoring
  }

  document.addEventListener('mousemove', resetIdle);
  document.addEventListener('keydown',   resetIdle);
  document.addEventListener('click',     resetIdle);
  resetIdle();
})();
