const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-site-nav]');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!isOpen));
    menuButton.setAttribute('aria-expanded', String(!isOpen));
  });
}

const yearTarget = document.querySelector('[data-year]');
if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}

// Discord banner scroll behavior
const discordBanner = document.querySelector('.discord-banner');
let lastScrollTop = window.scrollY || 0;
let isTicking = false;

if (discordBanner) {
  const minimumDelta = 10;
  const hideAfter = 140;

  const updateBannerState = () => {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    const delta = currentScroll - lastScrollTop;

    if (Math.abs(delta) >= minimumDelta) {
      if (delta > 0 && currentScroll > hideAfter) {
        discordBanner.classList.add('hidden');
      } else if (delta < 0) {
        discordBanner.classList.remove('hidden');
      }
      lastScrollTop = currentScroll;
    }

    isTicking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!isTicking) {
        window.requestAnimationFrame(updateBannerState);
        isTicking = true;
      }
    },
    { passive: true }
  );
}
