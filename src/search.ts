import { Mediator } from "./mediator";

export class Search {

  elem: HTMLElement;
  mediator: Mediator;
  filterPredicate = {
    text: '',
    checked: true
  };
  constructor(id: string, mediator: Mediator) {
    this.elem = document.getElementById(id);
    this.mediator = mediator;
  }

  updatePredicate(e: { target: Element; }) {
    var input = <HTMLInputElement>this.elem.querySelector('input[type=text]');
    if (e.target === input) {
      this.filterPredicate.text = input.value;
      this.notify();
    }
  }

  init() {
    this.elem.addEventListener('keyup', this.updatePredicate.bind(this));
    this.elem.addEventListener('change', this.togglechecked.bind(this));
    this.elem.querySelector('button').addEventListener('click', this.clear.bind(this));
  }
  clear() {
    this.filterPredicate.text = '';
    (<HTMLInputElement>this.elem.querySelector('input[type=text]')).value = '';
    this.notify();
  }

  togglechecked(e: { target: Element; }) {
    var checkbox = <HTMLInputElement>this.elem.querySelector('input[type=checkbox]');
    if (e.target === checkbox) {
      this.filterPredicate.checked = !checkbox.checked;
      this.notify();
    }
  }
  notify() {
    this.mediator.publish('filterUpdate', this.filterPredicate);
  }
}