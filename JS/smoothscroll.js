// Lenisの初期化
const lenis = new Lenis({
  duration: 1, // 展示の雰囲気に合わせて少しゆったりめ（1.0〜1.2）もおすすめ
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});
// windowオブジェクトにLenisインスタンスをバインドする（これで他のJSから参照可能になる）
window.lenis = lenis;

// GSAP ScrollTriggerが読み込まれている場合、Lenisのスクロールイベントと同期させる
if (typeof ScrollTrigger !== 'undefined') {
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
} else {
  // GSAPがない場合の通常のraf
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}