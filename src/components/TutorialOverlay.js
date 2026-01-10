import { BaseComponent } from '../core/BaseComponent.js';
import { buildTutorialOverlayLayout } from './TutorialOverlayLayout.js';

export class TutorialOverlay extends BaseComponent {
  #spotlight; #tooltip; #title; #body; #step; #next; #skip;

  constructor() {
    super('div');
  }

  compose() {
    this.element.className = 'tutorial-overlay';
    const layout = buildTutorialOverlayLayout();
    this.element.append(layout.spotlight, layout.tooltip);
    this.#spotlight = layout.spotlight;
    this.#tooltip = layout.tooltip;
    this.#title = layout.title;
    this.#body = layout.body;
    this.#step = layout.step;
    this.#next = layout.next;
    this.#skip = layout.skip;
  }

  setContent({ title, body, stepLabel, nextLabel }) {
    this.#title.textContent = title;
    this.#body.textContent = body;
    this.#step.textContent = stepLabel;
    this.#next.textContent = nextLabel;
  }

  setSpotlight(rect) {
    if (!rect) {
      this.#spotlight.style.display = 'none';
      return;
    }
    this.#spotlight.style.display = 'block';
    this.#spotlight.style.left = `${rect.left}px`;
    this.#spotlight.style.top = `${rect.top}px`;
    this.#spotlight.style.width = `${rect.width}px`;
    this.#spotlight.style.height = `${rect.height}px`;
  }

  setTooltipPosition({ left, top }) {
    this.#tooltip.style.left = `${left}px`;
    this.#tooltip.style.top = `${top}px`;
  }

  onNext(handler) {
    this.#next.onclick = handler;
  }

  onSkip(handler) {
    this.#skip.onclick = handler;
  }

  setVisible(isVisible) {
    this.element.classList.toggle('active', isVisible);
  }
}
