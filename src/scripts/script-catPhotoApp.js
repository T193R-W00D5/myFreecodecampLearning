import { handleConsoleLogTest } from './consoleLogHandler.js'
import { showSnackbar } from '../components/Snackbar.js'

// Browser code (event listeners, DOM manipulation) wrapped in the guard.
// This ensures it only runs in a browser environment.
// This is necessary because Jest runs in a Node environment by default.
if (typeof document !== 'undefined') {
  
  // Add event listeners to buttons for animation
  // This is to prevent multiple clicks from triggering the animation at once
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function() {
      
      // Check if the button is already animating
      if (isAnimating) {
        // Already animating? Shake the button for feedback!
        btn.classList.remove("shake"); // Reset if still active
        //eslint-disable-next-line 
        btn.offsetWidth; // no-unused-expressions
        //void btn.offsetWidth; // Force reflow to reset animation
        btn.classList.add("shake");
        return;
      }
      // Set the button to animating state
      isAnimating = true;
      setTimeout(() => { isAnimating = false; }, 1000); // Debounce for 1s

    });
  });
  
  // Add event listener for the message button
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("messageBtn");
    // Ensure the message button is available before adding the event listener
    if (button) { 
      button.addEventListener("click", showMessage);
    }
  });
  
  // Show snackbar for Alert Test button
  document.getElementById('alert_test').addEventListener('click', function() {
    showSnackbar('snackbar_alert_test', 'Alert Test button clicked!');
  });

  // Show snackbar for Console Log Test button and log some info to the browser console
  document.getElementById('console_log_test').addEventListener('click', function() {
    handleConsoleLogTest(showSnackbar);
  });

  // Set timeout to reveal the surprise cat after 2 seconds from when the page is loaded
/*   setTimeout(() => {
    document.getElementById("surpriseCat").classList.add("reveal");
  }, 2000); */

}

const catReactions = [
  {
    message: "You're paws-itively awesome!",
    //cat-furiously-typing.webp
    gif: "../../../assets/gifs/cat-furiously-typing.webp"
  },
  {
    message: "Keep calm and purr on 🐱",
    gif: "../../../assets/gifs/cat-in-glass-bowl.webp"
  },
  {
    message: "You just made the cat smile 😸",
    gif: "../../../assets/gifs/kitten-tickling.webp"
  },
  {
    message: "Wait... that's not a cat! 🐶➡️🐱",
    gif: "../../../assets/gifs/dog-fish-costume.webp"
  },
  {
    message: "That's disturbing.",
    gif: "../../../assets/gifs/dog-axed-and-sawed.gif"
  }
];

function typeText(element, text, speed = 50) {
  element.textContent = "";
  let index = 0;

  const interval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

// Variable to track if an animation is currently playing
// This prevents multiple clicks from triggering the animation at once
let isAnimating = false;
// Function to show a message with a cat reaction
// This function will be called when the button is clicked
function showMessage() {
  const messageBox = document.getElementById("messageBox");
  const textMessage = document.getElementById("textMessage");
  const catGif = document.getElementById("catGif");
  
  // Choose a random cat reaction and a chance for easter egg
  let randomReaction;
  if (Math.random() < 1 / 10) {
     // easter egg
    randomReaction = {
      message: "*** You found the secret paw! This is a rare moment. ***",
      gif: "../../../assets/gifs/laser-disco-cat.gif"
    };
    // Apply message
    textMessage.textContent = randomReaction.message;
  } else {
    const index = Math.floor(Math.random() * catReactions.length);
    randomReaction = catReactions[index];
  }
  
  // Apply message
  // Use textContent to avoid HTML injection
  textMessage.textContent = randomReaction.message;

  // catGif.src = "";
  setTimeout(() => {
    catGif.src = randomReaction.gif;
  }, 0);

  // Reset and replay the fade-in animation
  messageBox.style.animation = "none";
  //eslint-disable-next-line
  messageBox.offsetHeight; // no-unused-expressions
  // void messageBox.offsetHeight; // Force reflow to reset animation
  messageBox.style.animation = "fadeIn 0.6s ease forwards";
  messageBox.style.display = "block";  
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// Export functions for testing
export { add, subtract, typeText };
