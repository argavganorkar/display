document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.getElementById('cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // --- GENERIC FADE IN OBSERVER ---
    // Works for Home Page sections AND new Meme Page sections
    const observerOptions = {
        threshold: 0.15 // Trigger slightly earlier
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Target Home Page sections
    const homeSections = document.querySelectorAll('#why-this-exists, #display-details');
    homeSections.forEach(section => fadeObserver.observe(section));

    // Target Meme Page sections (New Class)
    const memeSections = document.querySelectorAll('.meme-static-section');
    memeSections.forEach(section => fadeObserver.observe(section));


    // --- HOME PAGE: Invite Animation ---
    const inviteSection = document.getElementById('invite');

    if (inviteSection) {
        const line1 = document.getElementById('line-1');
        const line2 = document.getElementById('line-2');
        const line3 = document.getElementById('line-3');

        const inviteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => line1.classList.add('active'), 0);
                    setTimeout(() => line2.classList.add('active'), 800);
                    setTimeout(() => line3.classList.add('active'), 1600);
                }
            });
        }, { threshold: 0.5 });

        inviteObserver.observe(inviteSection);
    }

    // --- SHARED: Rigorous Shake ---
    const allImages = document.querySelectorAll('img:not(.bg-img):not(.hero-visual)');

    allImages.forEach(el => {
        el.addEventListener('mousemove', () => {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const rot = (Math.random() - 0.5) * 10;
            el.style.translate = `${x}px ${y}px`;
            el.style.rotate = `${rot}deg`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.translate = '0px 0px';
            el.style.rotate = '0deg';
        });
    });

    // --- SHARED: Text Decode/Hacker Effect ---
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    document.querySelectorAll("h1, h2, .site-title").forEach(element => {
        element.dataset.value = element.innerText;
        element.addEventListener("mouseover", event => {
            let iteration = 0;
            let interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return event.target.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");
                if (iteration >= event.target.dataset.value.length) {
                    clearInterval(interval);
                }
                iteration += 1 / 3;
            }, 30);
        });
    });

    // --- HOME PAGE: Hero Parallax ---
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            heroVisual.style.transform = `translate(-50%, calc(-50% + ${scrollValue * 0.5}px))`;
        });
    }

    // --- HOME PAGE: Click Accordion (Display Details) ---
    // Specifically targets #display-details to avoid conflicts
    const clickAccRows = document.querySelectorAll('#display-details .accordion-row');
    if (clickAccRows.length > 0) {
        clickAccRows.forEach(row => {
            const header = row.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                const isActive = row.classList.contains('active');

                // Collapse all others
                clickAccRows.forEach(otherRow => {
                    if (otherRow !== row) {
                        otherRow.classList.remove('active');
                        otherRow.querySelector('.accordion-content').style.maxHeight = null;
                    }
                });

                // Toggle current
                if (!isActive) {
                    row.classList.add('active');
                    const content = row.querySelector('.accordion-content');
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    row.classList.remove('active');
                    row.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
        });
    }

});
