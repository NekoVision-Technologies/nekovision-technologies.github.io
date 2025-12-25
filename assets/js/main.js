/**
* Template Name: FlexStart
* Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
* Updated: Jun 06 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Theme toggle (light/dark)
   */
  const themeToggleButtons = Array.from(document.querySelectorAll('.theme-toggle'));
  const themeToggleIcons = themeToggleButtons
    .map((btn) => btn.querySelector('i'))
    .filter(Boolean);

  const applyTheme = (mode) => {
    const body = document.body;
    const root = document.documentElement;
    const isDark = mode === 'dark';
    [body, root].forEach((el) => el.classList.toggle('theme-dark', isDark));
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    root.dataset.theme = isDark ? 'dark' : 'light';
    root.style.colorScheme = isDark ? 'dark' : 'light';

    themeToggleIcons.forEach((icon) => {
      icon.classList.toggle('bi-moon-stars', !isDark);
      icon.classList.toggle('bi-sun', isDark);
    });
  };

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('theme');
  applyTheme(storedTheme ?? (prefersDark ? 'dark' : 'light'));

  themeToggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextMode = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
      applyTheme(nextMode);
    });
  });

  /**
   * Prefetch next pages on hover/focus to reduce navigation delay.
   */
  const canPrefetch = (() => {
    try {
      const link = document.createElement('link');
      if (link.relList && link.relList.supports && link.relList.supports('prefetch')) return true;
    } catch (e) {
      return true; // assume support if detection fails (older browsers)
    }
    return true; // fall back to attempting prefetch
  })();
  const prefetchCache = new Set();

  const prefetchLink = (href, anchor) => {
    if (!href || href.startsWith('#')) return;
    if (anchor && anchor.dataset.noPrefetch === 'true') return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (['mailto:', 'tel:'].includes(url.protocol)) return;
    const samePage = url.pathname === window.location.pathname && url.search === window.location.search;
    if (samePage) return;
    const normalized = url.href;
    if (prefetchCache.has(normalized)) return;

    prefetchCache.add(normalized);
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = normalized;
    link.as = 'document';
    document.head.appendChild(link);
  };

  if (canPrefetch) {
    document.querySelectorAll('a[href]').forEach((anchor) => {
      const handler = () => prefetchLink(anchor.href, anchor);
      anchor.addEventListener('pointerenter', handler, { once: true });
      anchor.addEventListener('focus', handler, { once: true });
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();