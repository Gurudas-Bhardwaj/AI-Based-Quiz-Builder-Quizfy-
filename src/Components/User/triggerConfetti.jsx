// utils/celebration.js
import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  const duration = 0.3 * 1000; // 3 seconds duration
  const animationEnd = Date.now() + duration;
  const colors = [
    "#4CAF50", // green
    "#81C784", // light green
    "#A5D6A7", // pastel green
    "#C8E6C9", // mint green
    "#B2DFDB", // teal tint
    "#E6EE9C"
  ]

  const frame = () => {
    if (Date.now() > animationEnd) return; // Stop after 3 seconds

    // Confetti shooting straight down (90°)
    confetti({
      particleCount: 10,
      angle: 60, // Shoot downwards (center)
      spread: 100, // Spread to make it look more natural
      startVelocity: 80 ,
      origin: { x: 0.7, y: 1 }, // From the top center
      colors,
      shapes: ['circle', 'square'],
      scalar: 1.2, // Slightly larger confetti for better visibility
    });

    // Confetti shooting diagonally down to the left (120°)
    confetti({
      particleCount: 10,
      angle: 120, // Angle for left down
      spread: 100,
      startVelocity: 80 ,
      origin: { x: 0.3, y: 1 },
      colors,
      shapes: ['circle', 'square'],
      scalar: 1.2,
    });

    // Confetti shooting diagonally down to the right (60°)
    confetti({
      particleCount: 10,
      angle: 90, // Angle for right down
      spread: 100,
      startVelocity: 80 ,
      origin: { x: 0.5, y: 1 },
      colors,
      shapes: ['circle', 'square'],
      scalar: 1.2,
    });

    requestAnimationFrame(frame); // Keep looping the animation
  };

  frame(); // Start the animation
};
