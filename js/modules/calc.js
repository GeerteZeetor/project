export function calc() {
  const resultKal = document.querySelector('.calculating__result span');
  let sex = localStorage.getItem('sex')
      ? localStorage.getItem('sex')
      : 'female',
    height,
    weight,
    age,
    ratio = localStorage.getItem('ratio')
      ? localStorage.getItem('ratio')
      : 1.375;

  localStorage.setItem('sex', sex);
  localStorage.setItem('ratio', ratio);
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (
        elem.getAttribute('data-ratio') === localStorage.getItem('ratio') ||
        elem.getAttribute('id') === localStorage.getItem('sex')
      ) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );
  function calcTotal() {
    if (!sex || !age || !height || !weight || !ratio) {
      resultKal.textContent = '____';
      return;
    }

    if (sex === 'female') {
      resultKal.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      resultKal.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal();

  function getStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.addEventListener('click', ev => {
        if (ev.target.getAttribute('data-ratio')) {
          ratio = +ev.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +ev.target.getAttribute('data-ratio'));
        } else {
          sex = ev.target.getAttribute('id');
          localStorage.setItem('sex', ev.target.getAttribute('id'));
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        ev.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getStaticInfo('#gender div', 'calculating__choose-item_active');
  getStaticInfo(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  function getDinamicInfo(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', ev => {
      if (input.value.match(/\D/g)) {
        ev.target.style.border = 'solid 1px red';
      } else {
        ev.target.style.border = 'none';
        switch (ev.target.getAttribute('id')) {
          case 'height':
            height = +input.value;
            break;
          case 'weight':
            weight = +input.value;
            break;
          case 'age':
            age = +input.value;
            break;
        }
        calcTotal();
      }
    });
  }

  getDinamicInfo('#height');
  getDinamicInfo('#weight');
  getDinamicInfo('#age');
}
