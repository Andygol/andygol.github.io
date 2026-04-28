import React from "react";
import { createRoot } from "react-dom/client";

function NavToggle({ menuId, menuLabel, closeLabel }) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const highlightRef = React.useRef(null);

  React.useEffect(() => {
    const menu = document.getElementById(menuId);
    if (!menu) {
      return;
    }

    menu.classList.toggle("nav-menu--open", open);

    if (!open) {
      if (highlightRef.current) {
        highlightRef.current.remove();
        highlightRef.current = null;
      }
      return;
    }

    // Roving highlight
    const highlight = document.createElement("span");
    highlight.className = "nav-menu-highlight";
    highlight.setAttribute("aria-hidden", "true");
    menu.insertBefore(highlight, menu.firstChild);
    highlightRef.current = highlight;

    const moveHighlight = (link) => {
      const menuRect = menu.getBoundingClientRect();
      const li = link.closest("li") || link;
      const liRect = li.getBoundingClientRect();
      highlight.style.top = `${liRect.top - menuRect.top}px`;
      highlight.style.height = `${liRect.height}px`;
      highlight.style.opacity = "1";
    };

    const handleMouseOver = (e) => {
      const link = e.target.closest(".nav-link");
      if (link && menu.contains(link)) {
        moveHighlight(link);
      }
    };

    const handleMouseLeave = () => {
      highlight.style.opacity = "0";
    };

    menu.addEventListener("mouseover", handleMouseOver);
    menu.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      menu.removeEventListener("mouseover", handleMouseOver);
      menu.removeEventListener("mouseleave", handleMouseLeave);
      if (highlightRef.current) {
        highlightRef.current.remove();
        highlightRef.current = null;
      }
    };
  }, [menuId, open]);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event) => {
      if (event.matches) {
        setOpen(false);
      }
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    const menu = document.getElementById(menuId);
    const handlePointerDown = (event) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (menu?.contains(target) || buttonRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [menuId, open]);

  return (
    <button
      ref={buttonRef}
      type="button"
      className="nav-toggle-btn"
      onClick={() => setOpen((value) => !value)}
      aria-expanded={open}
      aria-controls={menuId}
      aria-label={open ? closeLabel : menuLabel}
    >
      <i className={open ? "fa-solid fa-xmark" : "fa-solid fa-bars"} aria-hidden="true" />
    </button>
  );
}

const rootElement = document.getElementById("react-nav-toggle");

if (rootElement) {
  const menuId = rootElement.dataset.menuId || "primary-menu";
  const menuLabel = rootElement.dataset.menuLabel || "Menu";
  const closeLabel = rootElement.dataset.closeLabel || "Close";
  createRoot(rootElement).render(<NavToggle menuId={menuId} menuLabel={menuLabel} closeLabel={closeLabel} />);
}
