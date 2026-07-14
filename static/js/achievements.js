/* ==========================================================================
   ACHIEVEMENTS PAGE — full-page scroll system (mirrors events.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Count-up for hero stats ── */
    function animateCount(el) {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();
        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    /* ── Scroll story system ── */
    const story    = document.querySelector('.ach-story');
    const slides   = Array.from(document.querySelectorAll('.ach-slide'));
    const progress = document.querySelector('.ach-progress');

    if (!story || slides.length === 0 || !progress) return;

    let currentIndex    = 0;
    let isAnimating     = false;
    let touchStartY     = 0;
    let countsDone      = false;
    const animDuration  = 950;
    const wheelThresh   = 28;
    const swipeThresh   = 42;

    /* Build dot navigation */
    slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', slide.dataset.slideLabel || `Slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        progress.appendChild(dot);
    });

    const dots = Array.from(progress.querySelectorAll('button'));

    function getNearestSlideIndex() {
        const viewMid = window.scrollY + window.innerHeight / 2;
        return slides.reduce((nearest, slide, i) => {
            const slideMid   = slide.offsetTop + slide.offsetHeight / 2;
            const nearestMid = slides[nearest].offsetTop + slides[nearest].offsetHeight / 2;
            return Math.abs(slideMid - viewMid) < Math.abs(nearestMid - viewMid) ? i : nearest;
        }, 0);
    }

    function setActiveSlide(index, direction = 0) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            slide.classList.toggle('exiting-up',   direction > 0 && i === currentIndex && i !== index);
            slide.classList.toggle('exiting-down',  direction < 0 && i === currentIndex && i !== index);
        });
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));

        /* Trigger count-up once hero slide becomes active */
        if (index === 0 && !countsDone) {
            countsDone = true;
            document.querySelectorAll('.ach-count').forEach(animateCount);
        }
    }

    function clearExitStates() {
        slides.forEach(slide => slide.classList.remove('exiting-up', 'exiting-down'));
    }

    function updateProgressVisibility() {
        const rect = story.getBoundingClientRect();
        const visible = rect.bottom > 120 && rect.top < window.innerHeight - 120;
        progress.classList.toggle('hidden', !visible);
    }

    function goToSlide(index) {
        const next = Math.max(0, Math.min(index, slides.length - 1));
        if (next === currentIndex || isAnimating) return;

        const direction = next > currentIndex ? 1 : -1;
        isAnimating = true;
        setActiveSlide(next, direction);

        slides[next].scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
            currentIndex = next;
            clearExitStates();
            isAnimating = false;
        }, animDuration);
    }

    function canControlScroll(deltaY) {
        const rect = story.getBoundingClientRect();
        const within = rect.top <= 2 && rect.bottom >= window.innerHeight - 2;
        const upFromFirst  = currentIndex === 0 && deltaY < 0;
        const downFromLast = currentIndex === slides.length - 1 && deltaY > 0;
        return within && !upFromFirst && !downFromLast;
    }

    /* Wheel */
    window.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) < wheelThresh || isAnimating) return;
        currentIndex = getNearestSlideIndex();
        if (!canControlScroll(e.deltaY)) return;
        e.preventDefault();
        goToSlide(currentIndex + (e.deltaY > 0 ? 1 : -1));
    }, { passive: false });

    /* Touch */
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (isAnimating || !touchStartY) return;
        const deltaY = touchStartY - e.touches[0].clientY;
        if (Math.abs(deltaY) < swipeThresh) return;
        currentIndex = getNearestSlideIndex();
        if (!canControlScroll(deltaY)) return;
        e.preventDefault();
        goToSlide(currentIndex + (deltaY > 0 ? 1 : -1));
        touchStartY = 0;
    }, { passive: false });

    /* Keyboard */
    window.addEventListener('keydown', (e) => {
        const next = ['ArrowDown', 'PageDown', ' '];
        const prev = ['ArrowUp', 'PageUp'];
        if (![...next, ...prev].includes(e.key) || isAnimating) return;
        currentIndex = getNearestSlideIndex();
        const dir = next.includes(e.key) ? 1 : -1;
        if (!canControlScroll(dir)) return;
        e.preventDefault();
        goToSlide(currentIndex + dir);
    });

    /* Scroll observer (passive sync) */
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting || entry.intersectionRatio < 0.58) return;
            const i = slides.indexOf(entry.target);
            if (i < 0) return;
            currentIndex = i;
            setActiveSlide(i);
        });
    }, { threshold: [0.58] });

    slides.forEach(slide => slideObserver.observe(slide));

    window.addEventListener('scroll', updateProgressVisibility, { passive: true });

    /* Init */
    setActiveSlide(0);
    updateProgressVisibility();
    /* Kick off count-up immediately for hero */
    document.querySelectorAll('.ach-count').forEach(animateCount);
    countsDone = true;
});
