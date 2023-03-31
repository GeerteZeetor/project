const tabs = document.querySelectorAll('.tabheader__item');
const tabsContent = document.querySelectorAll('.tabcontent');
const tabsParent = document.querySelector('.tabheader__items');
const btnModal = document.querySelectorAll('[data-modal]');
const modalWindow = document.querySelector('.modal');
const forms = document.querySelectorAll('form');
const prevModalDialog = document.querySelector('.modal__dialog');
const deadline = '2023-05-09';
document.addEventListener('DOMContentLoaded', () => {
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

  function getTimeRemaining(endTime) {
    const t = Date.parse(endTime) - new Date();
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    }
    return num;
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endTime);
      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) clearInterval(timeInterval);
    }
  }

  setClock('.timer', deadline);

  function closeModalWindow() {
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
  }

  function showModalWindow() {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTimerId);
  }

  const modalTimerId = setTimeout(showModalWindow, 50000);

  btnModal.forEach(el => {
    el.addEventListener('click', () => {
      showModalWindow();
    });
  });

  modalWindow.addEventListener('click', ev => {
    if (
      ev.target === modalWindow ||
      ev.target.getAttribute('data-close') == ''
    ) {
      closeModalWindow();
    }
  });

  document.addEventListener('keydown', ev => {
    if (ev.key == 'Escape' && modalWindow.classList.contains('show')) {
      closeModalWindow();
    }
  });

  function scrollModalListener() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      showModalWindow();
      window.removeEventListener('scroll', scrollModalListener);
    }
  }

  window.addEventListener('scroll', scrollModalListener);

  class MenuCard {
    constructor(img, altimg, title, descr, price, parentSelector, ...clases) {
      this.img = img;
      this.altimg = altimg;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 80;
      this.classes = clases;
      this.parent = document.querySelector(parentSelector);
      this.changeToRUB();
    }

    changeToRUB() {
      this.price *= this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        element.classList.add('menu__item');
      }
      this.classes.forEach(className => element.classList.add(className));
      element.innerHTML = `
          <img src="${this.img}" alt="${this.altimg}">
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
          </div>
      `;
      this.parent.append(element);
    }
  }

  const getData = async url => {
    const res = await fetch(url);
    if (!res.ok)
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);

    return await res.json();
  };

  getData('http://localhost:3000/menu').then(data => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        '.menu .container',
        'menu__item'
      ).render();
    });
  });

  const message = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся.',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach(form => {
    bindPostData(form);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: data,
    });
    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener('submit', ev => {
      ev.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block; 
      margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    prevModalDialog.classList.add('hide');
    showModalWindow();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>    
        <div class="modal__title">${message}</div>
    </div>
    `;
    modalWindow.append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove('hide');
      prevModalDialog.classList.add('show');
      closeModalWindow();
    }, 4000);
  }

  fetch('http://localhost:3000/menu')
    .then(res => res.json())
    .then(res => console.log(res));
});
