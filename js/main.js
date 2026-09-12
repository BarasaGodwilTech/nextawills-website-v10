/* Nextawills Technologies — site behaviour
   Loaded once, shared across every page. Everything here is defensive:
   each init checks that its markup exists before wiring anything up,
   so this one file works unmodified on every page in the site. */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavToggle();
    initNavActiveLink();
    initNavStatus();
    initScrollProgress();
    initScrollReveal();
    initCountUp();
    initFaqAccordion();
    initContactForm();
    initCustomCursor();
    initMagneticButtons();
    initWhatsAppButton();
    initBackToTop();
    initConsoleFeed();
  });

  /* ---------- Theme (dark is the default experience) ----------
     The inline snippet in <head> already set data-theme before first
     paint to avoid a flash. This just wires up the toggle button and
     keeps the mobile status-bar colour in sync. */
  function initTheme() {
    const root = document.documentElement;
    const button = document.getElementById('themeToggle');
    const metaTheme = document.querySelector('meta[name="theme-color"]');

    const apply = (theme) => {
      root.setAttribute('data-theme', theme);
      const dark = theme === 'dark';
      if (button) {
        button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
        button.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
        button.innerHTML = `<span class="theme-toggle__icon" aria-hidden="true"><i class="fa-solid ${dark ? 'fa-sun' : 'fa-moon'}"></i></span><span class="theme-toggle__label">${dark ? 'Light' : 'Dark'}</span>`;
      }
      if (metaTheme) metaTheme.setAttribute('content', dark ? '#0a1013' : '#f6f7f5');
    };

    // Current theme was already set by the anti-flash inline script; just sync the UI to it.
    apply(root.getAttribute('data-theme') || 'dark');

    if (button) {
      button.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('nextawills-theme', next); } catch (e) {}
        apply(next);
      });
    }
  }

  /* ---------- Mobile nav toggle ---------- */
  function initNavToggle() {
    const toggle = document.getElementById('navToggle');
    const links = document.querySelector('.nav__links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('nav__links--open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('nav__links--open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------- Highlight the current page in the primary nav ---------- */
  function initNavActiveLink() {
    const links = document.querySelectorAll('.nav__links a');
    if (!links.length) return;
    const current = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      const file = href.split('/').pop();
      if (file === current || (current === '' && file === 'index.html')) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ---------- Mbale local time in the nav status pill ---------- */
  function initNavStatus() {
    const el = document.getElementById('navStatusTime');
    if (!el) return;
    const tick = () => {
      const now = new Date();
      const eat = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Kampala', hour: '2-digit', minute: '2-digit' }).format(now);
      el.textContent = `Mbale ${eat} EAT`;
    };
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- Thin scroll-progress bar ---------- */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const height = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      bar.style.width = pct + '%';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---------- Scroll reveal ---------- */
  function initScrollReveal() {
    const targets = document.querySelectorAll('.fade-up');
    if (!targets.length) return;
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('in'));
      return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    targets.forEach(el => observer.observe(el));
  }

  /* ---------- Animated stat counters ---------- */
  function initCountUp() {
    const stats = document.querySelectorAll('.stat__value[data-count]');
    if (!stats.length) return;
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || (String(target).includes('.') ? '%' : '');
      const start = performance.now();
      const duration = 1000;
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const e = 1 - Math.pow(1 - p, 3);
        const current = target * e;
        el.textContent = (String(target).includes('.') ? current.toFixed(1) : Math.round(current)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { animate(entry.target); observer.unobserve(entry.target); }
    }), { threshold: 0.5 });
    stats.forEach(el => observer.observe(el));
  }

  /* ---------- FAQ accordion ---------- */
  function initFaqAccordion() {
    const items = [...document.querySelectorAll('.faq__item')];
    if (!items.length) return;
    items.forEach(item => {
      const q = item.querySelector('.faq__q');
      const a = item.querySelector('.faq__a');
      if (!q || !a) return;
      const open = item.getAttribute('data-open') === 'true';
      q.setAttribute('aria-expanded', String(open));
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
      q.addEventListener('click', () => {
        const willOpen = item.getAttribute('data-open') !== 'true';
        items.forEach(other => {
          other.setAttribute('data-open', 'false');
          const oq = other.querySelector('.faq__q');
          const oa = other.querySelector('.faq__a');
          if (oq) oq.setAttribute('aria-expanded', 'false');
          if (oa) oa.style.maxHeight = '0px';
        });
        item.setAttribute('data-open', String(willOpen));
        q.setAttribute('aria-expanded', String(willOpen));
        a.style.maxHeight = willOpen ? a.scrollHeight + 'px' : '0px';
      });
    });
  }

  /* ---------- Contact form ----------
     Placeholder handler: replace the mailto with a real backend
     endpoint (e.g. POST /api/v1/inquiries) once one exists. */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const subject = encodeURIComponent(`New enquiry — ${data.service || 'IT services'}`);
      const body = encodeURIComponent(`Name: ${data.name || ''}\nContact: ${data.contact || ''}\nService: ${data.service || ''}\n\nProject / request:\n${data.need || ''}`);
      window.location.href = `mailto:hello@nextawills.com?subject=${subject}&body=${body}`;
      if (status) status.textContent = 'Your email app should open with the enquiry ready to send.';
    });
  }

  /* ---------- Custom precision cursor ----------
     A small dot + trailing ring that swells over interactive elements.
     Fine-pointer devices only; does nothing on touch or reduced-motion,
     and is fully inert (pointer-events:none) so it never blocks a click.
     Elements are created here (not left as static markup) so the effect
     works identically on every page without extra HTML per page. */
  function initCustomCursor() {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || prefersReduced) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.setAttribute('aria-hidden', 'true');
    document.body.append(dot, ring);

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, active = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (!active) { active = true; document.body.classList.add('cursor-active'); }
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-active');
      active = false;
    });
    document.addEventListener('mouseenter', () => {
      active = true;
      document.body.classList.add('cursor-active');
    });

    const hoverables = 'a, button, .card, .plan, .feature, .value, .faq__q, input, textarea, select, [data-magnetic]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest && e.target.closest(hoverables)) ring.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest && e.target.closest(hoverables)) ring.classList.remove('is-hover');
    });

    function raf() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  /* ---------- Magnetic buttons ----------
     Primary buttons nudge a few pixels toward the cursor when it passes
     nearby, then spring back — a light, deliberate touch, not a gimmick. */
  function initMagneticButtons() {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const buttons = document.querySelectorAll('.btn--solid');
    if (!buttons.length || !isFine || prefersReduced) return;

    buttons.forEach(btn => {
      btn.setAttribute('data-magnetic', '');
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- WhatsApp floating action button (every page) ----------
     Built once here so it's guaranteed identical and present site-wide,
     rather than hand-copied into twelve separate HTML files. */
  function initWhatsAppButton() {
    if (document.querySelector('.whatsapp-float')) return; // don't double-inject

    const number = '256700000000'; // TODO: replace with the real Nextawills WhatsApp business number
    const message = encodeURIComponent("Hi Nextawills, I'd like to talk about a project.");
    const link = document.createElement('a');
    link.className = 'whatsapp-float';
    link.href = `https://wa.me/${number}?text=${message}`;
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', 'Chat with Nextawills on WhatsApp');
    link.innerHTML = `
      <span class="whatsapp-float__ping" aria-hidden="true"></span>
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.02 2.67C8.66 2.67 2.69 8.63 2.69 16c0 2.5.68 4.85 1.87 6.86L2.67 29.33l6.64-1.85a13.24 13.24 0 0 0 6.71 1.82h.01c7.36 0 13.33-5.96 13.33-13.33 0-3.56-1.39-6.91-3.9-9.42a13.24 13.24 0 0 0-9.44-3.88Zm0 24.42h-.01a11.07 11.07 0 0 1-5.65-1.55l-.4-.24-3.94 1.1 1.05-3.85-.26-.4a11.1 11.1 0 0 1-1.7-5.91c0-6.12 4.98-11.1 11.11-11.1a11.04 11.04 0 0 1 7.86 3.25 11.04 11.04 0 0 1 3.25 7.86c0 6.13-4.98 11.1-11.31 11.1v.74-.74Zm6.1-8.3c-.33-.17-1.96-.97-2.27-1.08-.3-.11-.52-.17-.75.17-.22.33-.85 1.08-1.04 1.3-.19.22-.38.25-.71.08-.33-.17-1.4-.52-2.66-1.65-.98-.88-1.65-1.96-1.84-2.29-.19-.33-.02-.5.15-.67.15-.15.33-.39.5-.58.17-.2.22-.33.33-.55.11-.22.06-.42-.03-.58-.08-.17-.75-1.8-1.03-2.47-.27-.65-.55-.56-.75-.57l-.64-.01c-.22 0-.58.08-.88.42-.3.33-1.15 1.13-1.15 2.75 0 1.62 1.18 3.19 1.34 3.41.17.22 2.32 3.55 5.63 4.97.79.34 1.4.54 1.88.7.79.25 1.51.21 2.08.13.63-.1 1.96-.8 2.24-1.57.28-.77.28-1.44.19-1.57-.08-.14-.3-.22-.63-.39Z"/>
      </svg>
      <span class="whatsapp-float__label">Chat with us</span>
    `;
    document.body.appendChild(link);
  }

  /* ---------- Back-to-top button (every page) ----------
     Sits directly above the WhatsApp float (see .back-to-top in CSS)
     and fades in once the visitor has scrolled a bit down the page. */
  function initBackToTop() {
    if (document.querySelector('.back-to-top')) return; // don't double-inject

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
    document.body.appendChild(button);

    const toggle = () => {
      button.classList.toggle('is-visible', (window.scrollY || document.documentElement.scrollTop) > 480);
    };
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
  }

  /* ---------- Live console feed (hero status card) ----------
     Gives the "mac window" hero card a lively, always-working feel by
     cycling through a short list of real ops-style tasks. Types each
     one out, holds briefly, then erases and moves to the next — a
     believable status log rather than a static, dead line of text. */
  function initConsoleFeed() {
    const el = document.getElementById('consoleFeedText');
    if (!el) return;

    const tasks = [
      'deploy complete — clientportal.io',
      'renewing SSL — greenpasture.ac.ug',
      'nightly backup — verified',
      'provisioning VPS — mbale-02',
      'optimizing images — nextastore',
      'uptime check — 99.98%'
    ];

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      let i = 0;
      el.textContent = tasks[0];
      setInterval(() => {
        i = (i + 1) % tasks.length;
        el.textContent = tasks[i];
      }, 3200);
      return;
    }

    let i = 0;
    let timer = null;

    function typeTask() {
      const text = tasks[i];
      let c = 0;
      el.textContent = '';
      timer = setInterval(() => {
        c++;
        el.textContent = text.slice(0, c);
        if (c >= text.length) {
          clearInterval(timer);
          timer = setTimeout(eraseTask, 1600);
        }
      }, 32);
    }

    function eraseTask() {
      let text = el.textContent;
      timer = setInterval(() => {
        text = text.slice(0, -1);
        el.textContent = text;
        if (text.length === 0) {
          clearInterval(timer);
          i = (i + 1) % tasks.length;
          timer = setTimeout(typeTask, 300);
        }
      }, 18);
    }

    typeTask();
  }
})();
