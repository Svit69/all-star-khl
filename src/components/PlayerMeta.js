import { BaseComponent } from '../core/BaseComponent.js';

export class PlayerMeta extends BaseComponent {
  #fullName; #position; #nation;

  constructor(fullName, position, nation) {
    super('div');
    this.#fullName = fullName || 'Неизвестный игрок';
    this.#position = position || '—';
    this.#nation = nation || '?';
  }

  compose() {
    this.element.className = 'player-meta';
    this.element.innerHTML = '';
    this.element.append(this.#buildName(), this.#buildDetails());
  }

  #buildName() {
    const name = document.createElement('p');
    name.className = 'player-name';
    name.textContent = this.#fullName;
    return name;
  }

  #buildDetails() {
    const details = document.createElement('div');
    details.className = 'player-details';
    details.append(this.#buildLabelValue('ПОЗИЦИЯ', this.#position), this.#buildNationTag());
    return details;
  }

  #buildLabelValue(label, value) {
    const wrap = document.createElement('span');
    wrap.className = 'player-detail-line';
    const labelNode = document.createElement('span');
    labelNode.className = 'label';
    labelNode.textContent = label;
    const valueNode = document.createElement('span');
    valueNode.textContent = value;
    wrap.append(labelNode, valueNode);
    return wrap;
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
}
