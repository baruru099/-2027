{
    // 1. コールバック関数の作成
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contentVisible();
                backgroundVisible();
                observer.unobserve(entry.target);
            }
        });
    };

    // 2. オプションの設定
    const options = {
        root: null,
        rootMargin: '-100px 0px 0px 0px',
        threshold: 0.8
    };

    // 3. Observerのインスタンス化
    const observer = new IntersectionObserver(callback, options);

    // 4. 監視する要素を指定
    const target = document.querySelector('.content');
    if (target) {
        observer.observe(target);
    }
    function contentVisible() {
        // .content 内の a 要素を一括取得（内部の img も要素の親子関係から参照）
        const contents = document.querySelectorAll('.content div > a');

        contents.forEach((content, index) => {
            const img = content.querySelector('img');

            setTimeout(() => {
                content.classList.add('is-active');
                if (img) {
                    setTimeout(() => {
                        img.classList.add('is-active');
                    }, 400);
                }
            }, index * 300);
        });
    }
}

//ミドナントカラー取得
/**
 * 画像の平均色（RGB）を取得し、指定したCSS変数に適用する関数
 * @param {HTMLImageElement|null} imgElement - 対象のimg要素
 * @param {string} cssVarName - 設定するCSS変数名
 */
function setAverageColorToCSSVar(imgElement, cssVarName) {
    if (!imgElement) return;

    // キャンバスは再利用（または毎回最小限で生成）
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    canvas.width = 50;
    canvas.height = 50;

    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let r = 0, g = 0, b = 0;
    const totalPixels = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }

    const avgR = Math.round(r / totalPixels);
    const avgG = Math.round(g / totalPixels);
    const avgB = Math.round(b / totalPixels);

    document.documentElement.style.setProperty(
        cssVarName,
        `rgb(${avgR}, ${avgG}, ${avgB})`
    );
}

// ターゲット要素とCSS変数のマッピング
const imageVarMap = [
    { id: 'first_content_img', varName: '--first-dominant-color' },
    { id: 'second_content_img', varName: '--second-dominant-color' },
    { id: 'third_content_img', varName: '--third-dominant-color' }
];

imageVarMap.forEach(({ id, varName }) => {
    const img = document.getElementById(id);
    setAverageColorToCSSVar(img, varName);
});

function backgroundVisible() {
    setTimeout(() => {
        const bg = document.querySelector('.content');
        bg.classList.add('is-active');
    }, 900);
}