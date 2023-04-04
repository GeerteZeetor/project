import { showModalWindow } from './modal';
import { closeModalWindow } from './modal';
import { postData } from '../services/services';

export function forms() {
  const forms = document.querySelectorAll('form');
  const prevModalDialog = document.querySelector('.modal__dialog');
  const modalWindow = document.querySelector('.modal');
  const message = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся.',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach(form => {
    bindPostData(form);
  });

  function showThanksModal(message) {
    prevModalDialog.classList.add('hide');
    showModalWindow('.modal');
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
      closeModalWindow('.modal');
    }, 4000);
  }

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
}
