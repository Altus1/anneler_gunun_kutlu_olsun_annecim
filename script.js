document.addEventListener('DOMContentLoaded', () => {
    const envelopeBtn = document.getElementById('envelope-btn');
    const revealContainer = document.getElementById('reveal-container');
    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('mom-video');

    envelopeBtn.addEventListener('click', () => {
        // Start animation sequence
        envelopeBtn.classList.add('open');
        
        // Trigger confetti
        const duration = 4000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            // Hearts and Flowers (using pink and red colors)
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#fb7185', '#9f1239', '#f43f5e', '#ffffff'],
                shapes: ['circle', 'heart'],
                scalar: randomInRange(0.8, 1.2)
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#fb7185', '#9f1239', '#f43f5e', '#ffffff'],
                shapes: ['circle', 'heart'],
                scalar: randomInRange(0.8, 1.2)
            });
        }, 250);

        // Sequence after 4 seconds
        setTimeout(() => {
            // Fade out reveal section
            revealContainer.classList.add('hidden');
            
            // Prepare video section
            videoContainer.classList.remove('hidden');
            
            // Short delay to ensure 'hidden' class removal takes effect before opacity change
            setTimeout(() => {
                videoContainer.classList.add('active');
                
                // Autoplay video
                video.play().catch(error => {
                    console.log("Autoplay was prevented. User interaction might be required for audio.", error);
                    // Most browsers allow autoplay if muted
                    video.muted = true;
                    video.play();
                });
            }, 100);
            
            // Clean up reveal container from DOM after fade
            setTimeout(() => {
                revealContainer.style.display = 'none';
            }, 1000);

        }, duration);
    });
});
