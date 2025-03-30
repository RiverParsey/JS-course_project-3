import Slider from './slider';

export default class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
  }

  decorizeSlides() {
    let slides = this.container.children; // всегда содержит актуальный список элементов

    Array.from(slides).forEach(slide => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        let title = slide.querySelector('.card__title');
        let arrow = slide.querySelector('.card__controls-arrow');
        if (title) {
          title.style.opacity = '.4';
        }
        if (arrow) {
          arrow.style.opacity = '.4';
        }
      }
    });

    if (!slides[0].closest('button')) {
      slides[0].classList.add(this.activeClass);
    }

    if (this.animate) {
      let title = slides[0].querySelector('.card__title');
      let arrow = slides[0].querySelector('.card__controls-arrow');
      if (title) {
        title.style.opacity = '1';
      }
      if (arrow) {
        arrow.style.opacity = '1';
      }
    }
  }

  nextSlide() {
    let slides = this.container.children; // всегда содержит актуальный список элементов

    if (slides[1] && slides[1].tagName === 'BUTTON' && slides[2] && slides[2].tagName === 'BUTTON') {
      this.container.appendChild(this.container.children[0]); // slide
      this.container.appendChild(this.container.children[1]); // btn
      this.container.appendChild(this.container.children[2]); // btn
    } else if (slides[1] && slides[1].tagName == 'BUTTON'){
      this.container.appendChild(this.container.children[0]); // slide
      this.container.appendChild(this.container.children[1]); // btn
    } else {
      this.container.appendChild(slides[0]);
    }
    this.decorizeSlides();
  }

  bindTriggers() {
    let slides = this.container.children; // всегда содержит актуальный список элементов

    this.next.addEventListener('click', () => {
      // this.container.appendChild(this.slides[0]); // код Ивана, не работает

      this.nextSlide();
    });

    this.prev.addEventListener('click', () => {
      // let active = this.slides[this.slides.length - 1]; // код Ивана, не работает
      // this.container.insertBefore(active, this.slides[0]); // пояснение ниже
      // this.slides создаётся один раз в constructor, а потом не обновляется
      // когда перемещаешь элементы (appendChild / insertBefore), this.slides остаётся неизменным, и индексы ломаются


      for (let i = slides.length - 1; i > 0; i--) {
        if (slides[i].tagName !== 'BUTTON') {
          let active = slides[i];
          this.container.insertBefore(active, slides[0]);
          this.decorizeSlides();
          break;
        }
      }
    });
  }

  init() {
    try {
      this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
    `;

    this.bindTriggers();
    this.decorizeSlides();

    if (this.autoplay) {
      setInterval(() => this.nextSlide(), 5000);
    }
    } catch(e) {

    }
  }
}