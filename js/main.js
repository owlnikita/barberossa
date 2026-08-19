
const navItems = document.querySelectorAll(".nav__item");
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

if (galleryItemsData.length > 0) {
    cutInfoTitle.textContent = galleryItemsData[0].title;
    cutInfoDesc.textContent = galleryItemsData[0].desc;
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
    img.alt = galleryItemsData[i].title;
    img.className = 'gallery__image';
    img.loading = 'lazy';
    img.decoding = 'async';
    picture.appendChild(img);

    gItem.appendChild(picture);
    galFragment.appendChild(gItem);

    gallery.appendChild(gItem);
}
gallery.appendChild(galFragment);
gallery.addEventListener('mouseover', (e) => {
    const gItem = e.target.closest('.gallery__item');
    if (!gItem) return;

    const index = gItem.dataset.index;
    cutInfoTitle.textContent = galleryItemsData[index].title;
    cutInfoDesc.textContent = galleryItemsData[index].desc;
});



// навигация
function setActive(id) {
    navItems.forEach(item => item.classList.remove('active'));
    const link = document.querySelector(`.nav__item a[href="#${id}"]`);
    if (link) link.closest('.nav__item').classList.add('active');
}

navItems.forEach(item => {
    item.addEventListener('click', function() {
        let href = this.querySelector('a').getAttribute('href').replace('#', '');
        setActive(href || 'main');
    });
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

const calendarUpdate = () => {
    const curMonth = currentDate.getMonth();
    const curYear = currentDate.getFullYear();

    const firstDay = new Date(curYear, curMonth, 0);
    const lastDay = new Date(curYear, curMonth + 1, 0);
    const totalDays = lastDay.getDate();

    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    
    let monthYearStr = currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
    monthYearStr = monthYearStr.charAt(0).toUpperCase() + monthYearStr.slice(1);
    monthYearElement.textContent = monthYearStr;

    let datesHTML = '';

    for (let i = firstDayIndex; i > 0; i--) {
        const prevDate = new Date(curYear, curMonth, 0 - i + 1);
        datesHTML += `<div class="date inactiveDay">${prevDate.getDate()}</div>`;
    }

    for (let i=1; i <= totalDays; i++) {
        const date = new Date(curYear, curMonth, i);
        const activeClass = date.toDateString() === new Date().toDateString() ? 'activeDay' : '';
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
    if (!dayItem) return;
    const activeDay = document.querySelector('.activeDay');
    const isInactive = dayItem?.classList.contains('inactiveDay');
    
    if (dayItem) {
        dayItem.classList.remove('inactiveDay');
        dayItem.classList.add('activeDay');
        if (activeDay) {
            if (isInactive) dayItem.classList.add('inactiveDay');
            activeDay.classList.remove('activeDay');
        }
        
    }
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



