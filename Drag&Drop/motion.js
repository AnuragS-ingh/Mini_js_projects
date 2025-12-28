// Rose Animation Class
class RoseAnimation {
    constructor() {
        this.container = document.getElementById('roseBackground');
        this.roses = [];
        this.roseColors = [
            '#ff6b9d', '#ff8fab', '#ffb3c6', '#ffccd5', 
            '#ff758f', '#ff85a1', '#fbb1bd', '#f7cad0'
        ];
        this.init();
    }

    init() {
        this.createRoses();
        this.animateRoses();
        
        // Add some initial roses
        for (let i = 0; i < 8; i++) {
            setTimeout(() => this.createRose(), i * 300);
        }
    }

    createRose() {
        const rose = document.createElement('div');
        rose.className = 'rose';
        
        // Random rose properties
        const size = Math.random() * 30 + 20;
        const startX = Math.random() * window.innerWidth;
        const startY = -50;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        const color = this.roseColors[Math.floor(Math.random() * this.roseColors.length)];
        const swayAmount = Math.random() * 100 + 50;
        
        // Create rose petal shape
        this.createRoseShape(rose, color);
        
        // Set initial position and styles
        rose.style.width = `${size}px`;
        rose.style.height = `${size}px`;
        rose.style.left = `${startX}px`;
        rose.style.top = `${startY}px`;
        rose.style.opacity = '0';
        
        this.container.appendChild(rose);
        
        // Animate the rose
        this.animateRose(rose, {
            startX, startY, duration, delay, swayAmount
        });
        
        this.roses.push(rose);
        
        // Remove rose after animation and create new one
        setTimeout(() => {
            if (rose.parentNode) {
                rose.parentNode.removeChild(rose);
                this.roses = this.roses.filter(r => r !== rose);
            }
            this.createRose();
        }, (duration + delay) * 1000);
    }

    createRoseShape(rose, color) {
        // Create a simple rose shape using CSS
        rose.style.background = `radial-gradient(circle at 30% 30%, ${color} 0%, ${this.adjustBrightness(color, -30)} 100%)`;
        rose.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        rose.style.boxShadow = `
            inset 0 0 20px rgba(255, 255, 255, 0.3),
            0 0 20px ${color}40
        `;
    }

    adjustBrightness(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (
            0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
    }

    animateRose(rose, properties) {
        const { duration, delay, swayAmount } = properties;
        
        // Fade in
        rose.animate([
            { opacity: 0, transform: 'scale(0.8) rotate(0deg)' },
            { opacity: 1, transform: 'scale(1) rotate(180deg)' }
        ], {
            duration: 1000,
            fill: 'forwards'
        });

        // Falling animation with sway
        rose.animate([
            { 
                transform: `translate(0, 0) rotate(0deg)`,
                opacity: 1
            },
            { 
                transform: `translate(${swayAmount}px, ${window.innerHeight * 0.3}px) rotate(180deg)`,
                opacity: 0.8
            },
            { 
                transform: `translate(-${swayAmount * 0.7}px, ${window.innerHeight * 0.7}px) rotate(360deg)`,
                opacity: 0.6
            },
            { 
                transform: `translate(${swayAmount * 0.3}px, ${window.innerHeight + 100}px) rotate(540deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards'
        });
    }

    createRoses() {
        // Continuous rose creation
        setInterval(() => {
            if (this.roses.length < 15) {
                this.createRose();
            }
        }, 2000);
    }

    animateRoses() {
        // Additional floating particles for ambiance
        this.createFloatingParticles();
    }

    createFloatingParticles() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '3px';
                particle.style.height = '3px';
                particle.style.background = 'rgba(255, 255, 255, 0.6)';
                particle.style.borderRadius = '50%';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                this.container.appendChild(particle);

                // Floating animation
                particle.animate([
                    { transform: 'translateY(0px)', opacity: 0 },
                    { transform: 'translateY(-20px)', opacity: 1 },
                    { transform: 'translateY(-40px)', opacity: 0 }
                ], {
                    duration: Math.random() * 3000 + 2000,
                    iterations: Infinity,
                    direction: 'alternate'
                });
            }, i * 200);
        }
    }
}

// Paper Dragging Functionality
const papers = Array.from(document.querySelectorAll(".paper"));
let highestZindex = 1;
let isDragging = false;
let currentPaper = null;
let offsetX = 0;
let offsetY = 0;

// Common functions for both mouse and touch
function startDrag(e, paper) {
    e.preventDefault();
    isDragging = true;
    currentPaper = paper;
    
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    const rect = paper.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
    
    paper.style.zIndex = highestZindex;
    highestZindex++;
}

function moveDrag(e) {
    if (!isDragging || !currentPaper) return;
    
    e.preventDefault();
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (clientX === undefined || clientY === undefined) return;
    
    let finalPositionX = clientX - offsetX;
    let finalPositionY = clientY - offsetY;
    
    const paperRect = currentPaper.getBoundingClientRect();
    const paperWidth = paperRect.width;
    const paperHeight = paperRect.height;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Allow papers to go partially outside (up to 50% of their size)
    const minX = -paperWidth * 0.5;
    const maxX = viewportWidth - paperWidth * 0.5;
    const minY = -paperHeight * 0.5;
    const maxY = viewportHeight - paperHeight * 0.5;
    
    finalPositionX = Math.max(minX, Math.min(finalPositionX, maxX));
    finalPositionY = Math.max(minY, Math.min(finalPositionY, maxY));
    
    currentPaper.style.top = finalPositionY + "px";
    currentPaper.style.left = finalPositionX + "px";
}

function endDrag() {
    isDragging = false;
    currentPaper = null;
}

// Mouse event handlers
function mouseDown(e) {
    startDrag(e, e.currentTarget);
}

function touchStart(e) {
    startDrag(e, e.currentTarget);
}

// Button functionality with moving "Not Interested" button
function setupButtons() {
    const interestedBtn = document.getElementById('intrested');
    const notInterestedBtn = document.getElementById('notIntrested');
    const headingContainer = document.querySelector('.headingContainer');
    const mainContainer = document.querySelector('.mainContainer');
    
    // Store original positions
    let originalNotInterestedPosition = null;
    let moveCount = 0;
    const maxMoves = 8; // Maximum number of times the button will move
    
    function getRandomPosition(avoidButton) {
        const buttonRect = notInterestedBtn.getBoundingClientRect();
        const avoidRect = avoidButton.getBoundingClientRect();
        const buttonWidth = buttonRect.width;
        const buttonHeight = buttonRect.height;
        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let newX, newY;
        let attempts = 0;
        const maxAttempts = 50;
        
        do {
            // Calculate safe area (keep button fully visible)
            newX = Math.random() * (viewportWidth - buttonWidth);
            newY = Math.random() * (viewportHeight - buttonHeight);
            
            attempts++;
            
            // Check if new position overlaps with the interested button
            const newRect = {
                left: newX,
                right: newX + buttonWidth,
                top: newY,
                bottom: newY + buttonHeight
            };
            
            const overlaps = !(
                newRect.right < avoidRect.left - 20 || 
                newRect.left > avoidRect.right + 20 ||
                newRect.bottom < avoidRect.top - 20 ||
                newRect.top > avoidRect.bottom + 20
            );
            
            // If no overlap or max attempts reached, break
            if (!overlaps || attempts >= maxAttempts) {
                break;
            }
        } while (attempts < maxAttempts);
        
        return { x: newX, y: newY };
    }
    
    function moveButtonToRandomPosition() {
        if (moveCount >= maxMoves) {
            // Reset after max moves
            notInterestedBtn.style.position = 'static';
            notInterestedBtn.style.left = 'auto';
            notInterestedBtn.style.top = 'auto';
            notInterestedBtn.style.transform = 'none';
            notInterestedBtn.textContent = "Not interested";
            notInterestedBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
            moveCount = 0;
            return;
        }
        
        // Make button position absolute for movement
        notInterestedBtn.style.position = 'absolute';
        notInterestedBtn.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        const newPosition = getRandomPosition(interestedBtn);
        
        // Move the button with a fun animation
        notInterestedBtn.style.left = `${newPosition.x}px`;
        notInterestedBtn.style.top = `${newPosition.y}px`;
        notInterestedBtn.style.transform = 'scale(1.1) rotate(5deg)';
        
        // Add some fun messages
        const messages = [
            "Are you sure? 💔",
            "Think about it! 💖",
            "Pretty please? 🥺",
            "Don't say no! 😢",
            "Give me a chance! 🌹",
            "My heart! 💔",
            "You're breaking my heart! 💘",
            "Last chance! 💕"
        ];
        
        notInterestedBtn.textContent = messages[moveCount] || "Not interested";
        
        // Reset transform after animation
        setTimeout(() => {
            notInterestedBtn.style.transform = 'scale(1) rotate(0deg)';
        }, 600);
        
        moveCount++;
        
        // Change background color based on move count
        const colors = [
            'linear-gradient(45deg, #ff6b6b, #ee5a52)',
            'linear-gradient(45deg, #ff8e8e, #ff6b6b)',
            'linear-gradient(45deg, #ffa8a8, #ff8e8e)',
            'linear-gradient(45deg, #ffc4c4, #ffa8a8)',
            'linear-gradient(45deg, #ffe0e0, #ffc4c4)',
            'linear-gradient(45deg, #fff0f0, #ffe0e0)',
            'linear-gradient(45deg, #fff8f8, #fff0f0)',
            'linear-gradient(45deg, #4ecdc4, #44a08d)' // Back to original
        ];
        
        notInterestedBtn.style.background = colors[moveCount] || colors[colors.length - 1];
    }
    
    interestedBtn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Show the main container with papers
        headingContainer.style.display = 'none';
        mainContainer.style.display = 'flex';
    });
    
    notInterestedBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Store original position on first click
        if (!originalNotInterestedPosition) {
            const rect = this.getBoundingClientRect();
            originalNotInterestedPosition = {
                x: rect.left,
                y: rect.top
            };
        }
        
        // Move button to random position
        moveButtonToRandomPosition();
        
        // Add some floating hearts when button moves
        if (moveCount <= maxMoves) {
            createFloatingHearts(e.clientX, e.clientY);
        }
    });
    
    function createFloatingHearts(x, y) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💔';
                heart.style.position = 'fixed';
                heart.style.left = `${x}px`;
                heart.style.top = `${y}px`;
                heart.style.fontSize = '20px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '1000';
                document.body.appendChild(heart);
                
                // Animate heart floating up
                heart.animate([
                    { transform: 'translateY(0px) scale(1)', opacity: 1 },
                    { transform: `translateY(-${50 + i * 20}px) translateX(${(Math.random() - 0.5) * 50}px) scale(0.5)`, opacity: 0 }
                ], {
                    duration: 1000,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
                
                // Remove heart after animation
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 1000);
            }, i * 200);
        }
    }
    
    // Make sure buttons stay within bounds on window resize
    window.addEventListener('resize', function() {
        if (notInterestedBtn.style.position === 'absolute') {
            const currentRect = notInterestedBtn.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Check if button is outside viewport and reposition if needed
            if (currentRect.right > viewportWidth || currentRect.bottom > viewportHeight) {
                moveButtonToRandomPosition();
            }
        }
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize rose animation
    new RoseAnimation();
    
    // Setup button functionality
    setupButtons();
    
    // Add event listeners for paper dragging
    papers.forEach((paper) => {
        paper.addEventListener('mousedown', mouseDown);
        paper.addEventListener('touchstart', touchStart, { passive: false });
    });
    
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', moveDrag, { passive: false });
    document.addEventListener('touchend', endDrag);
    document.addEventListener('touchcancel', endDrag);
    
    // Prevent scroll on touch devices
    document.addEventListener('touchmove', function(e) {
        if (isDragging) {
            e.preventDefault();
        }
    }, { passive: false });
});