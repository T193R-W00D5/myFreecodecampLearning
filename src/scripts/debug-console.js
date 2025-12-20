/**
 * Debug Console Utility
 * Provides conditional logging based on debug flag
 */

// Global debug flag - set to true to enable debug output
export const bDebug = true; // Change to false to disable debug output

/**
 * Debug console wrapper with conditional logging
 */
export const debugConsole = {
  /**
   * Log a message only when debugging is enabled
   * @param {...any} args - Arguments to log (same as console.log)
   */
  log: (...args) => {
    if (bDebug) {
      console.log("[DEBUG]", ...args);
    }
  },

  /**
   * Log an info message only when debugging is enabled
   * @param {...any} args - Arguments to log
   */
  info: (...args) => {
    if (bDebug) {
      console.info("[DEBUG-INFO]", ...args);
    }
  },

  /**
   * Log a warning message only when debugging is enabled
   * @param {...any} args - Arguments to log
   */
  warn: (...args) => {
    if (bDebug) {
      console.warn("[DEBUG-WARN]", ...args);
    }
  },

  /**
   * Log an error message only when debugging is enabled
   * @param {...any} args - Arguments to log
   */
  error: (...args) => {
    if (bDebug) {
      console.error("[DEBUG-ERROR]", ...args);
    }
  },

  /**
   * Force log a message regardless of debug flag (for critical info)
   * @param {...any} args - Arguments to log
   */
  force: (...args) => {
    console.log("[FORCE]", ...args);
  },

  /**
   * Group console messages (only when debugging enabled)
   * @param {string} label - Group label
   */
  group: (label) => {
    if (bDebug) {
      console.group(`[DEBUG-GROUP] ${label}`);
    }
  },

  /**
   * End console group (only when debugging enabled)
   */
  groupEnd: () => {
    if (bDebug) {
      console.groupEnd();
    }
  },
};

/**
 * Quick debug function for one-liner usage
 * @param {...any} args - Arguments to log
 */
export const debug = debugConsole.log;

export default debugConsole;
