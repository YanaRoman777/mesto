// класс, который отвечает за отрисовку элементов на странице
export default class Section {

    constructor({items, renderer}, classSelector) {
        this._items = items;
        this._renderer = renderer;
        this.container = document.querySelector(classSelector);
    }

// метод, который отвечает за отрисовку всех элементов
rendererItems() {
    this._items.forEach(item => {
        this._renderer(item);
    });
}

// метод, который принимает DOM-элемент и добавляет его в контейнер.
    addItem(element) {
        this.container.prepend(element);
    }

}