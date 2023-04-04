export function slider() {
  const slider = document.querySelector('.offer__slider');
  const sliderList = document.querySelectorAll('.offer__slide');
  const currentSlide = document.querySelector('#current');
  const sliderPrevBtn = document.querySelector('.offer__slider-prev');
  const sliderNextBtn = document.querySelector('.offer__slider-next');
  const totalSlides = document.querySelector('#total');
  const slidesWrapper = document.querySelector('.offer__slider-wrapper');
  const slideField = document.querySelector('.offer__slider-inner');
  const widthSlide = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1;
  let offset = 0;
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    }
    return num;
  }

  totalSlides.textContent = getZero(sliderList.length);
  slideField.style.width = 100 * sliderList.length + '%';
  slideField.style.display = 'flex';
  slideField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';

  sliderList.forEach(slide => {
    slide.style.width = widthSlide;
  });

  slider.style.position = 'relative';

  const dots = document.createElement('ol');
  const dotsArr = [];
  dots.classList.add('carusel-inicators');
  dots.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(dots);
  for (let i = 0; i < sliderList.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    dots.append(dot);
    dotsArr.push(dot);
  }

  const activeDot = () => {
    dotsArr.forEach(dot => (dot.style.opacity = '0.5'));
    dotsArr[slideIndex - 1].style.opacity = 1;
  };

  const parseToNumber = str => {
    return Number.parseInt(str);
  };

  sliderNextBtn.addEventListener('click', ev => {
    if (offset === parseToNumber(widthSlide) * (sliderList.length - 1)) {
      offset = 0;
      slideIndex = 1;
    } else {
      offset += parseToNumber(widthSlide);
      slideIndex++;
    }
    currentSlide.textContent = getZero(slideIndex);
    slideField.style.transform = `translateX(-${offset}px)`;
    activeDot();
  });

  sliderPrevBtn.addEventListener('click', ev => {
    if (offset == 0) {
      offset = parseToNumber(widthSlide) * (sliderList.length - 1);
      slideIndex = sliderList.length;
    } else {
      offset -= parseToNumber(widthSlide);
      slideIndex--;
    }
    currentSlide.textContent = getZero(slideIndex);
    slideField.style.transform = `translateX(-${offset}px)`;
    activeDot();
  });

  dotsArr.forEach(dot =>
    dot.addEventListener('click', ev => {
      const slideTo = ev.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      offset = parseToNumber(widthSlide) * (slideTo - 1);
      currentSlide.textContent = getZero(slideIndex);
      slideField.style.transform = `translateX(-${offset}px)`;
      activeDot();
    })
  );
  fetch('http://localhost:3000/menu')
    .then(res => res.json())
    .then(res => res);
}
