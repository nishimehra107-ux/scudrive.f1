// === PRELOADER ===
document.addEventListener('DOMContentLoaded', function() {
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloaderFill');
  let progress = 0;
  
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    preloaderFill.style.width = progress + '%';
    
    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 600);
    }
  }, 150);

  // === SCROLL REVEAL ===
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  reveals.forEach(el => observer.observe(el));

  // === NAVIGATION SMOOTH SCROLL ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === HERO BUTTONS ===
  document.querySelectorAll('.btn[data-target]').forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.dataset.target;
      let sectionId;
      if (target === 'engineering') sectionId = 'engineering';
      else if (target === 'performance') sectionId = 'performance';
      else if (target === 'aero') sectionId = 'aero';
      
      if (sectionId) {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // === RACE NOW BUTTON ===
  document.getElementById('raceNowBtn').addEventListener('click', function() {
    document.getElementById('performance').scrollIntoView({ behavior: 'smooth' });
    this.style.transform = 'scale(0.95)';
    setTimeout(() => { this.style.transform = 'scale(1)'; }, 200);
  });

  // === PART DATA ===
  const partData = {
    'front-wing': { name: 'Front Wing', desc: 'Ultra-aggressive multi-element front wing generating 25% of total downforce. Directs airflow around the front wheels and to the Venturi floor.' },
    'rear-wing': { name: 'Rear Wing', desc: 'Produces 35% of downforce. DRS system reduces drag for straight-line speed. Adjustable flap opens for overtaking.' },
    'halo': { name: 'Halo', desc: 'Titanium driver protection structure. Withstands 12 tons of force. Provides 360° driver visibility and safety.' },
    'suspension': { name: 'Suspension', desc: 'Push-rod system with hydraulic dampers. Optimized for extreme cornering G-forces up to 6G.' },
    'diffuser': { name: 'Diffuser', desc: 'Accelerates airflow underneath the car. Creates massive ground effect with Venturi tunnels.' },
    'sidepods': { name: 'Sidepods', desc: 'Sculpted housing for radiators and cooling systems. Aerodynamically optimized for airflow management.' },
    'cockpit': { name: 'Cockpit', desc: 'Driver cockpit with halo, steering wheel, and full telemetry display. Carbon fiber monocoque construction.' }
  };

  // === TELEMETRY UPDATES ===
  function updateTelemetry() {
    const rpm = Math.floor(8000 + Math.random() * 4000);
    const rpmDisplay = rpm.toLocaleString();
    document.getElementById('rpmValue').textContent = rpmDisplay;
    document.getElementById('rpmFill').style.width = (rpm / 12000 * 100) + '%';
    
    const brake = Math.floor(600 + Math.random() * 300);
    document.getElementById('brakeValue').textContent = brake + '°C';
    document.getElementById('brakeFill').style.width = (brake / 900 * 100) + '%';
    
    const battery = Math.floor(40 + Math.random() * 50);
    document.getElementById('batteryValue').textContent = battery + '%';
    document.getElementById('batteryFill').style.width = battery + '%';
    
    const gforce = (4 + Math.random() * 3).toFixed(1);
    document.getElementById('gforceValue').textContent = gforce + 'G';
    document.getElementById('gforceFill').style.width = (gforce / 7 * 100) + '%';
    
    document.getElementById('dashRpm').textContent = (rpm / 1000).toFixed(1) + 'k';
    document.getElementById('dashGforce').textContent = gforce + 'G';
    document.getElementById('dashSpeed').textContent = Math.floor(280 + Math.random() * 60);
    
    const gear = Math.floor(4 + Math.random() * 5);
    document.querySelector('.dash-value.gear').textContent = gear;
  }

  setInterval(updateTelemetry, 2000);

  // === RACE SIMULATOR ===
  const raceCar = document.getElementById('raceCar');
  const simSpeed = document.getElementById('simSpeed');
  const simRpm = document.getElementById('simRpm');
  const simGear = document.getElementById('simGear');
  let carPosition = 0;
  let direction = 1;

  function updateRaceSim() {
    carPosition += direction * 1.5;
    if (carPosition > 85) direction = -1;
    if (carPosition < 0) direction = 1;
    raceCar.style.left = carPosition + '%';
    
    const speed = Math.floor(250 + Math.sin(carPosition / 50) * 50 + 50);
    simSpeed.textContent = speed;
    
    const rpm = Math.floor(9000 + Math.sin(carPosition / 50) * 2000 + 1000);
    simRpm.textContent = rpm.toLocaleString();
    
    const gear = Math.floor(4 + Math.sin(carPosition / 50) * 2 + 2);
    simGear.textContent = Math.min(8, Math.max(3, Math.floor(gear)));
  }

  setInterval(updateRaceSim, 100);

  // === SOUND EXPERIENCE ===
  const soundBtn = document.getElementById('soundBtn');
  const soundWaves = document.querySelectorAll('.sound-wave');
  let engineRunning = false;
  let soundInterval;

  soundBtn.addEventListener('click', function() {
    engineRunning = !engineRunning;
    
    if (engineRunning) {
      this.textContent = '🔊 V6 Engine Running';
      this.classList.add('active');
      soundWaves.forEach(wave => wave.classList.add('active'));
      
      soundInterval = setInterval(() => {
        soundWaves.forEach(wave => {
          const height = Math.floor(15 + Math.random() * 45);
          wave.style.height = height + 'px';
        });
      }, 150);
    } else {
      this.textContent = '🔊 Start V6 Engine';
      this.classList.remove('active');
      soundWaves.forEach(wave => {
        wave.classList.remove('active');
        wave.style.height = '10px';
      });
      clearInterval(soundInterval);
    }
  });

  // === NAVBAR SCROLL EFFECT ===
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.background = 'rgba(5, 5, 5, 0.85)';
      navbar.style.borderBottom = '1px solid #DC000044';
    } else {
      navbar.style.background = 'rgba(5, 5, 5, 0.6)';
      navbar.style.borderBottom = '1px solid rgba(220, 0, 0, 0.1)';
    }
  });

  // === CURSOR EFFECT ON HERO ===
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      this.style.background = `
        radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(220, 0, 0, 0.08) 0%, transparent 50%),
        radial-gradient(circle at ${100 - x * 100}% ${100 - y * 100}%, rgba(220, 0, 0, 0.04) 0%, transparent 50%),
        #050505
      `;
    });
  }

  // === COUNTER ANIMATION ===
  const specValues = document.querySelectorAll('.spec-value[data-counter]');
  specValues.forEach(el => {
    const target = el.dataset.counter;
    if (target) {
      const num = parseFloat(target.replace(/[^0-9.]/g, ''));
      if (!isNaN(num)) {
        let current = 0;
        const increment = num / 50;
        const interval = setInterval(() => {
          current += increment;
          if (current >= num) {
            current = num;
            clearInterval(interval);
          }
          const display = Math.floor(current);
          if (target.includes('kg')) el.textContent = display + ' kg';
          else if (target.includes('km/h')) el.textContent = display + '+ km/h';
          else if (target.includes('s')) el.textContent = display.toFixed(1) + 's';
          else if (target.includes('+')) el.textContent = display + '+';
          else el.textContent = display;
        }, 30);
      }
    }
  });

  // === PARALLAX ON SCROLL ===
  const carContainer = document.querySelector('.f1-car-container');
  if (carContainer) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const speed = 0.08;
      carContainer.style.transform = `translateY(calc(-50% + ${scrolled * speed}px)) scale(0.85)`;
    });
  }

  console.log('🏎️ Ferrari F1 Ultimate Experience Loaded! Engineered for Speed.');
});