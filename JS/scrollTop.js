const customEasing = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
let winHeight = window.innerHeight;
window.addEventListener('resize', () => {
  winHeight = window.innerHeight;
  console.log(window.innerHeight);
}, { passive: true });

(() => {
  const scrollTop = document.getElementById('scroll_top');
  const target = document.querySelector('.concept h2');

  // 1. トップに戻るボタン
  if (scrollTop) {
    scrollTop.addEventListener('click', () => {
      if (window.lenis) {
        window.lenis.scrollTo(0, {
          duration: getDuration(0),          // 時間（秒）
          easing: customEasing    // イージング関数を指定
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

    });
  }

  // トップ戻りボタンの表示・非表示の監視（IntersectionObserver）
  if (target && scrollTop) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          scrollTop.classList.add('is-active');
        } else {
          scrollTop.classList.remove('is-active');
        }
      });
    }, {
      rootMargin: '0px 0px -100px 0px'
    });

    observer.observe(target);
  }
})();

// 2. 各ナビゲーションボタンの遷移処理
const navBtn = [
  { btnId: 'concept_btn', targetSelector: '.concept', block: 'start', offset: 0 },
  { btnId: 'artist_btn', targetSelector: '.artist', block: 'start', offset: 0 },
  { btnId: 'content_btn', targetSelector: '.content', block: 'center', offset: 0 },
  { btnId: 'overview_btn', targetSelector: '.overview', block: 'start', offset: 0 }
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