(() => {
    //fadeする要素をリスト化
    const fadeTargets = [
        '.about',
        '.artists',
        '.info',
        '.access'
    ]

    const targets = document.querySelectorAll(fadeTargets.join(', '));

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 画面内に要素が入ったらクラスを付与
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // 1度表示されたら監視を解除
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.25 // 要素の25%が見えたら発火
    });

    targets.forEach(target => {
        target.classList.add('fade_in');
        fadeObserver.observe(target);
    });
})();