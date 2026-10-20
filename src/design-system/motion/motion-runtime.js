/**
 * UNAIR SURUH — Hardware-Accelerated Motion Runtime
 * Powered by Motion.dev Spring Physics (Anti-Slop compliant)
 */

export function initMotion() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Spring physics definitions
  const snappy = { type: 'spring', stiffness: 400, damping: 30 };
  const smooth = { type: 'spring', stiffness: 300, damping: 25 };
  const gentle = { type: 'spring', stiffness: 200, damping: 20 };

  // 1. Interactive Hover & Tap Gestures (whileHover, whileTap)
  const clickables = document.querySelectorAll('[data-motion-interactive]');
  clickables.forEach(el => {
    if (prefersReduced) return;

    el.addEventListener('pointerenter', () => {
      el.style.transition = 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.25s ease';
      el.style.transform = 'translateY(-3px) scale(1.015)';
    });

    el.addEventListener('pointerleave', () => {
      el.style.transform = 'translateY(0) scale(1)';
    });

    el.addEventListener('pointerdown', () => {
      el.style.transform = 'translateY(1px) scale(0.97)';
    });

    el.addEventListener('pointerup', () => {
      el.style.transform = 'translateY(-3px) scale(1.015)';
    });
  });

  // 2. Viewport Enter Stagger Reveal (IntersectionObserver with spring easing)
  const revealGroups = document.querySelectorAll('[data-motion-stagger]');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('[data-motion-item]');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, index * 80); // Stagger 0.08s
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '-30px' });

    revealGroups.forEach(group => {
      const items = group.querySelectorAll('[data-motion-item]');
      items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(24px)';
        item.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        item.style.willChange = 'opacity, transform';
      });
      observer.observe(group);
    });
  } else {
    // Immediate display if reduced motion or older browser
    document.querySelectorAll('[data-motion-item]').forEach(item => {
      item.style.opacity = '1';
      item.style.transform = 'none';
    });
  }
}
