export function tabs() {
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsParent = document.querySelector('.tabheader__items');
  function hideTAbContent() {
    tabsContent.forEach(value => {
      value.classList.add('hide');
      value.classList.remove('show', 'fade');
    });
    tabs.forEach(value => {
      value.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTAbContent();
  showTabContent();

  tabsParent.addEventListener('click', ev => {
    const target = ev.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((value, index) => {
        if (value === target) {
          hideTAbContent();
          showTabContent(index);
        }
      });
    }
  });
}
