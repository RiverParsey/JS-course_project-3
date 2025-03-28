export default class Slider {
  constructor({ container = null,
    btns = null,
    next = null,
    prev = null,
    activeClass = '',
    animate,
    autoplay } = {}) {
    this.container = document.querySelector(container);

    if (!this.container) {
      throw new Error(`Элемент с селектором "${container}" не найден`);
    }

    this.slides = Array.from(this.container.children);
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slideIndex = 1;
  }
}