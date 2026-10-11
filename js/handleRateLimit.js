import { createBooking } from "./booking.js";

const DEFAULT_RETRY_AFTER_SECONDS = 30;
const KEY = 'retryUntil';
const btn = document.getElementById('applyBtn');
const btnText = document.getElementById('submit-btn-text');

const notice = document.getElementById('rate-limit-notice');
const countdown = document.getElementById('notice-timer');

const state = {
    status: "idle",
    secondsLeft: 0
}
let timerId = null;

function render() {
    notice.hidden = state.status !== 'rate-limited';
    btn.disabled = state.status !== 'idle';
    btnText.dataset.i18n = state.status === 'sending' ? 'sendingState' : 'idleState';
    countdown.textContent = state.secondsLeft;
}

function setState(patch) {
    const prevStatus = state.status;
    Object.assign(state, patch);
    render();

    if (prevStatus !== 'rate-limited' && state.status === 'rate-limited') {
        playNoticeAnimation();
    }
}

function playNoticeAnimation() {
  notice.animate(
    { opacity: [0, 1], transform: ['translateX(700px)', 'translateX(0)'] },
    { duration: 300, easing: 'ease-out' }
  );
}
/**
 * 
 * @param {Number} retryUntil 
 */
function startRateLimit(retryUntil){
    clearInterval(timerId);

    const tick = () => {
        const left = Math.ceil((retryUntil- Date.now()) / 1000);
        if (left <= 0) {
            resetToIdle();
            hideNotice();
            return;
        }
        setState({ status: 'rate-limited', secondsLeft: left });
    };

    tick();
    timerId = setInterval(tick, 1000);
}

function resetToIdle(){
    clearInterval(timerId);
    localStorage.removeItem(KEY);
    setState({ status: 'idle', secondsLeft: 0 });
}

export function handleRateLimit(response){
    let header  = response.headers.get('Retry-After');
    let seconds = header !== null ? Number(header) : DEFAULT_RETRY_AFTER_SECONDS;
    const retryUntil = Date.now() + seconds * 1000;
    localStorage.setItem(KEY, String(retryUntil));
    startRateLimit(retryUntil);
}

/**
 * 
 * @param {Object} obj 
 */
export async function onSubmit(obj) {
    if (state.status !== 'idle') return;
    setState({ status: 'sending' });

    try {
        const { name, email, phone, slotId, callback } = obj;
        const response = await createBooking(
            name,
            email,
            phone,
            slotId,
            callback
        )
        if (response.status === 429) {
            handleRateLimit(response);
            return;
        }
        setState({ status: 'idle' });
    } catch (err) {
        setState({ status: 'idle' });
    }
}

// Sync-ing the browser tabs
window.addEventListener('storage', (e) => {
    if (e.key !== KEY) return;
    if (e.newValue) startRateLimit(Number(e.newValue));
    else resetToIdle();
});

// initialize after the page loaded
const saved = Number(localStorage.getItem(KEY));
if (saved > Date.now()) startRateLimit(saved);
else render(); 
