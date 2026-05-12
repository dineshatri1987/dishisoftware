import { useEffect, useRef } from 'react';

export function Cursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || reduced) {
      ring.classList.add('is-hidden');
      dot.classList.add('is-hidden');
      return;
    }

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    };

    const onEnter = (el: Element) => () => {
      void el;
      ring.classList.add('is-hover');
    };
    const onLeave = () => ring.classList.remove('is-hover');

    const onDocLeave = () => {
      ring.classList.add('is-hidden');
      dot.classList.add('is-hidden');
    };
    const onDocEnter = () => {
      ring.classList.remove('is-hidden');
      dot.classList.remove('is-hidden');
    };

    const loop = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      ring.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onDocLeave);
    document.addEventListener('mouseenter', onDocEnter);
    raf = requestAnimationFrame(loop);

    const targets = document.querySelectorAll<HTMLElement>(
      'a, button, [data-cursor="hover"], .pill, .service-card, .work-card'
    );
    const enterHandlers: Array<() => void> = [];
    targets.forEach((el) => {
      const h = onEnter(el);
      enterHandlers.push(h);
      el.addEventListener('mouseenter', h);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onDocLeave);
      document.removeEventListener('mouseenter', onDocEnter);
      targets.forEach((el, i) => {
        el.removeEventListener('mouseenter', enterHandlers[i]);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
