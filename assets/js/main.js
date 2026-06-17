  /* â”€â”€â”€ STICKY NAV â”€â”€â”€ */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* â”€â”€â”€ MOBILE MENU â”€â”€â”€ */
  function toggleMenu() {
    const links = document.querySelector('.nav-links');
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '72px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'rgba(10,22,40,0.98)';
    links.style.padding = '24px 40px';
    links.style.gap = '20px';
    links.style.borderBottom = '1px solid rgba(191,155,48,0.2)';
  }

  /* â”€â”€â”€ SCROLL REVEAL â”€â”€â”€ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => observer.observe(el));

  /* â”€â”€â”€ COUNTER ANIMATION â”€â”€â”€ */
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const nums = document.querySelectorAll('.stat-num');
        const targets = [314, 99, 3, 2018, 4];
        const suffixes = ['+', '%', '', '', ''];
        nums.forEach((el, i) => animateCounter(el, targets[i], suffixes[i]));
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) statsObserver.observe(statsBar);

  /* â”€â”€â”€ SMOOTH ANCHOR SCROLL â”€â”€â”€ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile menu if open
        const links = document.querySelector('.nav-links');
        if (window.innerWidth < 900) links.style.display = 'none';
      }
    });
  });

  /* â”€â”€â”€ HERO PARALLAX â”€â”€â”€ */
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-bg');
    if (hero) {
      hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
  });
