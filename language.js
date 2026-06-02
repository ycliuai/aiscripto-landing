/**
 * AiScripto Language Switcher
 * Supports English (default) and Traditional Chinese
 */

(function() {
    // Initialize language on page load
    const DEFAULT_LANGUAGE = 'en';
    const STORAGE_KEY = 'aiscripto-language';

    // Get current language from localStorage or default to English
    function getCurrentLanguage() {
        return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
    }

    // Set language preference
    function setLanguage(lang) {
        if (lang === 'en' || lang === 'zh') {
            localStorage.setItem(STORAGE_KEY, lang);
            applyLanguage(lang);
        }
    }

    // Apply language to all elements with data-en and data-zh attributes
    function applyLanguage(lang) {
        const elements = document.querySelectorAll('[data-en][data-zh]');
        elements.forEach(el => {
            el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-zh');
        });

        // Also handle HTML content (for links, buttons with nested elements)
        const htmlElements = document.querySelectorAll('[data-en-html][data-zh-html]');
        htmlElements.forEach(el => {
            el.innerHTML = lang === 'en' ? el.getAttribute('data-en-html') : el.getAttribute('data-zh-html');
        });

        // Update language toggle button state
        updateLanguageToggleButton(lang);

        // Update document language attribute
        document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';
    }

    // Update language toggle button
    function updateLanguageToggleButton(lang) {
        const enBtn = document.getElementById('lang-en');
        const zhBtn = document.getElementById('lang-zh');
        
        if (enBtn && zhBtn) {
            if (lang === 'en') {
                enBtn.classList.add('active');
                zhBtn.classList.remove('active');
            } else {
                enBtn.classList.remove('active');
                zhBtn.classList.add('active');
            }
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            const currentLang = getCurrentLanguage();
            applyLanguage(currentLang);
        });
    } else {
        const currentLang = getCurrentLanguage();
        applyLanguage(currentLang);
    }

    // Expose global functions
    window.setLanguage = setLanguage;
    window.getCurrentLanguage = getCurrentLanguage;
})();
