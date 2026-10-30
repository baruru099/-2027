const parent = document.querySelector('.artist_container');
const secondLine = document.getElementById('second_line');
const thirdLine = document.getElementById('third_line');
const fourthLine = document.getElementById('fourth_line');
let linenum = 0;
if (!parent) {
  console.warn('.artist_container が見つかりませんでした');
} else {
  const targets = parent.querySelectorAll('a');
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function main() {
    let number = 0;
    for(const target of targets) {
        number ++;
        if(number > 3 && linenum === 1) {
            break;
        }
        if(number > 6 && linenum === 2) {
            break;
        }
        if(number > 9 && linenum === 3) {
            break;
        }
        if(number > 12 && linenum === 4) {
            break;
        }
        target.classList.add('is-active');
        await sleep(100);
    }
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        linenum ++;
        main();
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -200px 0px'
  });

  observer.observe(parent);
  observer.observe(secondLine);
  observer.observe(thirdLine);
  observer.observe(fourthLine);
}

// JS/artistDirection.js またはスクリプトの末尾に追加

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.artist_container a');

  cards.forEach(card => {
    // -3deg 〜 +3deg の範囲でランダムな角度を生成
    const randomRotate = (Math.random() * 6 - 3).toFixed(1);
    
    // -5px 〜 +5px の範囲で上下左右のわずかな位置ズレを生成
    const randomX = (Math.random() * 10 - 5).toFixed(1);
    const randomY = (Math.random() * 10 - 5).toFixed(1);

    // カスタムプロパティ（CSS変数）として保持させる
    card.style.setProperty('--random-rotate', `${randomRotate}deg`);
    card.style.setProperty('--random-x', `${randomX}px`);
    card.style.setProperty('--random-y', `${randomY}px`);
    
    // 初期状態のtransformを設定
    card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
  });
});