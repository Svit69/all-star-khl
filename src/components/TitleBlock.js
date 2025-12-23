import { BaseComponent } from '../core/BaseComponent.js';

export class TitleBlock extends BaseComponent {
  constructor(title, subtitle) {
    super('div');
    this.title = title;
    this.subtitle = subtitle;
  }

  compose() {
    this.element.className = 'title-block';
    this.element.innerHTML = '';
    const heading = document.createElement('h1');
    heading.textContent = this.title;
    const sub = document.createElement('p');
    sub.textContent = this.subtitle;
    this.element.append(heading, sub);
  }
}
