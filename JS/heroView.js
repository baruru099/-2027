(() => {
  const heroView = document.querySelector('.hero_view');
  if (!heroView) return;

  setTimeout(() => {
    heroView.classList.add('visible');
  }, 500);

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.hero_view', {
      yPercent: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero_view',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
})();