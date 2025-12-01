import { handleConsoleLogTest } from './scripts/consoleLogHandler.js';
import { showSnackbar } from './components/Snackbar.js';

const COPYRIGHT_TEXT = `no copyright`;

// Browser code (event listeners, DOM manipulation) wrapped in the guard.
// - This ensures it only runs in a browser environment.
// - This is necessary for Jest because it runs in a Node environment by default.
if (typeof document !== 'undefined') {
  const copyrightEl = document.getElementById('copyright');
  if (copyrightEl) {
  /* Use innerHTML to render HTML entities
     This allows us to use &copy; instead of the actual © character
     Using .innerHTML is safe here because COPYRIGHT_TEXT is a hardcoded string
     and not coming from user input or any external/untrusted source. */
    copyrightEl.innerHTML = COPYRIGHT_TEXT;
  }
  // Add event listeners for buttons
  const messageTestBtn = document.getElementById('messageBtn');
  if (messageTestBtn) {
    messageTestBtn.addEventListener('click', function() {
      showMessage();
    });
  }
  const alertBtn = document.getElementById('alert_test');
  if (alertBtn) {
    alertBtn.addEventListener('click', function() {
      showSnackbar('snackbar_alert_test', 'Alert Test button clicked!');
    });
  }
  const consoleLogTestBtn = document.getElementById('console_log_test');
  if (consoleLogTestBtn) {
    consoleLogTestBtn.addEventListener('click', function() {
      handleConsoleLogTest(showSnackbar);
    });
  }
  document.querySelectorAll('.snackbar-close').forEach(btn => {
    btn.addEventListener('click', function() {
      this.parentElement.classList.remove('show');
    });
  });
}
  
const typedMessage = [
  {
    message: "This is test message 1"
  },
  {
    message: "This is test message 2"
  }
];

let typeTextIntervalId = null; // Store interval ID globally

function typeText(elementOrId, text, speed = 50) {
  // Resolve element if a string ID is passed
  const element = typeof elementOrId === 'string'
    ? document.getElementById(elementOrId)
    : elementOrId;

  if (!element) return;

  // Clear any previous interval
  if (typeTextIntervalId) {
    clearInterval(typeTextIntervalId);
    typeTextIntervalId = null;
  }
  element.textContent = ""; // Clear text before typing
  let index = 0;

  typeTextIntervalId = setInterval(() => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(typeTextIntervalId);
      typeTextIntervalId = null;
    }
  }, speed);
}

function showMessage() {
  const textMessage = document.getElementById("textMessage");
  // Randomly select a message from typedMessage
  let randomReaction;
  const index = Math.floor(Math.random() * typedMessage.length);
  randomReaction = typedMessage[index];
  // Apply message
  typeText(textMessage, randomReaction.message);
}

// Simple math functions for demonstrating jest tests
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}

// Export functions for testing
export { add, subtract, typeText };
