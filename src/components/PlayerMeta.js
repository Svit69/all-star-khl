import { BaseComponent } from '../core/BaseComponent.js';

export class PlayerMeta extends BaseComponent {
  #fullName; #position; #nation; #isGuessed; #hintRevealed = false;

  constructor(fullName, position, nation, isGuessed = false) {
    super('div');
    this.#fullName = fullName || 'Неизвестный игрок';
    this.#position = position || '-';
    this.#nation = nation || '?';
    this.#isGuessed = Boolean(isGuessed);
  }

  compose() {
    this.element.className = 'player-meta';
    this.element.innerHTML = '';
    this.element.append(this.#buildName(), this.#buildDetails());
  }

  #buildName() {
    const name = document.createElement('p');
    name.className = 'player-name';
    name.textContent = this.#isGuessed ? this.#fullName : 'Угадай игрока';
    return name;
  }

  #buildDetails() {
    const details = document.createElement('div');
    details.className = 'player-details';
    details.append(this.#buildPositionLine(), this.#buildNationTag());
    return details;
  }

  #buildNationTag() {
    const tag = document.createElement('span');
    tag.className = 'nation-tag';
    const icon = document.createElement('span');
    icon.className = 'nation-icon';
    icon.textContent = this.#nation;
    const label = document.createElement('span');
    label.className = 'nation-label';
    label.textContent = 'СТРАНА';
    tag.append(icon, label);
    return tag;
  }

  #buildPositionLine() {
    const wrap = document.createElement('span');
    wrap.className = 'player-detail-line';

    const labelNode = document.createElement('span');
    labelNode.className = 'label';
    labelNode.textContent = 'ПОЗИЦИЯ';

    const valueNode = document.createElement('span');
    valueNode.className = 'position-value';
    const showReal = this.#isGuessed || this.#hintRevealed;
    valueNode.textContent = showReal ? this.#position : '?';

    wrap.append(labelNode, valueNode);

    if (!showReal) {
      const hintButton = document.createElement('button');
      hintButton.type = 'button';
      hintButton.className = 'position-hint';
      hintButton.textContent = '?';
      hintButton.addEventListener('click', () => {
        this.#hintRevealed = true;
        valueNode.textContent = this.#position;
        hintButton.remove();
      });
      wrap.append(hintButton);
    }

    return wrap;
  }
}
