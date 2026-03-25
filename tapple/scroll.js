let ph = window.innerHeight;
const root = document.documentElement;
const gPercent = document.querySelectorAll('.scroll:not(.fun),.fx:not(.fun),.prog:not(.fun),.shine:not(.fun),.trans.s-b:not(.fun),.trans.b-s:not(.fun)');
const gPfunc = document.querySelectorAll('.func');
const gCenter = document.querySelectorAll('.lock,.fx.h,.trans.s-b,.trans.b-s');
const gHighlight = document.querySelectorAll('.highlight');
const gShow = document.querySelectorAll('.lock,.fx.h,.trans.s-b,.trans.b-s');
const gStopcenter = document.querySelectorAll('.stop-center');
let my_scroll = () => {};

function isMobileLayout() {
    return window.innerWidth <= 900;
}

function setViewportVars() {
    ph = window.innerHeight;
    root.style.setProperty('--ph', ph + 'px');
}

function setMobileStaticState() {
    gPercent.forEach(el => el.style.setProperty('--scroll', '50%'));
    gPfunc.forEach(el => el.style.setProperty('--scroll', '50%'));
    gCenter.forEach(el => el.style.setProperty('--translate', '0px'));
    gHighlight.forEach(el => el.classList.add('show'));
    gShow.forEach(el => el.classList.add('show'));
    gStopcenter.forEach(el => el.classList.remove('stop'));
    $('#title').removeClass('start');
}

function updateDesktopEffects(scrollTop) {
    if (scrollTop === 0) {
        $('#title').addClass('start');
    } else {
        $('#title').removeClass('start');
    }

    gPercent.forEach(el => {
        const percent = (ph + scrollTop - el.offsetTop) / (ph + el.offsetHeight) * 100;
        el.style.setProperty('--scroll', percent + '%');
    });

    gPfunc.forEach(el => {
        const eased = (4 * ((ph + scrollTop - el.offsetTop) / (ph + el.offsetHeight) - 0.5) ** 3 + 0.5) * 100;
        el.style.setProperty('--scroll', eased + '%');
    });

    gCenter.forEach(el => {
        el.style.setProperty('--translate', ph + scrollTop - el.offsetTop - (ph + el.offsetHeight) / 2 + 'px');
    });

    gHighlight.forEach(el => {
        if (el.offsetTop - scrollTop < 0.7 * ph) el.classList.add('show');
        else el.classList.remove('show');
    });

    gShow.forEach(el => {
        if (scrollTop < el.offsetTop + el.offsetHeight && el.offsetTop - ph < scrollTop) el.classList.add('show');
        else el.classList.remove('show');
    });

    gStopcenter.forEach(el => {
        if (ph + scrollTop - el.offsetTop >= (ph + el.offsetHeight) / 2) el.classList.add('stop');
        else el.classList.remove('stop');
    });

    my_scroll(scrollTop);
}

function updateEffects() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (isMobileLayout()) {
        setMobileStaticState();
        my_scroll(scrollTop);
        return;
    }
    updateDesktopEffects(scrollTop);
}

setViewportVars();
window.addEventListener('resize', () => {
    setViewportVars();
    updateEffects();
}, { passive: true });
window.addEventListener('scroll', updateEffects, { passive: true });
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    updateEffects();
});
window.addEventListener('pageshow', () => {
    window.scrollTo(0, 0);
    updateEffects();
});
window.scrollTo(0, 0);
updateEffects();
