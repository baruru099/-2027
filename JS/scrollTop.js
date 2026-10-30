gsap.registerPlugin(ScrollToPlugin);

const scrollTop = document.getElementById('scroll_top');

scrollTop.addEventListener('click', () => {
    gsap.to(window, {
        duration: 2,
        scrollTo: 0,
        ease: "expo.out"
    });
});

const target = document.querySelector('.concept h2');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const rect = entry.target.getBoundingClientRect();

        if (entry.isIntersecting || rect.top < 0) {
            scrollTop.classList.add('is-active');
        } else {
            scrollTop.classList.remove('is-active');
        }
    });
}, {
    rootMargin: '0px 0px -100px 0px'
});

observer.observe(target);