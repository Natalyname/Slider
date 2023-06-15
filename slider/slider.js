// js  слайдера - описание того, как он будет работать

class Slaider {
    constructor(selector, options = {}) {
        this.sliderEl = document.querySelector(selector);
        if (!this.sliderEl) {
            throw new Error('wrong selector');
        }
        this.width = options.width ?? 1080;
        this.height = options.height ?? 720;
        this.slides = this.sliderEl.querySelectorAll('.slider-item');
        this.slideIdx = 0; //индекс текущего дива, который д.б. показан
    }

    init() {
      this.sliderEl.style.width = `${this.width}px`;
      this.sliderEl.style.height = `${this.height}px`;

      const leftArrow = document.createElement('i');
      leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
      this.sliderEl.append(leftArrow);

      const rightArrow = document.createElement('i');
      rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
      this.sliderEl.append(rightArrow);

      const run = () => {
        leftArrow.addEventListener('click', () => {
            this.setPrevSlide();
        });
        rightArrow.addEventListener('click', () => {
            this.setNextSlide();
        });


      this.slides[this.slideIdx].classList.remove('hidden-slide');
    };

      const firstImg = this.slides[this.slideIdx].querySelector('img');
      if (firstImg.complete) {
        run();
        return;
      } 

      const loadIcon = document.createElement('i');
      loadIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
      this.sliderEl.prepend(loadIcon);

      firstImg.addEventListener('load', ()  => {
        loadIcon.remove();
        run();
      });
    }

    setNextSlide() {
        this.slides[this.slideIdx].classList.add('hidden-slide');
        if (this.slideIdx === this.slides.length - 1) {
            this.slideIdx = 0;
        } else {
            this.slideIdx++;
        }
        this.slides[this.slideIdx].classList.remove('hidden-slide');
    }

    setPrevSlide() {
        this.slides[this.slideIdx].classList.add('hidden-slide'); //добавляем класс, кот. скрывает картинку
        if (this.slideIdx === 0) {                                //меняем индекс
            this.slideIdx = this.slides.length - 1;
        } else {
            this.slideIdx--;
        }                                  
        this.slides[this.slideIdx].classList.remove('hidden-slide');  //у след картинки убираем класс, кот. скрывает картинку
    }
}

// const slider = new Slaider('.slider', {
//     width: 720,
//     height: 480,
// });
// slider.init();
