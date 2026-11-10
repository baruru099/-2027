// 1. コールバック関数の作成
const callback = (entries, observer) => {
    entries.forEach(entry => {
        // entry.isIntersecting で画面内に入ったかを判定
        if (entry.isIntersecting) {
            inkVisible();
            // 一度だけ発火させたい場合は監視を解除
            observer.unobserve(entry.target);
        }
    });
};

// 2. オプションの設定（省略可能）
const options = {
    root: null, // ビューポート（画面全体）を基準にする
    // 上・右・下・左 の順で判定エリアを縮小・拡大する
    rootMargin: '0px',
    threshold: 0.6 // 要素が判定エリアに1ピクセルでも入ったら発火
};

// 3. Observerのインスタンス化
const observer = new IntersectionObserver(callback, options);

// 4. 監視する要素を指定
const target = document.querySelector('.concept');
observer.observe(target);

function inkVisible() {
    const inks = document.querySelectorAll('.ink_container img');
    
    // 発火させたい「インデックスの順番」を定義 (0番目 → 2番目 → 1番目)
    const order = [1, 3, 7, 2, 5, 4, 6, 0];
    
    const initialDelay = 300; // スタートまでの待ち時間
    const interval = 100;     // 次の要素を表示するまでの間隔

    // 順番を定義した配列をループ処理
    order.forEach((targetIndex, step) => {
        // 対象の要素が存在する場合のみ処理
        if (inks[targetIndex]) {
            setTimeout(() => {
                inks[targetIndex].classList.add('is-visible');
            }, initialDelay + (step * interval));
        }
    });
}