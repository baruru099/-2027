const customEasing = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
let winHeight = window.innerHeight;
window.addEventListener('resize', () => {
  winHeight = window.innerHeight;
}, { passive: true });

const navBtn = [
  { btnId: 'works-btn', targetSelector: '.works', block: 'start', offset: 0 },
  { btnId: 'about-btn', targetSelector: '.about', block: 'start', offset: 0 },
  { btnId: 'contact-btn', targetSelector: '.contact', block: 'start', offset: 0 }
];

navBtn.forEach(({ btnId, targetSelector, block, offset }) => {
  const btn = document.getElementById(btnId);
  const element = document.querySelector(targetSelector);

  if (btn && element) {
    btn.addEventListener('click', () => {
      if (window.lenis) {
        const targetY = calculateTargetY(element, block, offset)
        // Lenisで目的の要素までスクロール
        window.lenis.scrollTo(targetY, {
          duration: getDuration(targetY),   // スクロールにかける時間（秒）
          easing: customEasing
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: block });
      }
    });
  }
});


//Duration計算
function getDuration(targetY) {
  const currentY = window.lenis? window.lenis.scroll: window.scrollY;
  const distance = Math.abs(targetY - currentY);
  const value = 1 + (distance / winHeight) * 0.3;
  const result = Math.min(Math.max(value, 1), 2);
  return result
}

//スクロール位置の計算
function calculateTargetY(element, block, offset) {
  const currentScroll = window.lenis ? window.lenis.scroll : window.scrollY;
  const rect = element.getBoundingClientRect();
  
  let targetY = rect.top + currentScroll;

  if (block === 'center') {
    targetY -= (winHeight / 2) - (rect.height / 2);
  }

  return targetY + offset;
}