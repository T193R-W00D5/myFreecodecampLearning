/**
 * Critical CSS and Async CSS Loader
 * Include this script in the <head> of your HTML pages to:
 * 1. Apply critical CSS immediately
 * 2. Load full CSS asynchronously to prevent render blocking
 */

// Add critical CSS styles immediately
(function() {
    const criticalCSS = `
        :root {
            --main-font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            --main-font-size: 1.05rem;
            --main-bg-color: #03051f;
            --main-border-color: #ededf133;
            --main-border-radius: 8px;
            --main-text-color: #ffffff;
            --main-box-shadow: 2px 2px 8px rgba(237, 237, 241, 0.2);
            --main-margin-left-right: 240px;
        }
        body {
            font-family: var(--main-font-family);
            color-scheme: dark light;
            background-color: var(--main-bg-color);
            color: var(--main-text-color);
            text-align: left;
            padding: 20px;
            border: 2px solid var(--main-border-color);
            position: relative;
            min-height: 100vh;
            overflow-x: hidden;
        }
        /* Background pattern - prevent shift when pattern loads */
        body::before {
            content: "";
            position: fixed;
            inset: 0;
            z-index: 0;
            pointer-events: none;
            opacity: 0.18;
            background-image: url("/assets/images/bg-techy-003.svg");
            /* background-image: '../assets/images/bg-techy-003.svg'; */
            background-repeat: repeat;
            background-size: 240px 240px;
        }
        main {
            box-shadow: var(--main-box-shadow);
            border-radius: var(--main-border-radius);
            margin-left: var(--main-margin-left-right);
            margin-right: var(--main-margin-left-right);
            padding: 20px;
            position: relative;
            z-index: 1;
            background: var(--main-bg-color);
            border: var(--main-border-color) solid 2px;
        }
        h1, h2, h3, h4, h5, h6, p {
            font-family: var(--main-font-family);
            color: var(--main-text-color);
            margin-top: 0;
        }
        /* Complete header and footer styling */
        header, footer {
            background-color: var(--main-bg-color);
            color: var(--main-text-color);
            padding: 20px;
            text-align: center;
            box-shadow: var(--main-box-shadow);
            border-radius: var(--main-border-radius);
            margin-left: var(--main-margin-left-right);
            margin-right: var(--main-margin-left-right);
            position: relative;
            z-index: 1;
            border: var(--main-border-color) solid 2px;
        }
        /* Navigation layout styles - prevent flexbox layout shifts */
        .footer-nav, .header-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        .footer-left, .header-left {
            flex: 1;
            text-align: left;
        }
        .footer-center, .header-center {
            flex: 2;
            text-align: center;
        }
        .footer-right, .header-right {
            flex: 1;
            text-align: right;
        }
        /* Paragraph styling to prevent text shift */
        p {
            font-size: 1.15rem;
            font-weight: 400;
            line-height: 1.5;
        }
        /* Ensure consistent hr appearance */
        hr {
            margin: 1rem 0;
            border: none;
            border-top: 1px solid var(--main-border-color);
        }
    `;

    const style = document.createElement('style');
    style.innerHTML = criticalCSS;
    document.head.appendChild(style);

    // Load full CSS asynchronously
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = '/css/styles-tigercuriosity.css';
    link.onload = function() {
        this.onload = null;
        this.rel = 'stylesheet';
    };
    document.head.appendChild(link);

    // Fallback for browsers that don't support preload
    const noscript = document.createElement('noscript');
    const fallbackLink = document.createElement('link');
    fallbackLink.rel = 'stylesheet';
    fallbackLink.href = '/css/styles-tigercuriosity.css';
    noscript.appendChild(fallbackLink);
    document.head.appendChild(noscript);
})();