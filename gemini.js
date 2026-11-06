document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. オープニングローダー
    // ----------------------------------------------------
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.loader_progress');
    let progress = 0;

    const timer = setInterval(() => {
        progress += 4;
        if (progressBar) progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(timer);
            gsap.to(loader, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: () => {
                    loader.style.display = 'none';
                    initAnimations();
                    initParticles();
                }
            });
        }
    }, 30);

    // ----------------------------------------------------
    // 2. カスタムカーソルの連動
    // ----------------------------------------------------
    const dot = document.querySelector('.cursor-dot');
    const follower = document.querySelector('.cursor-follower');
    const cards = document.querySelectorAll('.artist_card');
    const navLinks = document.querySelectorAll('.header_nav a, .site_header .header_logo, .sns_links a');

    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0 });
            gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.18, ease: 'power2.out' });
        });

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => follower.classList.add('hovered'));
            card.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
        });

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => follower.classList.add('nav-hover'));
            link.addEventListener('mouseleave', () => follower.classList.remove('nav-hover'));
        });
    }

    // ----------------------------------------------------
    // 3. アーティストカードの角度ランダム付与
    // ----------------------------------------------------
    cards.forEach(card => {
        const randomRotate = (Math.random() * 5 - 2.5).toFixed(1);
        const randomX = (Math.random() * 8 - 4).toFixed(1);
        const randomY = (Math.random() * 8 - 4).toFixed(1);

        card.style.setProperty('--random-rotate', `${randomRotate}deg`);
        card.style.setProperty('--random-x', `${randomX}px`);
        card.style.setProperty('--random-y', `${randomY}px`);
    });

    // ----------------------------------------------------
    // 4. GSAP スクロール・リッチアニメーション
    // ----------------------------------------------------
    function initAnimations() {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        // ヒーロータイトルの1文字ずつの立ち上がり演出
        gsap.from('.hero_title .char', {
            opacity: 0,
            y: 60,
            rotateX: -45,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.2
        });

        // サブタイトルのフェードイン
        gsap.from('.hero_subtitle, .scroll_indicator', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power2.out',
            delay: 0.8
        });

        // ヒーロー背景画像のスクロールパララックス
        gsap.to('.hero_img_wrapper img', {
            yPercent: 18,
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero_view',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // セクションタイトル・本文のアニメーション
        gsap.utils.toArray('.concept, .artist, .overview').forEach(section => {
            gsap.from(section.querySelectorAll('.section_label, h2, .concept_text, .artist_card, .overview_list'), {
                opacity: 0,
                y: 35,
                duration: 1,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // ナビゲーションのアンカースムーズスクロール
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    e.preventDefault();
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        gsap.to(window, {
                            duration: 1.2,
                            scrollTo: { y: targetEl, offsetY: 40 },
                            ease: 'power3.inOut'
                        });
                    }
                }
            });
        });

        // トップに戻るボタン
        const scrollTopBtn = document.getElementById('scroll_top');
        if (scrollTopBtn) {
            ScrollTrigger.create({
                trigger: '.concept',
                start: 'top center',
                onEnter: () => scrollTopBtn.classList.add('is-active'),
                onLeaveBack: () => scrollTopBtn.classList.remove('is-active')
            });

            scrollTopBtn.addEventListener('click', () => {
                gsap.to(window, { duration: 1.2, scrollTo: 0, ease: 'power3.inOut' });
            });
        }

        ScrollTrigger.refresh();
    }

    // ----------------------------------------------------
    // 5. 背景浮遊粒子（Canvas Particles）
    // ----------------------------------------------------
    function initParticles() {
        const canvas = document.getElementById('particle_canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = Array.from({ length: 40 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.8 + 0.4,
            vy: -Math.random() * 0.4 - 0.1,
            vx: (Math.random() - 0.5) * 0.2,
            alpha: Math.random() * 0.6 + 0.2
        }));

        function render() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.y += p.vy;
                p.x += p.vx;

                if (p.y < 0) p.y = height;
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.fill();
            });

            requestAnimationFrame(render);
        }

        render();
    }
});