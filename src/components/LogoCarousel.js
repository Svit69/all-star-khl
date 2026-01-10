import { BaseComponent } from '../core/BaseComponent.js';

export class LogoCarousel extends BaseComponent {
  constructor(controller, assetResolver, onChange = null, isCompleted = null) {
    super('div');
    this.controller = controller;
    this.assetResolver = assetResolver;
    this.onChange = onChange;
    this.isCompleted = isCompleted;
  }

  compose() {
    this.element.className = 'carousel-shell';
    this.element.innerHTML = '';
    const track = document.createElement('div');
    track.className = 'carousel-track';
    this.controller.getClubs().forEach((club, index) => {
      track.appendChild(this.#buildItem(club, index, track));
    });
    const fadeLeft = this.#buildFade('left');
    const fadeRight = this.#buildFade('right');
    this.element.append(fadeLeft, track, fadeRight);
    this.#highlightActive(track);
    this.#enableWheelScroll(track);
  }

  #buildItem(club, index, track) {
    const item = document.createElement('button');
    item.className = 'carousel-item';
    item.type = 'button';
    item.title = club.name;
    if (this.isCompleted) item.classList.toggle('completed', this.isCompleted(club));
    const logo = document.createElement('img');
    logo.src = this.assetResolver.buildPath(club.logo);
    logo.alt = club.name;
    item.appendChild(logo);
    item.addEventListener('click', () => {
      this.controller.setActiveByIndex(index);
      this.#highlightActive(track);
      if (this.onChange) this.onChange(this.controller.getActiveClub());
    });
    return item;
  }

  #highlightActive(track) {
    const items = track.querySelectorAll('.carousel-item');
    items.forEach((item, idx) => {
      item.classList.toggle('active', idx === this.controller.getClubs().indexOf(this.controller.getActiveClub()));
    });
  }

  #buildFade(position) {
    const fade = document.createElement('div');
    fade.className = `carousel-fade ${position}`;
    return fade;
  }

  #enableWheelScroll(track) {
    track.addEventListener(
      'wheel',
      (event) => {
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
        event.preventDefault();
        track.scrollLeft += event.deltaY;
      },
      { passive: false }
    );
  }
}
