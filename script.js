document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Configuration
    const totalSteps = 5;
    const autoPlayDelay = 3000; // milliseconds
    
    // Step data
    const steps = [
        {
            title: "User Authentication",
            description: "User logs into the application"
        },
        {
            title: "Data Access Request",
            description: "Application requests data through Authorization Service"
        },
        {
            title: "Authorization Calculation",
            description: "Policy Engine evaluates rules and calculates permissions"
        },
        {
            title: "Query Modification",
            description: "Original query is modified with authorization filters"
        },
        {
            title: "Database Access",
            description: "Modified query securely accesses only permitted data"
        },
        {
            title: "Protected Data Delivery",
            description: "User receives only authorized data with appropriate masking"
        }
    ];
    
    // DOM Elements
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const resetBtn = document.getElementById('reset-btn');
    const autoplayToggle = document.getElementById('autoplay-toggle');
    const progressFill = document.querySelector('.progress-fill');
    const stepTitle = document.getElementById('step-title');
    const stepDescription = document.getElementById('step-description');
    const components = document.querySelectorAll('.component');
    const paths = [
        document.querySelector('.path-1'),
        document.querySelector('.path-2'),
        document.querySelector('.path-3'),
        document.querySelector('.path-4'),
        document.querySelector('.path-5')
    ];
    const particles = [
        document.querySelector('.particle-1'),
        document.querySelector('.particle-2'),
        document.querySelector('.particle-3'),
        document.querySelector('.particle-4'),
        document.querySelector('.particle-5')
    ];
    const animationElements = [
        document.getElementById('particle-anim-1'),
        document.getElementById('particle-anim-2'),
        document.getElementById('particle-anim-3'),
        document.getElementById('particle-anim-4'),
        document.getElementById('particle-anim-5')
    ];
    
    // State
    let currentStep = 0;
    let isAnimating = false;
    let autoPlayTimer = null;
    
    // Initialize
    updateUI();
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
        if (currentStep > 0 && !isAnimating) {
            changeStep(currentStep - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps && !isAnimating) {
            changeStep(currentStep + 1);
        }
    });
    
    resetBtn.addEventListener('click', () => {
        changeStep(0);
    });
    
    autoplayToggle.addEventListener('change', () => {
        if (autoplayToggle.checked) {
            startAutoPlay();
        } else {
            stopAutoPlay();
        }
    });
    
    // Functions
    function changeStep(newStep) {
        if (isAnimating) return;
        
        isAnimating = true;
        currentStep = newStep;
        
        updateUI();
        
        // Reset animation state after transition
        setTimeout(() => {
            isAnimating = false;
            
            // Continue autoplay if enabled
            if (autoplayToggle.checked && currentStep < totalSteps) {
                startAutoPlay();
            } else if (currentStep >= totalSteps) {
                autoplayToggle.checked = false;
                stopAutoPlay();
            }
        }, 500);
    }
    
    function updateUI() {
        // Update progress
        progressFill.style.width = `${((currentStep + 1) / (totalSteps + 1)) * 100}%`;
        
        // Update step info
        stepTitle.textContent = steps[currentStep].title;
        stepDescription.textContent = steps[currentStep].description;
        
        // Update buttons
        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === totalSteps;
        
        // Update components
        components.forEach((component, index) => {
            if (index === currentStep) {
                component.classList.add('active');
                component.classList.remove('completed');
            } else if (index < currentStep) {
                component.classList.remove('active');
                component.classList.add('completed');
            } else {
                component.classList.remove('active', 'completed');
            }
        });
        
        // Update paths
        paths.forEach((path, index) => {
            if (index <= currentStep - 1) {
                path.style.strokeDashoffset = "0";
            } else {
                path.style.strokeDashoffset = "150";
            }
        });
        
        // Update particle animations
        updateParticleAnimations();
    }
    
    function updateParticleAnimations() {
        // Reset all animations
        animationElements.forEach((anim, index) => {
            if (anim) {
                // Stop animation
                anim.setAttribute('begin', 'indefinite');
                
                // Hide particle
                particles[index].style.opacity = '0';
            }
        });
        
        // Start animation for current step
        if (currentStep > 0 && currentStep <= totalSteps) {
            const particleIndex = currentStep - 1;
            if (animationElements[particleIndex]) {
                // Show particle
                particles[particleIndex].style.opacity = '1';
                
                // Start animation
                animationElements[particleIndex].beginElement();
            }
        }
    }
    
    function startAutoPlay() {
        stopAutoPlay(); // Clear any existing timer
        
        if (currentStep < totalSteps) {
            autoPlayTimer = setTimeout(() => {
                changeStep(currentStep + 1);
            }, autoPlayDelay);
        }
    }
    
    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearTimeout(autoPlayTimer);
            autoPlayTimer = null;
        }
    }
});
