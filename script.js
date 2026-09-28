// 모바일 화면에서만 메뉴를 접습니다. JavaScript가 꺼져 있어도 메뉴는 보입니다.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const mobileView = window.matchMedia('(max-width: 800px)');

function setMenu(open) {
  navigation.hidden = mobileView.matches && !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.innerHTML = open
    ? '메뉴 닫기 <span aria-hidden="true">×</span>'
    : '메뉴 열기 <span aria-hidden="true">☰</span>';
}

if (menuButton && navigation) {
  menuButton.hidden = false;
  setMenu(false);
  menuButton.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a') && mobileView.matches) {
      setMenu(false);
      menuButton.focus({ preventScroll: true });
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileView.matches && !navigation.hidden) {
      setMenu(false);
      menuButton.focus();
    }
  });
  mobileView.addEventListener('change', () => {
    const focusWasInside = navigation.contains(document.activeElement);
    setMenu(false);
    if (mobileView.matches && focusWasInside) menuButton.focus();
  });
}
