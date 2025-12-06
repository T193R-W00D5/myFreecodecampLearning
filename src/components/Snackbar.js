export function showSnackbar(elementId, message, duration = 10000) {
  const snackbar = document.getElementById(elementId);
  snackbar.textContent = message;
  snackbar.className = "show";
  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "");
  }, duration);
}