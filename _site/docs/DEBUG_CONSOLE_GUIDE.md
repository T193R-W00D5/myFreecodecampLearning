# Debug Console Guide

## Overview

The Debug Console system provides **conditional logging** for development and testing environments, allowing you to easily toggle debug output on/off across your entire application.

## Quick Start

### 1. Basic Usage

```javascript
import { debugConsole } from '../../../src/scripts/debug-console.js';

// Use debugConsole instead of console.log
debugConsole.log('This will only show when debugging is enabled');
debugConsole.info('Info level debugging');
debugConsole.warn('Warning level debugging');
debugConsole.error('Error level debugging');
```

### 2. Toggle Debug Output

```javascript
// In src/scripts/debug-console.js
export const bDebug = true;  // Shows debug output
export const bDebug = false; // Hides debug output
```

## Debug Console API

### Available Methods

| Method | Description | Output When bDebug=true | Output When bDebug=false |
|--------|-------------|--------------------------|---------------------------|
| `debugConsole.log()` | Standard debug logging | `[DEBUG] Your message` | (hidden) |
| `debugConsole.info()` | Info-level debugging | `[DEBUG-INFO] Your message` | (hidden) |
| `debugConsole.warn()` | Warning-level debugging | `[DEBUG-WARN] Your message` | (hidden) |
| `debugConsole.error()` | Error-level debugging | `[DEBUG-ERROR] Your message` | (hidden) |
| `debugConsole.force()` | Always shows (ignores bDebug) | `[FORCE] Your message` | `[FORCE] Your message` |
| `debugConsole.group()` | Group related messages | Creates console group | (hidden) |
| `debugConsole.groupEnd()` | End console group | Ends console group | (hidden) |

### Shorthand Function

```javascript
import { debug } from '../../../src/scripts/debug-console.js';

// Quick one-liner usage (same as debugConsole.log)
debug('Quick debug message');
```

## Real-World Examples

### Test File Usage (Playwright)

```typescript
import { debugConsole } from '../../../src/scripts/debug-console.js';

test('navigation test', async ({ curriculumPage, paths }) => {
  // Debug actual vs expected values
  const actualHref = await homeLink.getAttribute('href');
  debugConsole.log('Expected href:', paths.page_home);
  debugConsole.log('Actual href:', actualHref);
  
  // Group related debug info
  debugConsole.group('Navigation Debug');
  debugConsole.log('Response status:', response.status());
  debugConsole.log('Response URL:', response.url());
  debugConsole.groupEnd();
});
```

### HTML JavaScript Usage

```javascript
import { debugConsole } from '/src/scripts/debug-console.js';

window.addEventListener('DOMContentLoaded', function() {
  const headerHomeLink = document.querySelector('header .home-link');
  
  if (headerHomeLink) {
    headerHomeLink.setAttribute('href', '/index.html');
    debugConsole.log('Header home link configured:', headerHomeLink.getAttribute('href'));
  }
});
```

## Production vs Development

### Development Mode
```javascript
export const bDebug = true;
```
**Result:**
```
[DEBUG] Header Home link href: /index.html
[DEBUG] Footer Home link href: /index.html
[DEBUG] Navigation response status: 200
```

### Production Mode
```javascript
export const bDebug = false;
```
**Result:**
```
(clean output - no debug messages)
```

## Best Practices

### 1. Use Appropriate Log Levels
```javascript
// For routine debugging
debugConsole.log('User clicked button');

// For important information that might need attention
debugConsole.info('Feature flag enabled: newDashboard');

// For potential issues
debugConsole.warn('Deprecated API call detected');

// For actual problems
debugConsole.error('Failed to load configuration');

// For critical info that should always show
debugConsole.force('Application started successfully');
```

### 2. Group Related Information
```javascript
debugConsole.group('User Authentication');
debugConsole.log('Username:', username);
debugConsole.log('Login attempt:', attempt);
debugConsole.log('Session ID:', sessionId);
debugConsole.groupEnd();
```

### 3. Conditional Debugging Patterns
```javascript
// Debug only specific features
if (bDebug && featureFlags.debugAuth) {
  debugConsole.log('Auth debug enabled');
}

// Different debug levels for different environments
const isDev = process.env.NODE_ENV === 'development';
if (bDebug && isDev) {
  debugConsole.log('Development-specific debug info');
}
```

## Integration with Testing

### Playwright Tests
The debug console integrates seamlessly with your Playwright test fixtures:

```typescript
// In curriculum-navigation.spec.ts
debugConsole.log('Header Home link path should be:', paths.page_home);
debugConsole.log('Header Home link href:', actualHref_homeLink_header);
```

### Jest Tests
Can also be used in Jest unit tests:

```javascript
import { debugConsole } from '../src/scripts/debug-console.js';

test('calculation test', () => {
  const result = add(2, 3);
  debugConsole.log('Calculation result:', result);
  expect(result).toBe(5);
});
```

## Configuration Options

### Environment-Based Configuration
```javascript
// Advanced configuration based on environment
export const bDebug = process.env.NODE_ENV !== 'production';

// Or feature-specific debugging
export const debugConfig = {
  general: process.env.DEBUG_GENERAL === 'true',
  tests: process.env.DEBUG_TESTS === 'true',
  navigation: process.env.DEBUG_NAV === 'true'
};
```

### Custom Debug Instance
```javascript
// Create custom debug instances for different modules
export const createDebugger = (module) => ({
  log: (...args) => {
    if (bDebug) {
      console.log(`[DEBUG-${module.toUpperCase()}]`, ...args);
    }
  }
});

// Usage
const navDebug = createDebugger('navigation');
navDebug.log('Navigation started');  // Output: [DEBUG-NAVIGATION] Navigation started
```

## Troubleshooting

### Debug Messages Not Showing
1. **Check bDebug flag**: Ensure `bDebug = true` in `src/scripts/debug-console.js`
2. **Import path**: Verify the import path is correct for your file location
3. **Module loading**: Ensure the module loads properly with `type="module"`

### Too Much Debug Output
1. **Use log levels**: Switch to `debugConsole.info()` or higher levels
2. **Conditional debugging**: Add feature-specific debug flags
3. **Group messages**: Use `debugConsole.group()` to organize output

## Migration from console.log

### Before (Manual)
```javascript
console.log('Debug message');           // Always shows
console.log('Another debug message');   // Always shows
// Need to manually remove or comment out for production
```

### After (Controlled)
```javascript
debugConsole.log('Debug message');      // Shows only when bDebug=true
debugConsole.log('Another debug message'); // Shows only when bDebug=true
// Automatically hidden in production by setting bDebug=false
```

## Performance Considerations

- **Zero runtime overhead** when `bDebug = false`
- **No string concatenation** when debugging is disabled
- **Minimal import cost** - lightweight utility module
- **Browser-optimized** - uses native console methods when enabled

## Future Enhancements

### Planned Features
- [ ] **Log levels configuration** (DEBUG, INFO, WARN, ERROR)
- [ ] **Module-specific debugging** with namespace filtering
- [ ] **Remote logging** integration for production debugging
- [ ] **Performance timing** utilities
- [ ] **Test result correlation** with debug output

---

**Related Documentation:**
- [Playwright Guide](./PLAYWRIGHT_GUIDE.md) - Testing framework documentation
- [TypeScript Guide](./TYPESCRIPT_GUIDE.md) - TypeScript integration
- [PR Changes](./PR_changes.md) - Change history and implementation notes