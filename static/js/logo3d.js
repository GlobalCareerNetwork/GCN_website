/* ==========================================================================
   INTERACTIVE GCN GLOBE MARK — whole logo tilts as one unit
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('logo3d-container');
    const inner = document.getElementById('logo3d-inner');
    if (!container || !inner) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let targetRotateX = 8;
    let targetRotateY = -12;
    let targetRotateZ = -4;
    let rotateX = targetRotateX;
    let rotateY = targetRotateY;
    let rotateZ = targetRotateZ;
    let rafId = null;

    const defaultRotateX = 8;
    const defaultRotateY = -12;
    const defaultRotateZ = -4;
    const maxTiltX = 34;
    const maxTiltY = 46;
    const maxSpin = 18;

    function applyTransform() {
        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    }

    function animate() {
        rotateX += (targetRotateX - rotateX) * 0.16;
        rotateY += (targetRotateY - rotateY) * 0.16;
        rotateZ += (targetRotateZ - rotateZ) * 0.14;
        applyTransform();
        rafId = requestAnimationFrame(animate);
    }

    function updateTilt(clientX, clientY) {
        const rect = container.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width - 0.5;
        const y = (clientY - rect.top) / rect.height - 0.5;
        targetRotateY = defaultRotateY + x * maxTiltY * 2;
        targetRotateX = defaultRotateX - y * maxTiltX * 2;
        targetRotateZ = defaultRotateZ + x * maxSpin;
    }

    function resetTilt() {
        targetRotateX = defaultRotateX;
        targetRotateY = defaultRotateY;
        targetRotateZ = defaultRotateZ;
    }

    container.addEventListener('mousemove', (event) => {
        if (prefersReducedMotion) return;
        updateTilt(event.clientX, event.clientY);
    });

    container.addEventListener('mouseleave', resetTilt);

    container.addEventListener('touchmove', (event) => {
        if (prefersReducedMotion || !event.touches.length) return;
        updateTilt(event.touches[0].clientX, event.touches[0].clientY);
    }, { passive: true });

    container.addEventListener('touchend', resetTilt);

    applyTransform();
    if (!prefersReducedMotion) {
        animate();
    }

    window.addEventListener('beforeunload', () => {
        if (rafId) cancelAnimationFrame(rafId);
    });
});
