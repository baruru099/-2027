const heroView = document.querySelector('.hero_view')
setTimeout(() => {
    heroView.classList.add('visible');
}, 500);

gsap.registerPlugin(ScrollTrigger);

// 背景要素のy軸（縦方向）の位置をスクロールに合わせてずらす
gsap.to(".hero_view", {
    yPercent: -80, // スクロールに伴って画像の位置を30%下に引っ張る（遅らせる）
    ease: "none",
    scrollTrigger: {
        trigger: ".hero_view",
        start: "top top",
        end: "bottom top",
        scrub: true // スクロールにピタッと追従させる
    }
});