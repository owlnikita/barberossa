import { handleDateClick } from "./slots.js";
import { playSuccessAnimation } from "./utils.js";
import { setLanguage, currentLanguage, translation } from "./i18n.js";
import { onSubmit } from './handleRateLimit.js'
import { validateContactFields } from './validation.js';
import { redirectToTelegram } from './telegramVerification.js';
import { requestEmailCode, verifyEmailCode } from './emailVerification.js';

const navItems = document.querySelectorAll(".nav__item");
const mobileHeader = document.querySelector(".mobile-header");
const burgerButton = document.querySelector(".burgerContainer");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavItems = document.querySelectorAll(".mobile-nav__item");
const staffCards = document.querySelectorAll(".staff__card");

// staff cards
const initialTransforms = [];
let offset = -30;
let scaleOffset = 0.85;
let cardInd = 3;

// gallery data
const galFragment = document.createDocumentFragment();
const fallbackImg = '../images/landscape-placeholder.svg';
const galleryItemsData = [
    {
        title: "Ирокез",
        desc: "В прическе «ирокез» боковые части коротко подстрижены, а центральная полоса остается длиннее и небрежнее, что придает объем и движение. Верхняя часть подстрижена рваными слоями, что позволяет прямым волосам легко подниматься, не выглядя жесткими. Высушите феном, направив пряди вверх, затем пальцами придайте форму «шипам» и зачесанным назад волосам. Завершите укладку текстурирующей глиной для сильной фиксации и матового текстурированного покрытия, которое держится весь день.",
        sources: {
            webp: "../images/haircut-samples/c1.webp"
        }
    },
    {
        title: "Шегги",
        desc: "Стрижка «шэг» (shag) предполагает использование небрежных слоев и мягкой челки, что создает естественный объем и динамику. Пряди по бокам остаются чуть более длинными, а сзади волосы плавно укорачиваются, формируя стильный, непринужденный силуэт. Эта стрижка отлично смотрится на прямых волосах: рваная текстура придает им прикорневой объем даже без завивки. Сушите волосы феном по направлению к лицу, уложите кончики пальцами и нанесите спрей с морской солью для создания легкой пляжной текстуры.",
        sources: {
            webp: "../images/haircut-samples/c2.webp"
        }
    },
    {
        title: "Помпадур",
        desc: "Прическа «помпадур» – это большой объем спереди и гладкая, приподнятая форма, которая выглядит четко и уверенно. Боковые пряди аккуратно подстрижены, а верхняя часть остается длиннее и зачесывается назад для создания движения, особенно на прямых волосах. Высушите волосы феном, используя круглую щетку, затем придайте объем пальцами. Завершите укладку помадой для блеска, контроля и фиксации на весь день без жесткости.",
        sources: {
            webp: "../images/haircut-samples/c3.webp"
        }
    },
    {
        title: "Пробор посередине",
        desc: "Пробор посередине придает прямым волосам стильную форму благодаря длинным передним прядям, разделенным строго по центру. Верхняя часть волос сохраняет легкость и многослойность, поэтому они лежат естественно и обрамляют лицо, не теряя объема. Высушите волосы феном, направляя пряди от пробора для создания мягкого прикорневого объема, а затем разгладьте кончики кремом для укладки — это придаст прическе аккуратный вид и блеск, а также позволит легко менять укладку.",
        sources: {
            webp: "../images/haircut-samples/c4.webp"
        }
    },
    {
        title: "Небрежная челка",
        desc: "Стрижка с небрежной челкой придает прямым волосам легкость и фактурность благодаря неравномерным слоям, которые ниспадают на лицо, создавая ощущение динамики. Более короткие пряди по бокам позволяют челке выделяться, не утяжеляя образ. При сушке феном направляйте волосы у лба вниз и слегка вбок, а затем используйте текстурирующую пудру, чтобы приподнять их у корней и создать естественный, слегка небрежный эффект.",
        sources: {
            webp: "../images/haircut-samples/c5.webp"
        }
    },
    {
        title: "Temple Fade (Brooklyn Fade)",
        desc: "Стрижка «Temple Fade» позволяет аккуратно уложить боковые части, сделав резкий переход от висков, в то время как верхняя часть остается длиннее, создавая чистую и стильную форму. Она добавляет контраст и придает стрижке свежий вид, не делая ее слишком броской, особенно на прямых волосах. Это одна из самых универсальных стрижек «Temple Fade» для мужчин, которые хотят получить четкий, аккуратный результат, не перебарщивая с яркостью. Высушите волосы на макушке феном, направив их вперед или вверх для легкого объема, затем придайте форму пальцами и закрепите моделирующей пастой для гибкой фиксации и гладкой текстуры.",
        sources: {
            webp: "../images/haircut-samples/c6.webp"
        }
    },
    {
        title: "Современный маллет",
        desc: "A Modern Mullet for straight hair keeps the sides tight and clean while the back stays longer for a cool, edgy finish. The top is layered and slightly messy, giving natural lift and smooth movement without looking heavy. This is one of the most effortless Modern Mullet styles for men with straight hair who want clean contrast with a relaxed, layered finish. Blow-dry forward and up using your fingers, then rub in a small amount of Molding Paste to shape the layers and add flexible hold.",
        sources: {
            webp: "../images/haircut-samples/c7.webp"
        }
    },
    {
        title: "Берст-фейд",
        desc: "Эта стрижка с переходом типа «burst fade» для прямых волос отличается плавным дугообразным контуром вокруг уха, что придает образу четкость и спортивный стиль, в то время как волосы сверху остаются короткими и текстурированными. Аккуратная окантовка на шее и плавный переход делают эту прическу отличным вариантом как для школы, так и для выходных. При укладке слегка приподнимите переднюю часть волос феном, а затем нанесите немного текстурирующей глины для фиксации, создания формы и придания легкого объема.",
        sources: {
            webp: "../images/haircut-samples/c8.webp"
        }
    },
];
const galleryContentKeys = [
    { title: "galleryMohawk", description: "galleryMohawkDescription" },
    { title: "galleryShag", description: "galleryShagDescription" },
    { title: "galleryPompadour", description: "galleryPompadourDescription" },
    { title: "galleryMiddlePart", description: "galleryMiddlePartDescription" },
    { title: "galleryMessyFringe", description: "galleryMessyFringeDescription" },
    { title: "galleryTempleFade", description: "galleryTempleFadeDescription" },
    { title: "galleryModernMullet", description: "galleryModernMulletDescription" },
    { title: "galleryBurstFade", description: "galleryBurstFadeDescription" }
];
const gallery = document.querySelector(".gallery__examples"); // ul element

const cutInfoTitle = document.querySelector('.cut-info__title');
const cutInfoDesc = document.querySelector('.cut-info__desc');

staffCards[0].style.zIndex = cardInd;
cardInd--;
initialTransforms.push('translateX(0px) scale(1)');
// Расстановка карточек сотрудников
for (let i = 1; i < staffCards.length; i++) {
    const transform = `translateX(${offset}px) scale(${scaleOffset})`;
    staffCards[i].style.transform = transform;
    staffCards[i].style.zIndex = cardInd;
    initialTransforms.push(transform);
    cardInd--;
    offset -= 60;
    scaleOffset -= 0.1;
}

// Карточки галлереи
let selectedHaircutIndex = 0;

function selectHaircut(gItem) {
    const index = Number(gItem.dataset.index);
    const haircut = galleryItemsData[index];
    const keys = galleryContentKeys[index];
    if (!haircut || !keys) return;

    selectedHaircutIndex = index;
    cutInfoTitle.textContent = translation(keys.title);
    cutInfoDesc.textContent = translation(keys.description);
    gItem.querySelector("img").alt = translation(keys.title);
    gallery.querySelectorAll('.gallery__item').forEach(item => item.classList.remove('is-selected'));
    gItem.classList.add('is-selected');
}

for (let i = 0; i < galleryItemsData.length; i++) {
    const gItem = document.createElement('li');
    gItem.className = 'gallery__item';
    gItem.dataset.index = i;

    const picture = document.createElement('picture');

    const source = document.createElement('source');
    source.srcset = galleryItemsData[i].sources.webp;
    source.type = 'image/webp';
    source.className = 'gallery__image';
    picture.appendChild(source);

    const img = document.createElement('img');
    img.src = fallbackImg; // fallback
    img.alt = translation(galleryContentKeys[i].title);
    img.className = 'gallery__image';
    img.loading = 'lazy';
    img.decoding = 'async';
    picture.appendChild(img);

    gItem.appendChild(picture);
    galFragment.appendChild(gItem);

    gallery.appendChild(gItem);
}
gallery.appendChild(galFragment);
const initialGalleryItem = gallery.querySelector('.gallery__item');
if (initialGalleryItem) {
    selectHaircut(initialGalleryItem);
}

gallery.addEventListener('mouseover', (e) => {
    const gItem = e.target.closest('.gallery__item');
    if (!gItem) return;

    selectHaircut(gItem);
});

gallery.addEventListener('click', (e) => {
    const gItem = e.target.closest('.gallery__item');
    if (!gItem) return;

    selectHaircut(gItem);
});



// навигация
function setActive(id) {
    document.querySelectorAll('.nav__item, .mobile-nav__item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll(`a[href="#${id}"]`).forEach(link => {
        link.closest('.nav__item, .mobile-nav__item')?.classList.add('active');
    });
}

navItems.forEach(item => {
    item.addEventListener('click', function() {
        let href = this.querySelector('a').getAttribute('href').replace('#', '');
        setActive(href || 'main');
    });
});

mobileNavItems.forEach(item => {
    item.addEventListener('click', function() {
        const href = this.querySelector('a').getAttribute('href').replace('#', '');
        setActive(href || 'main');
        mobileHeader.classList.remove('is-open');

        setMenuExpanded(false);
    });
});

mobileNav.querySelector('.mobile-nav__button').addEventListener('click', () => {
    mobileHeader.classList.remove('is-open');
    setMenuExpanded(false);
});

burgerButton.addEventListener('click', () => {
    const isExpanded = !mobileHeader.classList.contains("is-open");
    setMenuExpanded(isExpanded);
});

// скролл
const sections = document.querySelectorAll('[id]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setActive(entry.target.id);
        }
    });
}, {
    rootMargin: '-10% 0px -70% 0px',
    threshold: 0
});
setActive('main');
sections.forEach(s => {
    if (s.id && s.offsetHeight > 50) observer.observe(s);
});

window.addEventListener('scroll', () => {
    if (window.scrollY < 100) {
        setActive('main');
    }
});

// calendar
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const monthYearElement = document.getElementById('monthYear');
const days = document.getElementById('days');

const currentDate = new Date();
const actualDate = new Date();
let selectedDate = null;
let dateConfirmed = false;

console.log(selectedDate);
const calendarUpdate = () => {
    const curMonth = currentDate.getMonth();
    const curYear = currentDate.getFullYear();

    const firstDay = new Date(curYear, curMonth, 0);
    const lastDay = new Date(curYear, curMonth + 1, 0);
    const totalDays = lastDay.getDate();

    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    
    const monthKeys = [
        "monthJanuary", "monthFebruary", "monthMarch", "monthApril",
        "monthMay", "monthJune", "monthJuly", "monthAugust",
        "monthSeptember", "monthOctober", "monthNovember", "monthDecember"
    ];
    const month = translation(monthKeys[curMonth]);
    const monthYearStr = `${month} ${curYear}`;
    monthYearElement.textContent = monthYearStr;

    let datesHTML = '';

    for (let i = firstDayIndex; i > 0; i--) {
        const prevDate = new Date(curYear, curMonth, 0 - i + 1);
        datesHTML += `<div class="date inactiveDay">${prevDate.getDate()}</div>`;
    }

    for (let i=1; i <= totalDays; i++) {
        // Формируем строку вида YYYY-MM-DD для текущего дня в цикле
        const dayStr = String(i).padStart(2, '0');
        const monthStr = String(curMonth + 1).padStart(2, '0');
        const formattedCurrentDate = `${curYear}-${monthStr}-${dayStr}`;

        const isSelected = selectedDate === formattedCurrentDate;

        const dateObj = new Date(curYear, curMonth, i);
        const isToday = dateObj.toDateString() === new Date().toDateString();
        let activeClass = '';
        if (isSelected || (selectedDate === null && isToday)) {
            activeClass = 'activeDay';
        }
        datesHTML += `<div class="date ${activeClass}">${i}</div>`;
    }

    for (let i=1; i <= 6-lastDayIndex+1; i++) {
        const nextDate = new Date(curYear, curMonth+1, i);
        datesHTML += `<div class="date inactiveDay">${nextDate.getDate()}</div>`;
    }
    days.innerHTML = datesHTML;

}

calendarUpdate();


days.addEventListener('click', (e) => {
    const dayItem = e.target.closest('.date');

    if (!dayItem || dayItem.classList.contains('inactiveDay')) return;

    const currentActive = days.querySelector('.activeDay');
    if (currentActive) {
        currentActive.classList.remove('activeDay');
    }

    dayItem.classList.add('activeDay');

    const curYear = currentDate.getFullYear();
    const curMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const curDay = dayItem.textContent.padStart(2, '0');

    selectedDate = `${curYear}-${curMonth}-${curDay}`;

    handleDateClick(selectedDate);
});

prevBtn.addEventListener('click', () => {
    if (currentDate.getMonth()-1 < actualDate.getMonth()) {
        return
    }
    currentDate.setMonth(currentDate.getMonth()-1);
    calendarUpdate();
});

nextBtn.addEventListener('click', () => {
    if (currentDate.getMonth() > actualDate.getMonth()+1) {
        return
    }
    currentDate.setMonth(currentDate.getMonth()+1);
    calendarUpdate();
});

const chooseDateBtn = document.getElementById('chooseDate');
const applyBtn = document.getElementById('applyBtn');
const applyPopup = document.getElementById('applyPopup');
const popupBox = document.getElementById('calendar');
const confirmBtn = document.getElementById('confirmBtn');
const fieldPhrase = document.querySelector('.field-phrase');
const formElem = document.querySelector('.apply-form');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone-number');
const emailError = document.querySelector('#email-error');
const phoneError = document.querySelector('#phone-error');
const telegramVerificationStatus = document.querySelector('#telegram-verification-status');
const emailVerificationStatus = document.querySelector('#email-verification-status');
const emailVerificationPopup = document.querySelector('#email-verification-popup');
const emailCodeConfirmationForm = document.querySelector('#email-code-confirmation-form');
const emailVerificationCode = document.querySelector('#email-verification-code');
const emailCodeStatus = document.querySelector('#email-code-status');
const emailCodeRecipient = document.querySelector('#email-code-recipient');
let contactValidationAttempted = false;

function setVerificationStatus(element, messageKey) {
    element.hidden = !messageKey;
    if (messageKey) {
        element.dataset.i18n = messageKey;
        element.textContent = translation(messageKey);
    }
}

function closeEmailVerificationPopup() {
    emailVerificationPopup.classList.add('hide');
}

function openEmailVerificationPopup() {
    emailCodeConfirmationForm.reset();
    setVerificationStatus(emailCodeStatus, null);
    emailCodeRecipient.textContent = emailInput.value.trim();
    emailVerificationPopup.classList.remove('hide');
    emailVerificationCode.focus();
}

function renderContactValidation(errors) {
    for (const [field, input, errorElement] of [
        ['email', emailInput, emailError],
        ['phone', phoneInput, phoneError]
    ]) {
        const messageKey = errors[field];
        input.setAttribute('aria-invalid', String(Boolean(messageKey)));
        errorElement.hidden = !messageKey;

        if (messageKey) {
            errorElement.dataset.i18n = messageKey;
            errorElement.textContent = translation(messageKey);
        }
    }
}

for (const input of [emailInput, phoneInput]) {
    input.addEventListener('input', () => {
        if (contactValidationAttempted) {
            renderContactValidation(validateContactFields({
                email: emailInput.value,
                phone: phoneInput.value
            }));
        }
    });
}

document.querySelector('#telegram-verify-button').addEventListener('click', async () => {
    const phone = phoneInput.value.trim();
    const errors = validateContactFields({ email: emailInput.value, phone });
    if (errors.phone) {
        renderContactValidation(errors);
        phoneInput.focus();
        return;
    }

    try {
        const result = await redirectToTelegram(phone);
        setVerificationStatus(
            telegramVerificationStatus,
            result.status === 'not-configured' ? 'verificationNotConfigured' : 'telegramVerificationStarted'
        );
    } catch (error) {
        setVerificationStatus(telegramVerificationStatus, 'verificationFailed');
        console.error('Could not start Telegram verification.', error);
    }
});

document.querySelector('#email-code-request-button').addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const errors = validateContactFields({ email, phone: phoneInput.value });
    if (errors.email) {
        renderContactValidation(errors);
        emailInput.focus();
        return;
    }

    try {
        const result = await requestEmailCode(email);
        if (result.status === 'sent') {
            setVerificationStatus(emailVerificationStatus, null);
            openEmailVerificationPopup();
            return;
        }
        setVerificationStatus(emailVerificationStatus, 'verificationNotConfigured');
    } catch (error) {
        setVerificationStatus(emailVerificationStatus, 'verificationFailed');
        console.error('Could not send an email verification code.', error);
    }
});

emailCodeConfirmationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const code = emailVerificationCode.value.trim();

    try {
        const result = await verifyEmailCode(email, code);
        if (result.status === 'verified') {
            closeEmailVerificationPopup();
            setVerificationStatus(emailVerificationStatus, 'emailVerificationComplete');
            return;
        }
        setVerificationStatus(
            emailCodeStatus,
            result.status === 'invalid' ? 'emailCodeInvalid' : 'verificationNotConfigured'
        );
    } catch (error) {
        setVerificationStatus(emailCodeStatus, 'verificationFailed');
        console.error('Could not verify the email code.', error);
    }
});

document.querySelector('#email-verification-close').addEventListener('click', closeEmailVerificationPopup);
emailVerificationPopup.addEventListener('click', (event) => {
    if (event.target === emailVerificationPopup) {
        closeEmailVerificationPopup();
    }
});
emailVerificationPopup.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeEmailVerificationPopup();
    }
});

function openPopup() {
    applyPopup.classList.remove('hide');
}
function closePopup() {
    applyPopup.classList.add('hide');
}

function setAfterDate(callback) {
    // const dateList = [currentDate.toLocaleString('default', { month: 'long' }), currentDate.getDate(), currentDate.getFullYear()];
    // let fullDate = dateList.join('-')
    // fullDate = fullDate.charAt(0).toUpperCase() + fullDate.slice(1);
    fieldPhrase.textContent = selectedDate;
    dateConfirmed = selectedDate !== null;
    if (callback) {
        callback();
    }
}

chooseDateBtn.addEventListener('click', () => {
    applyPopup.classList.remove('hide');
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
});

chooseDateBtn.addEventListener('click', () => {
    openPopup();
})

popupBox.addEventListener('click', e => {
    e.stopPropagation();
})

applyPopup.addEventListener('click', () => {
    closePopup();
});

confirmBtn.addEventListener('click', () => {
    setAfterDate(closePopup);
});

formElem.addEventListener('submit', (e) => {
    e.preventDefault(); 

    contactValidationAttempted = true;
    const contactErrors = validateContactFields({
        email: emailInput.value,
        phone: phoneInput.value
    });
    renderContactValidation(contactErrors);

    const firstInvalidContact = contactErrors.email
        ? emailInput
        : contactErrors.phone
            ? phoneInput
            : null;
    if (firstInvalidContact) {
        firstInvalidContact.focus();
        return;
    }

    if (!document.querySelector('#name').reportValidity()) {
        return;
    }

    const slotItem = document.querySelector('input[name="slot"]:checked');
    if (!slotItem) {
        formElem.querySelector('input[name="slot"]')?.reportValidity();
        return;
    }
    const slotId = slotItem.getAttribute('slotid');
    onSubmit({
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        phone: document.querySelector('#phone-number').value,
        slotId: slotId,
        callback: playSuccessAnimation
    });
})

function updateBurgerLabel(){
    const isExpanded = burgerButton.getAttribute("aria-expanded") === "true";
    const key = isExpanded ? "closeMenu" : "openMenu";

    burgerButton.setAttribute("aria-label", translation(key));
}

function setMenuExpanded(isExpanded) {
    mobileHeader.classList.toggle("is-open", isExpanded);
    burgerButton.setAttribute("aria-expanded", String(isExpanded));
    updateBurgerLabel();
}

const languageToggles = document.querySelectorAll(".languageToggle");

function updateLanguageToggleLabels() {
    const key = currentLanguage === "ru" ? "switchToEnglish" : "switchToRussian";
    languageToggles.forEach(button => {
        button.textContent = translation(key);
    });
}

function applyLanguage(language) {
    setLanguage(language);
    gallery.querySelectorAll(".gallery__item").forEach((item) => {
        const keys = galleryContentKeys[Number(item.dataset.index)];
        if (keys) {
            item.querySelector("img").alt = translation(keys.title);
        }
    });
    const selectedItem = gallery.querySelector(`[data-index="${selectedHaircutIndex}"]`);
    if (selectedItem) {
        selectHaircut(selectedItem);
    }
    calendarUpdate();
    if (dateConfirmed) {
        fieldPhrase.textContent = selectedDate;
    }
    updateBurgerLabel();
    updateLanguageToggleLabels();
}

applyLanguage(currentLanguage);

languageToggles.forEach((languageToggle) => {
    languageToggle.addEventListener("click", () => {
        const nextLanguage = currentLanguage === "ru" ? "en" : "ru";
        applyLanguage(nextLanguage);
    });
});