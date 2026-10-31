document.addEventListener('DOMContentLoaded', () => {
    // 1. GSAPプラグインの有効化
    gsap.registerPlugin(ScrollTrigger);

    const imgElements = Array.from(document.querySelectorAll('.hero_view img'));
    if (imgElements.length === 0) return;

    // 画像ランダム切り替え処理
    const imagePool = imgElements.map(img => ({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt')
    }));

    function scheduleNextUpdate(img) {
        const randomDelay = Math.floor(Math.random() * 5000) + 5000;

        setTimeout(() => {
            img.classList.add('fade-out');

            setTimeout(() => {
                const currentSrc = img.getAttribute('src');
                const availableImages = imagePool.filter(item => item.src !== currentSrc);
                const nextImage = availableImages.length > 0 
                    ? availableImages[Math.floor(Math.random() * availableImages.length)]
                    : imagePool[Math.floor(Math.random() * imagePool.length)];

                if (nextImage.src !== null) img.setAttribute('src', nextImage.src);
                if (nextImage.alt !== null) img.setAttribute('alt', nextImage.alt);

                img.classList.remove('fade-out');
                scheduleNextUpdate(img);
            }, 500);
        }, randomDelay);
    }

    imgElements.forEach(img => {
        scheduleNextUpdate(img);
    });

    // 2. 列（カラム）ごとのパララックス移動
    imgElements.forEach((img, i) => {
        const colIndex = i % 5;
        
        // .content が覆いかぶさるまでの移動距離を考慮し、パララックス移動量を少し大きめに設定
        const yDistances = [-350, 300, -500, 250, -400];
        const targetY = yDistances[colIndex] || -300;

        gsap.to(img, {
            y: targetY,
            rotation: (colIndex % 2 === 0 ? 3 : -3),
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero_scroll_wrapper',
                endTrigger: '.content', // .contentを終わりの対象に設定
                start: 'top top',
                end: 'top top',         // .contentの上端が画面の一番上（top）に来るまで動かす
                scrub: 1
            }
        });
    });

    // 3. スクロール速度に連動した歪み（Skew）演出
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".hero_view img", "skewY", "deg"),
        clamp = gsap.utils.clamp(-8, 8);

    ScrollTrigger.create({
        trigger: ".hero_scroll_wrapper",
        endTrigger: ".content", // 同様に .content を終点指定
        start: "top top",
        end: "top top",
        onUpdate: (self) => {
            let skew = clamp(self.getVelocity() / -300);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
                proxy.skew = skew;
                gsap.to(proxy, {
                    skew: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    overwrite: true,
                    onUpdate: () => skewSetter(proxy.skew)
                });
            }
        }
    });
});