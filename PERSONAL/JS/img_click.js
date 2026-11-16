const galleryOverlayImg = document.querySelector('.gallery-overlay img');
const galleryOverlay = document.querySelector('.gallery-overlay');
const galleryItems = document.querySelectorAll('.gallery-item');
const delay = 100;
const GALLERY_IMAGE_MAP = {
    'IMAGE/Fumi/ふみゅ_刹那展1.webp': 'IMAGE/Fumi/ふみゅ_刹那展1_.webp',
    'IMAGE/Fumi/ふみゅ_刹那展2.webp': 'IMAGE/Fumi/ふみゅ_刹那展2_.webp',
    'IMAGE/Fumi/ふみゅ_刹那展3.webp': 'IMAGE/Fumi/ふみゅ_刹那展3_.webp'
};

function getFullImageSrc(item) {
    const thumbnailSrc = item.querySelector('img')?.getAttribute('src');
    return GALLERY_IMAGE_MAP[thumbnailSrc];
}

galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        const fullSrc = getFullImageSrc(item);
        if (!fullSrc) return;
        document.body.classList.add('no-scroll')

        galleryOverlayImg.src = fullSrc;
        galleryOverlay.classList.add('is-active');
        setTimeout(() => {
            galleryOverlayImg.classList.add('is-active');
        }, delay);
    });
});

galleryOverlay.addEventListener('click', (e) => {
    if (e.target !== galleryOverlay) {
        return;
    }
    galleryOverlayImg.classList.remove('is-active');
    document.body.classList.remove('no-scroll')
    setTimeout(() => {
        galleryOverlay.classList.remove('is-active');
        document.getElementById('overlay-btn').classList.remove('is-zoomed')
    }, 390);
});