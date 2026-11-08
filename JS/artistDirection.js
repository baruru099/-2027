(() => {
  const parent = document.querySelector('.artist_container');
  if (!parent) {
    console.warn('.artist_container が見つかりませんでした');
    return;
  }

  const targets = Array.from(parent.querySelectorAll('a'));
  const lines = [
    parent,
    document.getElementById('second_line'),
    document.getElementById('third_line'),
    document.getElementById('fourth_line')
  ].filter(Boolean);

  const ITEMS_PER_LINE = 3;
  const FADE_DELAY_MS = 100;

  let maxVisibleIndex = 0;
  let activeIndex = 0;

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function revealCards() {
    while (activeIndex < maxVisibleIndex && activeIndex < targets.length) {
      const target = targets[activeIndex];
      target.classList.add('is-active');
      activeIndex++;
      await sleep(FADE_DELAY_MS);
    }
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lineIndex = lines.indexOf(entry.target);
        if (lineIndex !== -1) {
          const targetLimit = (lineIndex + 1) * ITEMS_PER_LINE;
          if (targetLimit > maxVisibleIndex) {
            maxVisibleIndex = targetLimit;
            revealCards();
          }
        }
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -200px 0px'
  });

  lines.forEach(line => observer.observe(line));

  // ランダムな傾きと位置のズレの適用
  document.addEventListener('DOMContentLoaded', () => {
    targets.forEach(card => {
      const randomRotate = (Math.random() * 6 - 3).toFixed(1);
      const randomX = (Math.random() * 10 - 5).toFixed(1);
      const randomY = (Math.random() * 10 - 5).toFixed(1);

      card.style.setProperty('--random-rotate', `${randomRotate}deg`);
      card.style.setProperty('--random-x', `${randomX}px`);
      card.style.setProperty('--random-y', `${randomY}px`);

      card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
    });
  });
})();