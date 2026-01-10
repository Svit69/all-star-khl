import { BaseComponent } from '../core/BaseComponent.js';

export class SearchPanel extends BaseComponent {
  #placeholderText; #onInput;

  constructor(placeholderText = '', onInput = null) {
    super('div');
    this.#placeholderText = placeholderText;
    this.#onInput = onInput;
  }

  compose() {
    this.element.className = 'search-panel';
    this.element.innerHTML = '';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'search-input';
    input.placeholder = this.#placeholderText;
    input.setAttribute('aria-label', 'Поле поиска игрока или клуба');
    input.addEventListener('input', (event) => {
      this.element.classList.toggle('has-value', event.target.value.trim().length > 0);
      if (this.#onInput) this.#onInput(event.target.value);
    });
    this.element.appendChild(input);
  }
}
