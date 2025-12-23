import { BaseComponent } from '../core/BaseComponent.js';

export class SearchPanel extends BaseComponent {
  constructor(placeholderText = '') {
    super('div');
    this.placeholderText = placeholderText;
  }

  compose() {
    this.element.className = 'search-panel';
    this.element.innerHTML = '';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'search-input';
    input.placeholder = this.placeholderText;
    input.setAttribute('aria-label', 'Поиск хоккеиста');
    this.element.appendChild(input);
  }
}
