const overlayContainer = document.querySelector('.gallery-overlay');
const galleryOverlay = overlayContainer.querySelector('img');
const galleryContainer = document.querySelector('.gallery-list');

// 1. 単一オブジェクトにして O(1) で高速アクセス
const galleryImgMap = {
    'IMAGE/Fumi/ふみゅ_刹那展1.webp': 'IMAGE/Fumi/ふみゅ_刹那展1_.webp',
    'IMAGE/Fumi/ふみゅ_刹那展2.webp': 'IMAGE/Fumi/ふみゅ_刹那展2_.webp',
    'IMAGE/Fumi/ふみゅ_刹那展3.webp': 'IMAGE/Fumi/ふみゅ_刹那展3_.webp'
};

let hoverTimer = null;
const preloadedSet = new Set(); // 読み込み済み画像のキャッシュ記録

// 通信節約モードかどうかを判定
const isSaveData = () => {
    const conn = navigator.connection;
    return Boolean(conn && (conn.saveData || (conn.effectiveType && conn.effectiveType !== '4g')));
};

// 画像を事前読み込み＆デコードする関数
function preloadImage(src) {
    if (!src || preloadedSet.has(src)) return;
    const img = new Image();
    img.src = src;
    // デコードまで裏で完了させておき、表示時のチラつきをなくす
    if (img.decode) {
        img.decode().then(() => preloadedSet.add(src)).catch(() => {});
    } else {
        preloadedSet.add(src);
    }
}

// 2. イベント委譲（親要素1つにイベントを集約）
if (galleryContainer) {
    // ホバー開始（マウス操作時のみ反応させる場合は pointerType === 'mouse' を確認）
    galleryContainer.addEventListener('pointerover', (e) => {
        if (e.pointerType !== 'mouse' || isSaveData()) return;
        
        const item = e.target.closest('.gallery-item');
        if (!item || item.contains(e.relatedTarget)) return; // 子要素間の移動は無視

        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
            const thumbSrc = item.querySelector('img')?.getAttribute('src');
            const highResSrc = galleryImgMap[thumbSrc];
            if (highResSrc) {
                preloadImage(highResSrc);
                galleryOverlay.src = highResSrc;
            }
        }, 1500);
    });

    // ホバー解除
    galleryContainer.addEventListener('pointerout', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item || item.contains(e.relatedTarget)) return;

        clearTimeout(hoverTimer);
        hoverTimer = null;
    });

    // クリック時
    galleryContainer.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;

        clearTimeout(hoverTimer);
        const thumbSrc = item.querySelector('img')?.getAttribute('src');
        const highResSrc = galleryImgMap[thumbSrc];

        if (highResSrc && galleryOverlay.getAttribute('src') !== highResSrc) {
            galleryOverlay.src = highResSrc;
        }
        overlayContainer.classList.add('is-active');
    });
}

// オーバーレイを閉じる
overlayContainer.addEventListener('click', () => {
    overlayContainer.classList.remove('is-active');
});