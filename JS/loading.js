const textElement = document.querySelector('.text');
const loadingOverlay = document.querySelector('.loading_overlay');
if (textElement && loadingOverlay) {
    document.body.classList.add('no-scroll');
    // 一文字ずつ分解
    textElement.innerHTML = [...textElement.textContent.trim()]
        .map((char, index) => `<span class="char" style="--char-index: ${index}">${char}</span>`)
        .join('');
    setTimeout(() => {
        // 浮き上がらせる
        textElement.classList.add('is-active');
    }, 300);
    window.addEventListener('load', () => {
        console.log('ページとすべてのリソースの読み込みが完了しました');
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