// Floating "back to top" button — shown once the user has scrolled down a
// bit, since the Home grid holds ~250 country cards and can get long.
import { useEffect, useRef, useState } from "react";

import { useLanguage } from "../context/LanguageContext";

const SHOW_AFTER_PX = 400;
const SCROLL_DURATION_MS = 500;

// Ease-out cubic: fast start, gentle landing.
function easeOutCubic(progress) {
  return 1 - Math.pow(1 - progress, 3);
}

function BackToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const rafIdRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cancel any in-flight scroll animation if the button unmounts mid-scroll.
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  function scrollToTop() {
    const startY = window.scrollY;
    if (startY === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // Self-driven rAF animation instead of the browser's native smooth
    // scroll. Native smooth scroll (whether via CSS scroll-behavior or the
    // {behavior:"smooth"} option) is an animation that unfolds over time,
    // and on a long scroll (many rows down, since this page can be very
    // tall) it takes long enough that leftover trackpad/wheel momentum has
    // time to fight and interrupt it before it finishes — exactly why this
    // used to only fail after scrolling down a lot. Here we recompute and
    // re-assert the authoritative position every single frame (an instant,
    // synchronous jump each time), so momentum can't win: it gets overwritten
    // on the very next frame, ~16ms later, every time, regardless of distance.
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    let startTime = null;
    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / SCROLL_DURATION_MS, 1);
      const eased = easeOutCubic(progress);
      window.scrollTo({ top: startY * (1 - eased), behavior: "instant" });

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(step);
      } else {
        // Force the exact final position — avoids any float-rounding short-fall.
        window.scrollTo({ top: 0, behavior: "instant" });
        rafIdRef.current = null;
      }
    }
    rafIdRef.current = requestAnimationFrame(step);
  }

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " visible" : ""}`}
      onClick={scrollToTop}
      aria-label={t("backToTop")}
      title={t("backToTop")}
      tabIndex={visible ? 0 : -1}
    >
      🌏
    </button>
  );
}

export default BackToTop;
