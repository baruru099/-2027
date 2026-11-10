const customEasing = (t) => 1 - Math.pow(1 - t, 4);

(() => {
  const scrollTop = document.getElementById('scroll_top');
  const target = document.querySelector('.concept h2');

  // 1. トップに戻るボタン
  if (scrollTop) {
    scrollTop.addEventListener('click', () => {
      if (window.lenis) {
        window.lenis.scrollTo(0, {
          duration: 1.4,          // 時間（秒）
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
  { btnId: 'concept_btn', targetSelector: '.concept', offset: 0 },
  { btnId: 'artist_btn', targetSelector: '.artist', offset: 0 },
  { btnId: 'content_btn', targetSelector: '.content', offset: 0 },
  { btnId: 'overview_btn', targetSelector: '.overview', offset: 0 }
];

navBtn.forEach(({ btnId, targetSelector, offset }) => {
  const btn = document.getElementById(btnId);
  const element = document.querySelector(targetSelector);

  if (btn && element) {
    btn.addEventListener('click', () => {
      if (window.lenis) {
        // Lenisで目的の要素までスクロール
        window.lenis.scrollTo(element, {
          offset: offset, // ヘッダー固定時のズレ調整などに使用可能
          duration: 1.2,   // スクロールにかける時間（秒）
          easing: customEasing
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});