(() => {
  const scrollTop = document.getElementById('scroll_top');
  const target = document.querySelector('.concept h2');

  if (!scrollTop) return;

  if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
    gsap.registerPlugin(ScrollToPlugin);

    scrollTop.addEventListener('click', () => {
      gsap.to(window, {
        duration: 2,
        scrollTo: 0,
        ease: 'expo.out'
      });
    });
  }

  if (target) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 交差しているか、またはスクロール位置がターゲットより下にある場合にアクティブ化
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

//各スクロールボタン
const navBtn = [
  { btnId: 'concept_btn', targetSelector: '.concept', block: 'start' },
  { btnId: 'artist_btn', targetSelector: '.artist', block: 'start' },
  { btnId: 'content_btn', targetSelector: '.content', block: 'center' },
  { btnId: 'overview_btn', targetSelector: '.overview', block: 'start' }
]
navBtn.forEach(({ btnId, targetSelector, block }) => {
  const btn = document.getElementById(btnId);
  const element = document.querySelector(targetSelector);
  if (btn && element) {
      btn.addEventListener('click', () => {
        element.scrollIntoView({ behavior: 'smooth', block });
      });
    }
});