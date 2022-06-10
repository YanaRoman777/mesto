// класс, который отвечает за отрисовку элементов на странице
export default class Section {

    constructor({ renderer }, classSelector) {
        this._renderer = renderer;
        this.container = document.querySelector(classSelector);
    }

// метод, который отвечает за отрисовку всех элементов
renderItems(cards) {
    this._initialArray = cards.reverse();
    this._initialArray.forEach((item) => {
        this._renderer(item);
    });
}

// метод, который принимает DOM-элемент и добавляет его в контейнер.
    addItem(element) {
        this.container.prepend(element);
    }

}