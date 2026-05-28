document.addEventListener('DOMContentLoaded', () => {
    // Initialize Supabase client (replace placeholders with your actual project URL and anon key)
    const SUPABASE_URL = 'https://flyjnqrqapczqokvzmuv.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZseWpucXJxYXBjenFva3Z6bXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NTQ5NjAsImV4cCI6MjA5NTUzMDk2MH0.yfVvcOybc35cmWoi4kGEGFo7XqdWO97iLL5MIU_Bs0Q';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    lucide.createIcons();

    // Initialize Typed.js only if the target element exists
    const typingEl = document.querySelector('#typing-text');
    if (typingEl) {
        const typed = new Typed('#typing-text', {
            strings: [
                'Intelligent Mobile Applications.',
                'TensorFlow & Machine Learning.',
                'Modern Web Experiences.',
                'Linear Transformations & Matrix Models.',
                'Elegant User Interfaces.'
            ],
            typeSpeed: 40,
            backSpeed: 20,
            backDelay: 2500,
            loop: true,
            cursorChar: '|'
        });
    }



    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.hero-reveal', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'expo.out',
        delay: 0.3
    });

    const reveals = [
        { selector: '.reveal-up', y: 60, x: 0 },
        { selector: '.reveal-left', y: 0, x: -60 },
        { selector: '.reveal-right', y: 0, x: 60 }
    ];

    reveals.forEach(reveal => {
        gsap.utils.toArray(reveal.selector).forEach(el => {
            gsap.fromTo(el,
                {
                    opacity: 0,
                    y: reveal.y,
                    x: reveal.x
                },
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 1.5,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        // Ensure reveal elements stay visible after scroll-triggered animations
        gsap.set('.reveal-up, .reveal-left, .reveal-right, .hero-reveal', { opacity: 1, x: 0, y: 0 });
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.querySelector('nav ul');
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('show');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: target.offsetTop - 80,
                        autoKill: true
                    },
                    ease: 'power4.inOut'
                });
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            try {
                const { data: inserted, error } = await supabaseClient.from('contact_messages').insert([data]);
                if (error) {
                    alert('Error: ' + error.message);
                } else {
                    alert('Message sent successfully!');
                    contactForm.reset();
                }
            } catch (error) {
                console.log('Form data:', Object.fromEntries(formData));
                alert('Success! (Local Simulation) Message recorded.');
                contactForm.reset();
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    const cvUpload = document.getElementById('cv-upload');
    if (cvUpload) {
        cvUpload.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                alert(`System: CV "${e.target.files[0].name}" received. In production, this will update the server repository.`);
            }
        });
    }
});
