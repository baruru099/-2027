{
    const overlay = document.querySelector('.gallery-overlay');
    const zoomBtn = document.getElementById('overlay-btn')
    
    let animationId; // 連打時の重複防止用

    zoomBtn.addEventListener('click', () => {
        const isMobileWidth = window.matchMedia('(max-width: 767px)').matches;
        if (!isMobileWidth) {
            zoomBtn.classList.toggle('is-zoomed');

            // 前回のアニメーションが動いていたらキャンセル
            cancelAnimationFrame(animationId);

            const duration = 300; // CSSの transition (0.3s) と合わせる
            const startTime = performance.now();

            function keepCenter(currentTime) {
                // 現在のサイズに合わせて常に中央を計算（縮小して余白がなくなれば自動で0になる）
                overlay.scrollTop = (overlay.scrollHeight - overlay.clientHeight) / 2;
                overlay.scrollLeft = (overlay.scrollWidth - overlay.clientWidth) / 2;

                if (currentTime - startTime < duration) {
                    animationId = requestAnimationFrame(keepCenter);
                }
            }

            animationId = requestAnimationFrame(keepCenter);
        }
    });
}