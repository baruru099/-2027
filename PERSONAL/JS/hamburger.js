document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const overlay = document.querySelector('.hamburger-overlay');
    const menuItems = overlay.querySelectorAll('a, button');

    // メニューの開閉切り替え
    hamburgerBtn.addEventListener('click', () => {
        const isActive = hamburgerBtn.classList.toggle('is-active');
        overlay.classList.toggle('is-active');
        document.body.classList.toggle('no-scroll', isActive);
        hamburgerBtn.setAttribute('aria-expanded', isActive);
    });

    // メニュー内のリンク・ボタンを押したら閉じる
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburgerBtn.classList.remove('is-active');
            overlay.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        });
    });
});