
const navItems = document.querySelectorAll(".nav__item");
const staffCards = document.querySelectorAll(".staff__card");

// staff cards
const initialTransforms = [];
let offset = -30;
let scaleOffset = 0.85;
let cardInd = 3;

// gallery data
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
        desc: "The Pompadour is all about big volume up front with a smooth, lifted shape that looks sharp and confident. The sides stay neatly tapered, while the top is kept longer and brushed back for strong movement, especially on straight hair. Blow-dry upward with a round brush, then finger-shape the height. Finish with Pomade for shine, control, and all-day hold without stiffness.",
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
];
const gallery = document.querySelector(".gallery__examples"); // ul element

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

for (let i = 0; i < galleryItemsData.length; i++) {
    const gItem = document.createElement('li');
    gItem.className = 'gallery__item';

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
    picture.appendChild(img);

    gItem.appendChild(picture);
    gallery.appendChild(gItem);
}

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