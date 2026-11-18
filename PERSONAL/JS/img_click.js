{
    // === 定数・設定 ===
    const CONFIG = {
        fadeDelay: 100,
        buttonDelay: 400,
        closeImgDelay: 300,
        closeOverlayDelay: 690,
        swipeThreshold: 30
    };

    const GALLERY_IMAGE_MAP = {
        'IMAGE/Fumi/ふみゅ_刹那展1.webp': 'IMAGE/Fumi/ふみゅ_刹那展1_.webp',
        'IMAGE/Fumi/ふみゅ_刹那展2.webp': 'IMAGE/Fumi/ふみゅ_刹那展2_.webp',
        'IMAGE/Fumi/ふみゅ_刹那展3.webp': 'IMAGE/Fumi/ふみゅ_刹那展3_.webp'
    };

    // === DOM要素の取得 ===
    const elements = {
        overlay: document.querySelector('.gallery-overlay'),
        overlayImg: document.querySelector('.gallery-overlay img'),
        items: document.querySelectorAll('.gallery-item'),
        backBtn: document.querySelector('.back-btn'),
        nextBtn: document.querySelector('.next-btn'),
        overlayBtn: document.getElementById('overlay-btn')
    };

    // === 状態管理 ===
    let currentIndex = -1;
    let touchStartX = 0;
    let isSingleTouch = false;

    // === ヘルパー関数 ===
    function getFullImageSrc(item) {
        const thumbnailSrc = item.querySelector('img')?.getAttribute('src');
        return GALLERY_IMAGE_MAP[thumbnailSrc];
    }

    /**
     * 指定した方向（+1: 次へ, -1: 前へ）に画像を切り替える
     */
    function navigateGallery(direction) {
        if (currentIndex === -1) return;

        const total = elements.items.length;
        currentIndex = (currentIndex + direction + total) % total;
        elements.overlayImg.src = getFullImageSrc(elements.items[currentIndex]);
    }

    /**
     * ギャラリーモーダルを開く
     */
    function openGallery(index, fullSrc) {
        currentIndex = index;
        elements.overlayImg.src = fullSrc;

        document.body.classList.add('no-scroll');
        elements.overlay.classList.add('is-active');

        elements.overlayImg.decode()
            .then(() => {
                setTimeout(() => {
                    elements.overlayImg.classList.add('is-active');
                }, CONFIG.fadeDelay);

                setTimeout(() => {
                    elements.backBtn.classList.add('is-active');
                    elements.nextBtn.classList.add('is-active');
                }, CONFIG.buttonDelay);
            })
            .catch((err) => {
                console.error('デコードまたは読み込みに失敗:', err);
            });
    }

    /**
     * ギャラリーモーダルを閉じる
     */
    function closeGallery() {
        currentIndex = -1;
        elements.backBtn.classList.remove('is-active');
        elements.nextBtn.classList.remove('is-active');
        document.body.classList.remove('no-scroll');

        setTimeout(() => {
            elements.overlayImg.classList.remove('is-active');
        }, CONFIG.closeImgDelay);

        setTimeout(() => {
            elements.overlay.classList.remove('is-active');
            elements.overlayBtn?.classList.remove('is-zoomed');
        }, CONFIG.closeOverlayDelay);
    }

    // === イベントリスナーの登録 ===
    // サムネイルクリックでモーダルを開く
    elements.items.forEach((item, index) => {
        item.addEventListener('click', () => {
            const fullSrc = getFullImageSrc(item);
            if (!fullSrc) return;
            openGallery(index, fullSrc);
        });
    });

    // 前後ボタン操作
    elements.nextBtn.addEventListener('click', () => navigateGallery(1));
    elements.backBtn.addEventListener('click', () => navigateGallery(-1));

    // 背景クリックで閉じる
    elements.overlay.addEventListener('click', (e) => {
        if (e.target === elements.overlay) {
            closeGallery();
        }
    });

    // スワイプ操作
    elements.overlayBtn.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isSingleTouch = true
            touchStartX = e.touches[0].pageX;
        }else {
            isSingleTouch = false;
        }
    }, { passive: true });

    elements.overlayBtn.addEventListener('touchmove', (e) => {
        if (e.touches.length >= 2) {
            isSingleTouch = false;
        }
    }, {passive: true})

    elements.overlayBtn.addEventListener('touchend', (e) => {
        if (!isSingleTouch || e.touches.length > 0) {
            return;
        }

        const diffX = e.changedTouches[0].pageX - touchStartX;
        if (Math.abs(diffX) <= CONFIG.swipeThreshold) return;

        // 右スワイプ(diffX > 0)で「前へ(-1)」、左スワイプで「次へ(+1)」
        navigateGallery(diffX > 0 ? -1 : 1);
    }, { passive: true });
}