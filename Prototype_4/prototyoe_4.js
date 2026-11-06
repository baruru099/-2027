(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const momentSection = document.querySelector('.moment-section');
    const cards = [...document.querySelectorAll('.moment-card')];
    const currentCount = document.querySelector('.progress-current');
    const progressBar = document.querySelector('.progress-track i');
    const revealTargets = document.querySelectorAll(
        '.story h2, .story-copy, .invitation-inner, .info-layout'
    );

    if ('IntersectionObserver' in window && !reducedMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        revealTargets.forEach(target => {
            target.setAttribute('data-reveal', '');
            revealObserver.observe(target);
        });
    }

    if (reducedMotion || !momentSection || cards.length === 0) return;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    let ticking = false;

    const updateDeck = () => {
        const sectionBounds = momentSection.getBoundingClientRect();
        const scrollRange = momentSection.offsetHeight - window.innerHeight;
        const progress = clamp(-sectionBounds.top / scrollRange, 0, 1);
        const position = progress * cards.length;
        const activeIndex = Math.min(Math.floor(position), cards.length - 1);

        cards.forEach((card, index) => {
            const distance = position - index;
            let x = 0;
            let y = 0;
            let rotation = (index % 2 === 0 ? -3 : 3) * Math.max(cards.length - index - 1, 0);
            let scale = 1 - Math.max(cards.length - index - 1, 0) * 0.025;
            let opacity = 1;

            if (distance >= 1) {
                x = window.innerWidth * 1.15;
                y = -window.innerHeight * 0.08;
                rotation += 12;
                opacity = 0;
            } else if (distance >= 0) {
                x = window.innerWidth * 1.15 * distance;
                y = -window.innerHeight * 0.08 * distance;
                rotation += 12 * distance;
                opacity = 1 - distance * 0.15;
                scale = 1;
            } else {
                const depth = Math.abs(distance);
                y = Math.min(depth, cards.length) * 15;
                rotation = (index % 2 === 0 ? -3 : 3) * depth;
                scale = 1 - Math.min(depth, cards.length) * 0.035;
            }

            card.style.setProperty('--card-x', `${x}px`);
            card.style.setProperty('--card-y', `${y}px`);
            card.style.setProperty('--card-r', `${rotation}deg`);
            card.style.setProperty('--card-s', scale);
            card.style.setProperty('--card-o', opacity);
            card.setAttribute('aria-hidden', index === activeIndex ? 'false' : 'true');
        });

        if (currentCount) {
            currentCount.textContent = String(activeIndex + 1).padStart(2, '0');
        }
        if (progressBar) {
            progressBar.style.width = `${((activeIndex + 1) / cards.length) * 100}%`;
        }

        ticking = false;
    };

    const requestDeckUpdate = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(updateDeck);
    };

    window.addEventListener('scroll', requestDeckUpdate, { passive: true });
    window.addEventListener('resize', requestDeckUpdate);
    updateDeck();
})();
