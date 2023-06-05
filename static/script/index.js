
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

sideMenu();
fixedNav();
