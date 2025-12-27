export class BaseComponent {
  #element;

  constructor(tagName = "div") {
    this.#element = document.createElement(tagName);
  }

  compose() {
    throw new Error('Метод compose должен быть переопределен в наследнике.');
  }

  render() {
    this.compose();
    return this.#element;
  }

  mount(parent) {
    parent.appendChild(this.render());
    return this;
  }

  get element() {
    return this.#element;
  }
}
