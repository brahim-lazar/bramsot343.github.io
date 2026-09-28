/* shared.js — nav, footer, scroll, reveal */
(function () {

  /* ── Fonts ─────────────────────────────────────────────── */
  if (!document.getElementById('gfonts')) {
    const l = document.createElement('link');
    l.id = 'gfonts';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap';
    document.head.appendChild(l);
  }

  /* ── Current page detection ─────────────────────────────── */
  const page = location.pathname.split('/').pop() || 'index.html';

  const NAV_LINKS = [
    { href: 'index.html',      label: 'Accueil'    },
    { href: 'profil.html',     label: 'Profil'     },
    { href: 'parcours.html',   label: 'Parcours'   },
    { href: 'entreprise.html', label: 'Entreprise' },
    { href: 'e5.html',         label: 'E5'         },
    { href: 'projets.html',    label: 'Projets'    },
    { href: 'veille.html',     label: 'Veille'     },
    { href: 'contact.html',    label: 'Contact'    },
  ];

  function buildNav() {
    const links = NAV_LINKS.map(l =>
      `<a href="${l.href}"${page === l.href ? ' class="active"' : ''}>${l.label}</a>`
    ).join('');
    const mobileLinks = NAV_LINKS.map(l =>
      `<a href="${l.href}"${page === l.href ? ' class="active"' : ''}>${l.label}</a>`
    ).join('');

    const nav = document.createElement('nav');
    nav.className = 'nav';
    nav.id = 'mainNav';
    nav.innerHTML = `
      <a href="index.html" class="nav-logo">Brahim<span>.</span>Lazar</a>
      <div class="nav-links">${links}</div>
      <a href="contact.html" class="nav-cta">Me contacter</a>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>`;
    document.body.prepend(nav);

    const mob = document.createElement('div');
    mob.className = 'nav-mobile';
    mob.id = 'mobileNav';
    mob.innerHTML = mobileLinks;
    document.body.insertBefore(mob, nav.nextSibling);

    /* scroll effect */
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

    /* hamburger */
    const ham = document.getElementById('hamburger');
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mob.classList.toggle('open');
    });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      ham.classList.remove('open'); mob.classList.remove('open');
    }));
  }

  function buildFooter() {
    const links = NAV_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join('');
    const d = new Date();
    const dateStr = d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });

    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <h3>Brahim <span>Lazar</span></h3>
            <p>Étudiant en BTS SIO SISR<br>Lycée Auguste Blanqui · Saint-Ouen<br>Mise à jour : ${dateStr}</p>
          </div>
          <div class="footer-col">
            <h4>Navigation</h4>
            ${links}
          </div>
          <div class="footer-col">
            <h4>Réseaux &amp; Ressources</h4>
            <a href="https://github.com" target="_blank">GitHub</a>
            <a href="https://linkedin.com" target="_blank">LinkedIn</a>
            <a href="mailto:brahimlazar343@gmail.com">Email</a>
            <a href="tableau-synthese.pdf" target="_blank">Tableau de synthèse</a>
            <a href="Rapport_De_Stage.pdf" target="_blank">Rapport de stage</a>
          </div>
        </div>
        <div class="footer-bottom">© 2025 Brahim Lazar. Tous droits réservés.</div>
      </div>`;
    document.body.appendChild(footer);
  }

  function buildScrollTop() {
    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.id = 'scrollTop';
    btn.setAttribute('aria-label', 'Retour en haut');
    btn.textContent = '↑';
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => btn.classList.toggle('show', scrollY > 400));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function buildReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    buildFooter();
    buildScrollTop();
    buildReveal();
  });

})();
