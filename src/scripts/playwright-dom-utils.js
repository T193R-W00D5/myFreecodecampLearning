/**
 * Playwright-style DOM utilities for HTML scripts
 * Mimics the same targeting patterns used in tests
 */

/**
 * Find element by role within a parent container (like Playwright's getByRole)
 * @param {Element} parent - Parent container element
 * @param {string} role - ARIA role to search for
 * @param {Object} options - Options object
 * @param {string} options.name - Text content to match
 * @returns {Element|null} Found element or null
 */
export function getByRole(parent, role, options = {}) {
  if (!parent) return null;
  
  const selector = options.name 
    ? `[role="${role}"]` 
    : `[role="${role}"]`;
    
  const elements = parent.querySelectorAll(selector);
  
  if (options.name) {
    return Array.from(elements).find(el => 
      el.textContent.trim().toLowerCase().includes(options.name.toLowerCase())
    ) || null;
  }
  
  return elements[0] || null;
}

/**
 * Get element within header (like curriculumPage.locator('header'))
 * @param {string} selector - CSS selector
 * @returns {Element|null} Found element or null
 */
export function getInHeader(selector) {
  const header = document.querySelector('header');
  return header ? header.querySelector(selector) : null;
}

/**
 * Get element within footer (like curriculumPage.locator('footer'))
 * @param {string} selector - CSS selector  
 * @returns {Element|null} Found element or null
 */
export function getInFooter(selector) {
  const footer = document.querySelector('footer');
  return footer ? footer.querySelector(selector) : null;
}

/**
 * Configure Home links using Playwright-style targeting
 * @param {Object} paths - Paths configuration object
 * @param {Object} ariaLabels - Aria labels configuration object
 */
export function configureHomeLinks(paths, ariaLabels) {
  // Exact same pattern as Playwright test: locator('header').getByRole('link', { name: 'Home' })
  const headerHomeLink = getInHeader('a:contains("Home")') || getInHeader('a.home-link-header');
  const footerHomeLink = getInFooter('a:contains("Home")') || getInFooter('a.home-link-footer');
  
  if (headerHomeLink) {
    headerHomeLink.setAttribute('aria-label', ariaLabels.ariaLabel_homeLink_header);
    headerHomeLink.setAttribute('href', paths.page_home);
  }
  
  if (footerHomeLink) {
    footerHomeLink.setAttribute('aria-label', ariaLabels.ariaLabel_homeLink_footer);
    footerHomeLink.setAttribute('href', paths.page_home);
  }
  
  return { headerHomeLink, footerHomeLink };
}