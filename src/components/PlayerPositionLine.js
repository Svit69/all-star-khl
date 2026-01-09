import { BaseComponent } from '../core/BaseComponent.js';

export class PlayerPositionLine extends BaseComponent {
  #position; #isGuessed; #hintRevealed = false;
  constructor(position, isGuessed = false) {
    super('span');
    this.#position = position || '—';
    this.#isGuessed = Boolean(isGuessed);
  }
  compose() {
    this.element.className = 'player-detail-line';
    this.element.innerHTML = '';
    const revealed = this.#isGuessed || this.#hintRevealed;
    if (revealed) {
      const value = document.createElement('span');
      value.className = 'detail-value';
      value.textContent = this.#position;
      this.element.append(value);
      return;
    }
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = 'ПОЗИЦИЯ';
    const hint = this.#buildHintButton(() => {
      this.#hintRevealed = true;
      this.compose();
    });
    this.element.append(label, hint);
  }
  #buildHintButton(onClick) {
    const hint = document.createElement('button');
    hint.type = 'button';
    hint.className = 'position-hint';
    hint.textContent = '?';
    hint.addEventListener('click', onClick);
    return hint;
  }
}
