// GSAP Hover Animations
const gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            backgroundColor: '#201E1E',
            color: 'white',
            duration: 0.3,
            ease: 'power2.out'
        });
        
        gsap.to(item.querySelector('span'), {
            scale: 1.2,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            backgroundColor: '#DDD8CB',
            color: 'black',
            duration: 0.3,
            ease: 'power2.out'
        });
        
        gsap.to(item.querySelector('span'), {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Image Gallery Animation
const gallery = document.querySelector('.gallery');
const images = document.querySelectorAll('.gallery-img');
let currentIndex = 0;

function updateGallery() {
    const currentImage = images[currentIndex];
    const nextIndex = (currentIndex + 1) % images.length;
    const nextImage = images[nextIndex];

    // Fade out current image
    anime({
        targets: currentImage,
        opacity: 0,
        duration: 1000,
        easing: 'easeOutQuad',
        complete: () => {
            currentImage.classList.remove('active');
            nextImage.classList.add('active');
            // Fade in next image
            anime({
                targets: nextImage,
                opacity: 1,
                duration: 1000,
                easing: 'easeInQuad'
            });
        }
    });

    currentIndex = nextIndex;
}

// Initial gallery setup
updateGallery();

// Start gallery rotation with 5 second interval
setInterval(updateGallery, 5000);

// Studio Section
const studioTrigger = document.getElementById('studio-trigger');
const mainContainer = document.querySelector('.main-container');
const studioContainer = document.querySelector('.studio-container');

studioTrigger.addEventListener('click', () => {
    gsap.to(mainContainer, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
            mainContainer.style.display = 'none';
            studioContainer.style.display = 'flex';
            gsap.fromTo(studioContainer, 
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: 'power2.in' }
            );
        }
    });
});

// Article Section
const articleTrigger = document.getElementById('article-trigger');
const articleContainer = document.querySelector('.article-container');

articleTrigger.addEventListener('click', () => {
    gsap.to(mainContainer, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
            mainContainer.style.display = 'none';
            articleContainer.style.display = 'block';
            gsap.fromTo(articleContainer, 
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: 'power2.in' }
            );
        }
    });
});

// Back Button Functionality
const backButtons = document.querySelectorAll('.back-button');

backButtons.forEach(button => {
    button.addEventListener('click', () => {
        const container = button.closest('.container');
        
        gsap.to(container, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                container.style.display = 'none';
                mainContainer.style.display = 'flex';
                gsap.fromTo(mainContainer, 
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5, ease: 'power2.in' }
                );
            }
        });
    });
});

// Snap Scrolling for Studio Gallery
const studioGallery = document.querySelector('.studio-gallery');
const studioImages = document.querySelectorAll('.studio-img');

studioGallery.addEventListener('scroll', () => {
    const scrollPosition = studioGallery.scrollTop;
    const windowHeight = window.innerHeight;
    
    studioImages.forEach((img, index) => {
        const imgPosition = img.offsetTop;
        const distance = Math.abs(scrollPosition - imgPosition);
        
        if (distance < windowHeight / 2) {
            gsap.to(studioGallery, {
                scrollTop: imgPosition,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
});

// Handle scroll to top button visibility
articleContainer.addEventListener('scroll', () => {
    if (articleContainer.scrollTop > 300) {
        document.querySelector('.scroll-top').classList.add('visible');
    } else {
        document.querySelector('.scroll-top').classList.remove('visible');
    }
});

document.querySelector('.scroll-top').addEventListener('click', () => {
    gsap.to(articleContainer, {
        scrollTop: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
});

// Countdown Timer
let currentSeconds = 0;
const startDate = new Date('2025-01-15T15:53:34+01:00'); // Using provided time
const targetDate = new Date('2025-03-15T00:00:00+01:00');

function updateCountdown() {
    const now = new Date(startDate.getTime() + (currentSeconds * 1000));
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const countdownElement = document.querySelector('.countdown sup');
    gsap.to(countdownElement, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s until March 15`;
            gsap.to(countdownElement, {
                opacity: 1,
                duration: 0.3
            });
        }
    });
    
    currentSeconds++;
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);
