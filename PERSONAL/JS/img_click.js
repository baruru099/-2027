const galleryOverlay = document.querySelector('.gallery-overlay img');
const galleryBtn = document.querySelectorAll('.gallery-item');

for (let index = 0; index < galleryBtn.length; index++) {
    galleryBtn[index].addEventListener('click', () => {
        const clickedImg = galleryBtn[index].querySelector('img');
        galleryOverlay.src = clickedImg.src;
        galleryOverlay.parentElement.classList.add('is-active');
    });
}
galleryOverlay.parentElement.addEventListener('click', () => {
    galleryOverlay.parentElement.classList.remove('is-active');
})