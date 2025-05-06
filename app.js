document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Create floating particles
document.addEventListener('DOMContentLoaded', function() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);
  
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 100-300px
    const size = Math.random() * 200 + 100;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation duration/delay
    particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    particlesContainer.appendChild(particle);
  }
});

    // Sticky header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    header.appendChild(mobileMenuBtn);
    
    function toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (!mobileMenu) {
            // Create mobile menu if it doesn't exist
            const nav = document.querySelector('nav');
            const clone = nav.cloneNode(true);
            clone.className = 'mobile-menu';
            document.body.appendChild(clone);
            
            clone.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            // Toggle existing mobile menu
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Form submission with EmailJS
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Change button text to show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Send email using EmailJS
            emailjs.sendForm('service_bc37zvh', 'template_32zndai', this)
                .then(() => {
                    // Success message
                    submitBtn.textContent = 'Message Sent!';
                    contactForm.reset();
                    
                    // Show alert popup
                    alert('Your message has been sent successfully!');
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, (error) => {
                    // Error message
                    submitBtn.textContent = 'Error Sending';
                    console.error('Failed to send message:', error);
                    
                    // Show error alert
                    alert('There was an error sending your message. Please try again later.');
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    }, 3000);
                });
        });
    }

    // Animated background elements
    const bgElements = document.querySelectorAll('.bg-element');
    if (bgElements.length > 0) {
        function animateBgElements() {
            bgElements.forEach((el, index) => {
                const speed = 0.2 + (index * 0.1);
                const x = (Math.sin(Date.now() * speed / 1000) * 20) + 'px';
                const y = (Math.cos(Date.now() * speed / 1000) * 20) + 'px';
                const rotation = (Date.now() * speed / 100) % 360;
                
                el.style.transform = `translate(${x}, ${y}) rotate(${rotation}deg)`;
            });
            
            requestAnimationFrame(animateBgElements);
        }
        
        animateBgElements();
    }

    // Project card hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});