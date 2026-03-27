document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Floating Hearts Background Generator --- */
    const createHearts = () => {
        const container = document.getElementById('hearts-container');
        if (!container) return;
        
        // Number of hearts
        const heartCount = 20;

        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('bg-heart');
            
            // Randomize position, size and delay
            const left = Math.random() * 100;
            const size = Math.random() * (1.5 - 0.5) + 0.5;
            const delay = Math.random() * 10;
            const duration = Math.random() * (15 - 8) + 8; // Between 8s and 15s

            heart.style.left = `${left}%`;
            heart.style.transform = `scale(${size}) rotate(-45deg)`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.animationDuration = `${duration}s`;

            container.appendChild(heart);
        }
    };

    createHearts();


    /* --- 2. Page Navigation Handling --- */
    const navigateTo = (url) => {
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    };

    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', () => navigateTo('wishes.html'));
    }

    const toJourneyBtn = document.getElementById('toJourneyBtn');
    if (toJourneyBtn) {
        toJourneyBtn.addEventListener('click', () => navigateTo('journey.html'));
    }

    const toMemoriesBtn = document.getElementById('toMemoriesBtn');
    if (toMemoriesBtn) {
        toMemoriesBtn.addEventListener('click', () => navigateTo('memories.html'));
    }


    /* --- 3. Scroll Reveal Animation for Journey Page Timeline --- */
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => observer.observe(item));
    }


    /* --- 4. The Finale: Little Hands with Flowers & Pink Heart Burst --- */
    const finaleBtn = document.getElementById('finaleBtn');
    const finaleStage = document.getElementById('finaleStage');

    const createPinkBurst = () => {
        const container = document.getElementById('hearts-container');
        if (!container) return;
        
        const burstCount = 60; // Increased amount for a continuous stream

        for (let i = 0; i < burstCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('bg-heart', 'pink-burst');
            
            const left = Math.random() * 100;
            const size = Math.random() * (2.2 - 0.8) + 0.8;
            const duration = Math.random() * (3.5 - 2) + 2;
            const delay = Math.random() * 3; // Hearts pop up over a 3-second window

            heart.style.left = `${left}%`;
            heart.style.transform = `scale(${size}) rotate(-45deg)`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.bottom = '-100px';

            container.appendChild(heart);
            
            // Clean up the DOM after the animation completes
            setTimeout(() => { heart.remove(); }, (duration + delay) * 1000 + 500);
        }
    };

    if (finaleBtn && finaleStage) {
        finaleBtn.addEventListener('click', () => {
            finaleStage.classList.add('active');
            finaleBtn.style.display = 'none'; // hide button once clicked
            
            // FIRE THE HEART BURST
            createPinkBurst();

            const bdayText = document.getElementById('birthdayText');
            if (bdayText) {
                // Fade in text shortly after hands start rising
                setTimeout(() => {
                    bdayText.classList.add('show');
                }, 500);
            }

            const hbdAudio = document.getElementById('hbdAudio');
            if (hbdAudio) {
                hbdAudio.volume = 0.6; // Aesthetic gentle volume
                hbdAudio.play().catch(e => console.log("User interaction required for audio"));
            }

            // Smoothly scroll down so they see the hands popping up
            setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }, 100);

            // Sequence:
            // Hands pop up immediately.
            // Wait 5.5 seconds, fade them out, then show the final photo.
            setTimeout(() => {
                const hands = document.getElementById('cssHands');
                const photo = document.getElementById('finalPhoto');
                
                if(hands) hands.classList.add('fade-out-down');
                if(bdayText) bdayText.classList.add('fade-out-up');
                
                setTimeout(() => {
                    if(photo) photo.classList.add('show');

                    // Beautifully fade out the tune and pause it after the photo appears
                    if (hbdAudio) {
                        let fadeAudio = setInterval(() => {
                            if (hbdAudio.volume > 0.05) {
                                hbdAudio.volume -= 0.05;
                            } else {
                                hbdAudio.pause();
                                clearInterval(fadeAudio);
                            }
                        }, 100); // Fades out completely over roughly 1.2 seconds
                    }

                }, 1000); // 1.0s after hands start fading, making total wait 6.5s before picture full visibility

            }, 5500); // 5.5 seconds displaying hands and playing tune
        });
    }

    /* --- 5. Exit Sequence --- */
    const exitBtn = document.getElementById('exitBtn');
    const exitScreen = document.getElementById('exitScreen');

    if (exitBtn && exitScreen) {
        // Show exit screen and update browser history
        exitBtn.addEventListener('click', () => {
            exitScreen.classList.add('show');
            // Add a new state to history so the 'Back' button stays on this page
            history.pushState({ overlay: 'exit' }, '', '#exit');
        });

        // Listen for the browser back button
        window.addEventListener('popstate', () => {
            // If the exit screen is showing, hide it when 'Back' is clicked
            if (exitScreen.classList.contains('show')) {
                exitScreen.classList.remove('show');
            }
        });
    }

});