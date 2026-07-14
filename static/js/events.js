document.addEventListener('DOMContentLoaded', () => {
    const story = document.querySelector('.events-story');
    const slides = Array.from(document.querySelectorAll('.event-slide'));
    const progress = document.querySelector('.event-progress');

    if (!story || slides.length === 0 || !progress) return;

    /* ── Identify the hero slide (first non-past slide) ── */
    const heroIndex = slides.findIndex(s => !s.dataset.past);
    const startIndex = heroIndex >= 0 ? heroIndex : 0;

    let currentIndex = startIndex;
    let isAnimating = false;
    let touchStartY = 0;
    const animationDuration = 950;
    const wheelThreshold = 28;
    const swipeThreshold = 42;

    /* ── Build progress dots ── */
    slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', slide.dataset.slideLabel || `Event slide ${index + 1}`);
        if (slide.dataset.past) dot.classList.add('past');
        dot.addEventListener('click', () => goToSlide(index));
        progress.appendChild(dot);
    });

    const dots = Array.from(progress.querySelectorAll('button'));

    /* ── Scroll to hero on page load — always land here ── */
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    /* Immediate jump (before paint) */
    const heroSlide = slides[startIndex];
    if (heroSlide) {
        document.documentElement.style.scrollBehavior = 'auto';
        heroSlide.scrollIntoView({ behavior: 'instant', block: 'start' });
        /* Second pass after layout is stable */
        requestAnimationFrame(() => {
            heroSlide.scrollIntoView({ behavior: 'instant', block: 'start' });
            document.documentElement.style.scrollBehavior = '';
        });
    }
    setActiveSlide(startIndex);

    /* ── "Scroll up for past events" button ── */
    const pastBtn = document.getElementById('scroll-to-past');
    if (pastBtn) {
        pastBtn.addEventListener('click', () => {
            // go to the slide just before the hero (most recent past event)
            if (heroIndex > 0) {
                goToSlide(heroIndex - 1);
            }
        });
    }

    /* ── Helpers ── */
    function getNearestSlideIndex() {
        const viewportMiddle = window.scrollY + window.innerHeight / 2;
        return slides.reduce((nearest, slide, index) => {
            const slideMiddle = slide.offsetTop + slide.offsetHeight / 2;
            const nearestMiddle = slides[nearest].offsetTop + slides[nearest].offsetHeight / 2;
            return Math.abs(slideMiddle - viewportMiddle) < Math.abs(nearestMiddle - viewportMiddle) ? index : nearest;
        }, 0);
    }

    function setActiveSlide(index, direction = 0) {
        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle('active', slideIndex === index);
            slide.classList.toggle('exiting-up', direction > 0 && slideIndex === currentIndex && slideIndex !== index);
            slide.classList.toggle('exiting-down', direction < 0 && slideIndex === currentIndex && slideIndex !== index);
        });

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === index);
        });

        /* Show / hide the past-events-cue depending on current position */
        const cue = document.querySelector('.past-events-cue');
        if (cue) {
            cue.style.opacity = index <= heroIndex ? '1' : '0';
            cue.style.pointerEvents = index <= heroIndex ? 'auto' : 'none';
        }
    }

    function clearExitStates() {
        slides.forEach(slide => {
            slide.classList.remove('exiting-up', 'exiting-down');
        });
    }

    function updateProgressVisibility() {
        const storyRect = story.getBoundingClientRect();
        const isVisible = storyRect.bottom > 120 && storyRect.top < window.innerHeight - 120;
        progress.classList.toggle('hidden', !isVisible);
    }

    function goToSlide(index) {
        const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
        if (nextIndex === currentIndex || isAnimating) return;

        const direction = nextIndex > currentIndex ? 1 : -1;
        isAnimating = true;
        setActiveSlide(nextIndex, direction);

        slides[nextIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        window.setTimeout(() => {
            currentIndex = nextIndex;
            clearExitStates();
            isAnimating = false;
        }, animationDuration);
    }

    function canControlScroll(deltaY) {
        const storyRect = story.getBoundingClientRect();
        const withinStory = storyRect.top <= 2 && storyRect.bottom >= window.innerHeight - 2;
        const movingUpFromFirst = currentIndex === 0 && deltaY < 0;
        const movingDownFromLast = currentIndex === slides.length - 1 && deltaY > 0;
        return withinStory && !movingUpFromFirst && !movingDownFromLast;
    }

    /* ── Event listeners ── */
    window.addEventListener('wheel', (event) => {
        if (Math.abs(event.deltaY) < wheelThreshold || isAnimating) return;
        currentIndex = getNearestSlideIndex();

        if (!canControlScroll(event.deltaY)) return;

        event.preventDefault();
        goToSlide(currentIndex + (event.deltaY > 0 ? 1 : -1));
    }, { passive: false });

    window.addEventListener('touchstart', (event) => {
        touchStartY = event.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (event) => {
        if (isAnimating || !touchStartY) return;

        const touchY = event.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        if (Math.abs(deltaY) < swipeThreshold) return;

        currentIndex = getNearestSlideIndex();
        if (!canControlScroll(deltaY)) return;

        event.preventDefault();
        goToSlide(currentIndex + (deltaY > 0 ? 1 : -1));
        touchStartY = 0;
    }, { passive: false });

    window.addEventListener('keydown', (event) => {
        const nextKeys = ['ArrowDown', 'PageDown', ' '];
        const previousKeys = ['ArrowUp', 'PageUp'];
        if (![...nextKeys, ...previousKeys].includes(event.key) || isAnimating) return;

        currentIndex = getNearestSlideIndex();
        const direction = nextKeys.includes(event.key) ? 1 : -1;
        if (!canControlScroll(direction)) return;

        event.preventDefault();
        goToSlide(currentIndex + direction);
    });

    window.addEventListener('scroll', updateProgressVisibility, { passive: true });

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting || entry.intersectionRatio < 0.58) return;
            const index = slides.indexOf(entry.target);
            if (index < 0) return;
            currentIndex = index;
            setActiveSlide(index);
        });
    }, { threshold: [0.58] });

    slides.forEach(slide => slideObserver.observe(slide));
    updateProgressVisibility();
});
