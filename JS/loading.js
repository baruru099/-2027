const textElement = document.querySelector('.text');
const loadingOverlay = document.querySelector('.loading_overlay');

if (textElement && loadingOverlay) {
    if (sessionStorage.getItem('isLoaded')) {
        // すでに訪問済みの場合は、ローディング要素を即座に非表示にして処理を終了
        loadingOverlay.style.display = 'none';
    } else {
        // 初回訪問時のみローディング処理を実行
        sessionStorage.setItem('isLoaded', 'true');
        document.body.classList.add('no-scroll');
    };
    // 一文字ずつ分解
    textElement.innerHTML = [...textElement.textContent.trim()]
        .map((char, index) => `<span class="char" style="--char-index: ${index}">${char}</span>`)
        .join('');
    setTimeout(() => {
        // 浮き上がらせる
        textElement.classList.add('is-active');
    }, 300);
    window.addEventListener('load', () => {
        // 3秒後に元に戻す（下に隠す）
        setTimeout(() => {
            textElement.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        }, 1500);
        setTimeout(() => {
            removeOverlay();
        }, 2400);
    });
}
function removeOverlay() {
    loadingOverlay.classList.add('is-remove');
}