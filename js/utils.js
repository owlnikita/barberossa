/** 
 * @param {Element|string} target
 */

export function playSuccessAnimation(target='.success-checkmark') {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    // reset animation if was playing earlier
    element.classList.remove('animated');

    // forced reflow ro restart animation
    void element.offsetWidth;

    // start animation
    element.classList.add('animated');
}

