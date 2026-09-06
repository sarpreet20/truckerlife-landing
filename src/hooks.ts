import { useEffect, useRef, useState } from "react";

/** prefers-reduced-motion */
export function usePRM(): boolean {
  const [prm, setPrm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrm(mq.matches);
    const fn = (e: MediaQueryListEvent) => setPrm(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return prm;
}

/** IntersectionObserver visibility */
export function useInView<T extends HTMLElement>(threshold = 0.18, once = true) {
  const ref = useRef<T | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setOn(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setOn(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return { ref, on };
}

/** animated counter, returns formatted string */
export function useCountUp(
  target: number,
  on: boolean,
  opts: { duration?: number; decimals?: number; prefix?: string; suffix?: string } = {}
): string {
  const { duration = 1700, decimals = 0, prefix = "", suffix = "" } = opts;
  const prm = usePRM();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!on) return;
    if (prm) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, target, duration, prm]);
  const num = val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${num}${suffix}`;
}

/** current scroll past a threshold */
export function useScrolled(threshold = 24): boolean {
  const [s, setS] = useState(false);
  useEffect(() => {
    const fn = () => setS(window.scrollY > threshold);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return s;
}
