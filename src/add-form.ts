import { trim } from 'lodash';
import { Mediator } from './mediator';
import { Component } from './Component';

export class AddForm extends Component {

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
      this.notify('newTodo', text);
      input.value = '';
      input.focus();
    }
  }
}