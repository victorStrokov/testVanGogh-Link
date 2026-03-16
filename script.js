const menuButton = document.querySelector('.hamburger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const desktopMenuLinks = Array.from(document.querySelectorAll('.menu-link'));
const mobileMenuLinks = Array.from(
  document.querySelectorAll('.mobile-menu__link'),
);
const isHamburgerViewport = () =>
  window.matchMedia('(max-width: 900px)').matches;

const normalizeMenuLabel = (value) =>
  value.replace(/\s+/g, ' ').trim().toLowerCase();

const setActiveMenuItem = (label) => {
  const normalizedLabel = normalizeMenuLabel(label);

  desktopMenuLinks.forEach((link) => {
    const isActive =
      normalizeMenuLabel(link.textContent ?? '') === normalizedLabel;
    link.classList.toggle('menu-link--active', isActive);
  });

  mobileMenuLinks.forEach((link) => {
    const isActive =
      normalizeMenuLabel(link.textContent ?? '') === normalizedLabel;
    link.classList.toggle('mobile-menu__link--active', isActive);
  });
};

const initialActiveLink =
  desktopMenuLinks.find((link) =>
    link.classList.contains('menu-link--active'),
  ) ??
  mobileMenuLinks.find((link) =>
    link.classList.contains('mobile-menu__link--active'),
  );

if (initialActiveLink instanceof HTMLAnchorElement) {
  setActiveMenuItem(initialActiveLink.textContent ?? '');
}

desktopMenuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setActiveMenuItem(link.textContent ?? '');
  });
});

mobileMenuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setActiveMenuItem(link.textContent ?? '');
  });
});

const setMenuState = (isOpen) => {
  if (!(menuButton instanceof HTMLButtonElement)) {
    return;
  }

  menuButton.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute(
    'aria-label',
    isOpen ? 'Закрыть меню' : 'Открыть меню',
  );

  if (mobileMenu instanceof HTMLElement) {
    mobileMenu.hidden = !isOpen;
  }
};

if (menuButton instanceof HTMLButtonElement) {
  menuButton.addEventListener('click', () => {
    if (!isHamburgerViewport()) {
      return;
    }

    const isOpen = menuButton.classList.contains('is-open');
    setMenuState(!isOpen);
  });

  window.addEventListener('resize', () => {
    if (!isHamburgerViewport()) {
      setMenuState(false);
    }
  });

  if (mobileMenu instanceof HTMLElement) {
    mobileMenu.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        setMenuState(false);
      }
    });
  }

  setMenuState(false);
}
