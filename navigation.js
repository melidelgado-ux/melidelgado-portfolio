(() => {
  const header = document.querySelector(".site-header");
  const desktopNav = header?.querySelector(":scope > .nav");
  const desktopLanguage = header?.querySelector(":scope > .language-switch");
  const desktopCta = header?.querySelector(":scope > .nav-cta");
  const brand = header?.querySelector(":scope > .brand");

  if (!header || !desktopNav || !desktopLanguage || !desktopCta || !brand) return;

  const toggle = document.createElement("button");
  toggle.className = "mobile-menu-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Abrir menú de navegación");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "mobile-navigation");
  toggle.innerHTML = '<span></span><span></span><span></span>';

  const menu = document.createElement("div");
  menu.className = "mobile-menu";
  menu.id = "mobile-navigation";
  menu.hidden = true;

  const nav = desktopNav.cloneNode(true);
  nav.className = "mobile-menu-nav";
  nav.setAttribute("aria-label", "Navegación mobile");

  const homeLink = document.createElement("a");
  homeLink.href = "index.html#top";
  homeLink.textContent = "Inicio";
  const isHome = /(?:^|\/)index\.html$/.test(window.location.pathname) || window.location.pathname.endsWith("/");
  if (isHome) homeLink.setAttribute("aria-current", "page");
  nav.prepend(homeLink);

  const language = desktopLanguage.cloneNode(true);
  language.className = "language-switch mobile-language-switch";
  language.setAttribute("aria-label", "Selector de idioma");
  language.innerHTML =
    '<button type="button" data-language="es" aria-pressed="true">Español</button>' +
    '<button type="button" data-language="en" aria-pressed="false">English</button>';

  const cta = desktopCta.cloneNode(true);
  cta.className = "nav-cta mobile-menu-cta";

  menu.append(nav, language, cta);
  header.append(toggle, menu);

  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú de navegación");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    menu.hidden = isOpen;
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Abrir menú de navegación" : "Cerrar menú de navegación");
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!menu.hidden && !header.contains(event.target)) closeMenu();
  });
})();
