document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const carouselItems = [
        { image: 'EchoesOfTheDeep.png', link: 'project/game2.html' },
        { image: 'PolyVenturer.png', link: 'project/game1.html' }
    ];

    // --- Element Selectors ---
    const carousel = document.querySelector('.carousel');
    const track = document.querySelector('.carousel__track');
    const nextButton = document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');
    const dotsNav = document.querySelector('.carousel__nav');

    if (!track || !carousel) return;

    // --- Dynamic Slide Generation ---
    track.innerHTML = carouselItems.map(item => 
        `<li class="carousel__slide">
            <a href="${item.link}">
                <img src="images/${item.image}" alt="${item.image.split('.')[0]}">
            </a>
        </li>`
    ).join('');

    const slides = Array.from(track.children);
    const slideCount = slides.length;
    let currentIndex = 0;

    // --- Handle Different Slide Counts ---
    if (slideCount <= 1) {
        carousel.classList.add('single-slide');
        if(slideCount === 1) {
            slides[0].classList.add('current-slide');
            slides[0].querySelector('a').style.pointerEvents = 'auto';
        }
        return; // Stop execution if no sliding is needed
    } else if (slideCount === 2) {
        carousel.classList.add('two-slides');
    } else {
        carousel.classList.add('multi-slide');
    }

    // --- Create Dots ---
    dotsNav.innerHTML = slides.map((_, i) => 
        `<button class="carousel__indicator"></button>`
    ).join('');
    const dots = Array.from(dotsNav.children);

    // --- Core Update Function ---
    const updateCarousel = (targetIndex) => {
        currentIndex = (targetIndex + slideCount) % slideCount;

        // Update slide classes and link clickability
        slides.forEach((slide, index) => {
            slide.classList.remove('current-slide', 'prev-slide', 'next-slide');
            const link = slide.querySelector('a');
            
            if (index === currentIndex) {
                slide.classList.add('current-slide');
                link.style.pointerEvents = 'auto'; // Make current slide clickable
            } else {
                link.style.pointerEvents = 'none'; // Disable click on other slides
                if (slideCount > 2 && index === (currentIndex - 1 + slideCount) % slideCount) {
                    slide.classList.add('prev-slide');
                } else if (slideCount > 2 && index === (currentIndex + 1) % slideCount) {
                    slide.classList.add('next-slide');
                }
            }
        });

        // Update dot classes
        dots.forEach((dot, index) => {
            dot.classList.toggle('current-slide', index === currentIndex);
        });
    };

    // --- Event Listeners ---
    nextButton.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
    });

    prevButton.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
    });

    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        updateCarousel(targetIndex);
    });

    // --- Initialization ---
    updateCarousel(0);
});