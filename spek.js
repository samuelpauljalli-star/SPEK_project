// Initialize cart count
let cartCount = 3;
const cartDisplay = document.querySelector('.cart-count');

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        cartCount++;
        cartDisplay.textContent = cartCount;

        // Simple animation for the cart icon
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);

        // Feedback on button
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.background = '#00ff00';
        button.style.color = '#000';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 1500);
    });
});

// Category chip selection
document.querySelectorAll('.category-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelector('.category-chip.active').classList.remove('active');
        chip.classList.add('active');

        // Add a subtle ripple or animation
        chip.style.transform = 'scale(0.95)';
        setTimeout(() => {
            chip.style.transform = 'scale(1)';
        }, 100);
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 2rem';
        header.style.backgroundColor = 'rgba(26, 28, 35, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.padding = '0 2rem';
        header.style.backgroundColor = 'var(--surface-color)';
        header.style.backdropFilter = 'none';
    }
});

// Smooth scroll for nav items (if we had IDs)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
