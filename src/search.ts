import { Mediator } from "./mediator";
import { Component } from "./Component";
import { Events } from "./events";

export class Search extends Component {

  filterPredicate = {
    text: '',
    checked: true
  };

  updatePredicate(e: { target: Element; }) {
    var input = <HTMLInputElement>this.elem.querySelector('input[type=text]');
    if (e.target === input) {
      this.filterPredicate.text = input.value;
      this.notify(Events.FILTER_UPDATE, this.filterPredicate);
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
    this.notify(Events.FILTER_UPDATE, this.filterPredicate);
  }

  togglechecked(e: { target: Element; }) {
    var checkbox = <HTMLInputElement>this.elem.querySelector('input[type=checkbox]');
    if (e.target === checkbox) {
      this.filterPredicate.checked = !checkbox.checked;
      this.notify(Events.FILTER_UPDATE, this.filterPredicate);
    }
  }
}