import { TutorialOverlay } from '../components/TutorialOverlay.js';
import { TutorialStepRunner } from './TutorialStepRunner.js';

export class TutorialController {
  #steps; #index = 0; #overlay; #runner; #updateLayout;

  constructor(steps) {
    this.#steps = steps;
    this.#overlay = new TutorialOverlay();
    this.#runner = new TutorialStepRunner(this.#overlay, this.#steps, () => this.next(), () => this.skip());
    this.#updateLayout = () => this.#runner.runStep(this.#index);
  }

  mount(parent) {
    this.#overlay.mount(parent);
    return this;
  }

  start() {
    if (!this.#steps.length) return;
    this.#overlay.setVisible(true);
    this.#runner.runStep(this.#index);
    window.addEventListener('resize', this.#updateLayout);
    window.addEventListener('scroll', this.#updateLayout, true);
  }

  next() {
    this.#index += 1;
    if (this.#index >= this.#steps.length) return this.skip();
    this.#runner.runStep(this.#index);
  }

  skip() {
    this.#overlay.setVisible(false);
    window.removeEventListener('resize', this.#updateLayout);
    window.removeEventListener('scroll', this.#updateLayout, true);
  }

}
