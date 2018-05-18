import { trim } from 'lodash';
import { Mediator } from './mediator';

export class AddForm {
  
  mediator: Mediator;
  elem: HTMLElement;

  constructor(id: string, mediator: Mediator) {
    this.elem = document.getElementById(id);
    this.mediator = mediator;
  }

  init() {
    this.elem.addEventListener('keyup', (e) => {
      if (e.keyCode == 13) {
        this.add();
      }
    });
    this.elem.addEventListener('click', (e) => {
      if (~(<HTMLElement>e.target).className.indexOf('add-form__btn-js')) {
        this.add();
      }
    })
  }
  
  add() {
    //get value of input elem
    var input = <HTMLInputElement>this.elem.querySelector('input[type=text]');
    var text = trim(input.value);
    if (text) {
      this.mediator.publish('newTodo', text);
      input.value = '';
      input.focus();
    }
  }
}