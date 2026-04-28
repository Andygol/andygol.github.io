(() => {
  const STORAGE_KEY = "theme-preference";
  const VALID_THEMES = ["light", "dark", "system"];
  const ICON_BY_THEME = {
    light: "fa-regular fa-sun",
    dark: "fa-regular fa-moon",
    system: "fa-solid fa-desktop",
  };

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function getStoredPreference() {
    const value = localStorage.getItem(STORAGE_KEY);
    return VALID_THEMES.includes(value) ? value : "system";
  }

  function resolveTheme(preference) {
    if (preference === "system") {
      return mediaQuery.matches ? "dark" : "light";
    }

    return preference;
  }

  function applyTheme(preference) {
    const resolvedTheme = resolveTheme(preference);

    document.documentElement.setAttribute("data-theme-preference", preference);
    document.documentElement.setAttribute("data-theme", resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme;
    document.dispatchEvent(
      new CustomEvent("themechange", {
        detail: { preference, theme: resolvedTheme },
      }),
    );
  }

  function updateCurrentIcons(preference) {
    const iconClass = ICON_BY_THEME[preference] || ICON_BY_THEME.system;

    document.querySelectorAll("[data-theme-current-icon]").forEach((icon) => {
      const className = `${iconClass} theme-switcher__icon`;

      // Font Awesome renders <i> into <svg>; replacing marker element forces re-render.
      if (icon instanceof SVGElement && icon.parentElement) {
        const marker = document.createElement("i");
        marker.setAttribute("data-theme-current-icon", "");
        marker.setAttribute("aria-hidden", "true");
        marker.className = className;
        icon.replaceWith(marker);
        return;
      }

      icon.className = className;
    });
  }

  function updateSwitchers(preference) {
    document.querySelectorAll(".theme-switcher").forEach((switcher) => {
      const options = switcher.querySelectorAll("[data-theme-value]");
      const current = switcher.querySelector("[data-theme-current]");
      let activeOption = null;

      options.forEach((option) => {
        const active = option.dataset.themeValue === preference;
        option.classList.toggle("is-active", active);
        option.setAttribute("aria-checked", active ? "true" : "false");

        if (active) {
          activeOption = option;
        }
      });

      if (activeOption && current) {
        current.textContent = activeOption.dataset.themeLabel;
      }

    });

    updateCurrentIcons(preference);
  }

  function setPreference(preference) {
    const value = VALID_THEMES.includes(preference) ? preference : "system";
    localStorage.setItem(STORAGE_KEY, value);
    applyTheme(value);
    updateSwitchers(value);
  }

  function initOutsideMenuDismissal() {
    document.addEventListener("pointerdown", (event) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      document.querySelectorAll(".theme-switcher[open], .lang-switcher[open]").forEach((menu) => {
        if (!menu.contains(target)) {
          menu.removeAttribute("open");
        }
      });
    });
  }

  function initThemeSwitchers() {
    const preference = getStoredPreference();
    applyTheme(preference);
    updateSwitchers(preference);
    initOutsideMenuDismissal();

    document.querySelectorAll(".theme-switcher [data-theme-value]").forEach((button) => {
      button.addEventListener("click", () => {
        setPreference(button.dataset.themeValue);
        const details = button.closest("details");
        if (details) {
          details.removeAttribute("open");
        }
      });
    });
  }

  mediaQuery.addEventListener("change", () => {
    const preference = getStoredPreference();
    if (preference === "system") {
      applyTheme(preference);
      updateSwitchers(preference);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeSwitchers);
  } else {
    initThemeSwitchers();
  }
})();
