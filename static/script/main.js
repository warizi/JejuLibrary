const slideContainer = document.querySelector('.slide_container');
const totalNum = document.querySelector('.total_num');
const currentNum = document.querySelector('.current_num');
const prevBtn = document.querySelector('#prev_slide_btn');
const nextBtn = document.querySelector('#next_slide_btn');

//fixed nav
function fixedNav () {
    const topBtn = document.querySelector('#top_btn');
    //스크롤 감지, TOP버튼이 일정 스크롤 이상 시 노출
    window.addEventListener('scroll', () => {
        if(window.pageYOffset > 90 ) {
            topBtn.style.display = 'block';
        } else {
            topBtn.style.display = 'none';
        }
    })
    //TOP버튼 클릭 시 맨위 자동 스크롤
    topBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })
}
//사이드 메뉴 토글
function sideMenu () {
    const backBtn = document.querySelector('.back_btn');
    const menu = document.querySelector('.not_all_menu');
    const menuBtn = document.querySelector('.side_menu_btn');
    menuBtn.addEventListener('click', () => {
        menu.classList.add('all_menu');
    });
    backBtn.addEventListener('click', () => {
        menu.classList.remove('all_menu');
    });
}

//슬라이드
function slideFn () {
    const slideWidth = slideContainer.clientWidth;
    const slideItemWidth = 305;
    const slideCount = slideWidth / slideItemWidth;
    totalNum.textContent = slideCount;

    //슬라이드 복제 (무한루프 모방)
    const clonedSlide = slideContainer.cloneNode(true);
    slideContainer.lastElementChild.insertAdjacentElement('afterend', clonedSlide);
    const clonedSlideLast = slideContainer.lastElementChild.lastElementChild.cloneNode(true);
    slideContainer.firstElementChild.insertAdjacentElement('beforebegin', clonedSlideLast);

    let btnCount = 1;
    let slideTranslate = -305;
    let btnDisabled = true;
    slideContainer.style.transform = `translateX(${slideTranslate}px)`;

    //실제 좌우로 움직이는 함수 (transition-delay, translateX)
    function slideControler(time, slideTranslate) {
        btnDisabled = false;
        currentNum.textContent = btnCount;
        slideContainer.style.transition = time;
        slideContainer.style.transform = `translateX(${slideTranslate}px)`;
    }
    // 이전 슬라이드
    function goToPrevSlide () {
        if(btnCount > 1 && btnDisabled) {
            btnCount -= 1;
            slideTranslate += 305;
            slideControler('0.5s', slideTranslate);
        } else if (btnCount === 1 && btnDisabled) {
            btnCount = 15;
            slideTranslate += 305;
            slideControler('0.5s', slideTranslate);
            slideTranslate = -(slideWidth + 305);
        }
    }
    // 다음 슬라이드 기능
    function goToNextSlide () {
        if(btnCount < slideCount && btnDisabled) {
            btnCount += 1;
            slideTranslate -= 305;
            slideControler('0.5s', slideTranslate);
        } else if (btnCount === slideCount && btnDisabled) {
            btnCount = 1;
            slideTranslate -= 305;
            slideControler('0.5s', slideTranslate);
        }
    }
    // 애니메이션 동작중일 때 버튼 조작 못하게 (무한루프 구현 위해서)
    slideContainer.addEventListener('transitionend', () => {
        //transition-delay가 끝날 때 좌우 슬라이드 위치 조정
        if (btnCount === 1) {
            slideTranslate = -305;
            slideControler('0s', slideTranslate);
        } else if (btnCount === 15) {
            slideTranslate = -slideWidth;
            slideControler('0s', slideTranslate);
        }
        //다시 버튼 활성화
        btnDisabled = true;
    })
    //버튼에 기능 할당
    prevBtn.addEventListener('click', () => {
        goToPrevSlide();
        clearTimeout(slideAuto);
        slideAutoFn();
    });
    nextBtn.addEventListener('click', () => {
        goToNextSlide();
        clearTimeout(slideAuto);
        slideAutoFn();
    });

    //자동 슬라이드 기능
    let slideAuto ;
    function slideAutoFn () {
        slideAuto = setTimeout(() => {
            goToNextSlide();
            slideAutoFn();
        }, 5000)
    }
    slideAutoFn();
}
//전역변수를 피하기위해 기능을 함수로 묶음.
sideMenu();
slideFn();
fixedNav();

