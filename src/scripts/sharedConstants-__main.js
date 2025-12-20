/**
 * @typedef {Object} Paths
 *   @property {string} path_home
 *   @property {string} path_CFSD_Home
 *   @property {string} path_InteractiveFeatures
 */

/**
 * @type {Paths}
 */
export const paths = {
  path_home: "/tigercuriosity/",
  path_CFSD_Home:
    "/tigercuriosity/pages/s100101-CFSDc/Home-Certified-Full-Stack-Developer-Curriculum.html",
  path_InteractiveFeatures: "/tigercuriosity/pages/interactive-features.html",
};

/**
 * @typedef {Object} Hrefs
 *   @property {string} href_home
 *   @property {string} href_CFSD_Home
 */

/**
 * @type {Hrefs}
 */
export const hrefs = {
  href_home: "http://localhost:4000/tigercuriosity/",
  href_CFSD_Home:
    "http://localhost:4000/tigercuriosity/pages/s100101-CFSDc/Home-Certified-Full-Stack-Developer-Curriculum.html",
};

/**
 * @typedef {Object} AriaLabels
 *   @property {string} ariaLabel_homeLink_header
 *   @property {string} ariaLabel_homeLink_footer
 */

/**
 * @type {AriaLabels}
 */
export const ariaLabels = {
  ariaLabel_homeLink_header:
    "Top of the page Home link to go to the website's main home page",
  ariaLabel_homeLink_footer:
    "Bottom of the page Home link to go to the website's main home page",
};

/**
 * @typedef {Object} Roles
 *   @property {string} role_link
 *   @property {string} role_button
 */

/**
 * @type {Roles}
 */
export const roles = {
  role_link: "link",
  role_button: "button",
};

/**
 * @typedef {Object} linkVisibleNames
 * @property {string} home
 * @property {string} curriculum
 * @property {string} interactive
 */

/** @type {linkVisibleNames} */
export const linkVisibleNames = {
  home: "Home",
  curriculum: "Certified Full Stack Developer Curriculum",
  interactive: "Try Interactive Demo",
};
