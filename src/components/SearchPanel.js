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
    const caret = document.createElement('span');
    caret.className = 'input-caret';
    caret.textContent = '|';
    const syncCaret = () => {
      const hasValue = input.value.trim().length > 0;
      caret.style.opacity = hasValue ? '0' : '1';
      caret.style.visibility = hasValue ? 'hidden' : 'visible';
    };
    const syncCaretAsync = () => {
      window.setTimeout(syncCaret, 0);
    };
    input.addEventListener('input', (event) => {
      syncCaretAsync();
      if (this.#onInput) this.#onInput(event.target.value);
    });
    input.addEventListener('focus', syncCaretAsync);
    input.addEventListener('blur', syncCaretAsync);
    input.addEventListener('keyup', syncCaretAsync);
    input.addEventListener('change', syncCaretAsync);
    input.addEventListener('compositionend', syncCaretAsync);
    syncCaret();
    this.element.appendChild(input);
    this.element.appendChild(caret);
  }
}
