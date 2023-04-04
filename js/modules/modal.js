const modalWindow = document.querySelector('.modal');
const btnModal = document.querySelectorAll('[data-modal]');
const modalTimerId = setTimeout(showModalWindow, 50000);

export function showModalWindow() {
  modalWindow.classList.add('show');
  modalWindow.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  clearTimeout(modalTimerId);
}

export function closeModalWindow() {
  modalWindow.classList.add('hide');
  modalWindow.classList.remove('show');
  document.body.style.overflow = '';
}

export function modal() {
  function closeModalWindow() {
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
  }

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
}
