import { resolveSpotlightRect, resolveTooltipPosition } from './TutorialPosition.js';

export class TutorialStepRunner {
  #overlay; #steps; #onNext; #onSkip;

  constructor(overlay, steps, onNext, onSkip) {
    this.#overlay = overlay;
    this.#steps = steps;
    this.#onNext = onNext;
    this.#onSkip = onSkip;
  }

  runStep(index) {
    const step = this.#steps[index];
    const target = step.target ? document.querySelector(step.target) : null;
    const rect = resolveSpotlightRect(target);
    this.#overlay.setDimOnly(Boolean(step.dimOnly));
    this.#overlay.setContent({
      title: step.title,
      body: step.body,
      stepLabel: `${index + 1}/${this.#steps.length}`,
      nextLabel: index === this.#steps.length - 1 ? 'Готово' : 'Дальше'
    });
    this.#overlay.setSpotlight(rect);
    this.#overlay.setTooltipPosition(resolveTooltipPosition(rect));
    this.#overlay.onNext(this.#onNext);
    this.#overlay.onSkip(this.#onSkip);
    if (step.onEnter) step.onEnter();
  }
}
