import { getData } from '../services/services';

export function cards() {
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
}
