import { findIndex, find, template, trim } from 'lodash';
import { Mediator } from './mediator';
import { util } from './util';
import { TodoItem } from './TodoItem';
import { Component } from './Component';

export class Todos extends Component {

  todos: TodoItem[] = [];
  conditions: {text?: string, checked?: boolean} = {};

  private updateCounter(which: any, how: any) {
    var blockToUpdate = document.getElementById('count__' + which);
    var currentCount = +blockToUpdate.innerHTML;
    blockToUpdate.innerHTML = `${(how < 0) ? (Math.max(0, currentCount - 1)) : (currentCount + 1)}`;
  }

  finishEditingText(e: any) {
    if (~e.target.className.indexOf('todo__text-js')) {
      if (e.type == 'keydown' && e.keyCode != 13) {
        return;
      }
      e.target.contentEditabe = false;
      var id = e.target.closest('li').id.substr(5);
      var modelBeingEdited = find(this.todos, { id: +id });
      if (!modelBeingEdited) {
        throw new Error('could\'t find corresponding model');
      }
      var newText = trim(e.target.textContent);
      if (newText) {
        modelBeingEdited.text = newText;
        this.notify('todosUpdate', this.todos);
      }
      e.target.textContent = modelBeingEdited.text;

      if (e.type == 'keydown') {
        e.preventDefault();
        e.target.blur();
        return false;
      }
    }
  }

  init() {
    this.elem.addEventListener('change', this.onCheck.bind(this));
    this.elem.addEventListener('click', this.onClick.bind(this), true);
    this.elem.addEventListener('keydown', this.finishEditingText.bind(this));
    this.elem.addEventListener('blur', this.finishEditingText.bind(this), true);
    this.mediator.subscribe('todosAvailable', { context: this, fn: this.onTodosAvailable });
    this.mediator.subscribe('newTodo', { context: this, fn: this.addTodo });
    this.mediator.subscribe('filterUpdate', { context: this, fn: this.onFilterUpdate });
  }

  onFilterUpdate(filter: { text: string; checked: any; }) {
    if (filter instanceof Object) {
      if (filter.text === '') {
        delete this.conditions.text;
      } else {
        this.conditions.text = filter.text;
      }
      this.conditions.checked = !!filter.checked;
      this.render();
    }
  }

  onClick(event: { target: any; }) {
    var target = event.target;
    if (~target.className.indexOf('todo__delete-btn-js')) {
      var id = target.closest('li').id.substr(5);
      this.remove(id);
    } else if (~target.className.indexOf('todo__text-js')) {
      target.contentEditable = true;
      target.focus();
    }
  }

  onCheck(e: { target: any; }) {
    var target = e.target;
    if (target.type === 'checkbox') {
      var li = target.closest('li'),
        idAttr = li.id,
        id = +idAttr.substr(5),
        index = findIndex(this.todos, { id: id });
      if (~index) {
        var model = this.todos.splice(index, 1).pop();
        model.checked = target.checked;
        this.todos.push(model);
        this.notify('todosUpdate', this.todos);
        this.render();
      }
    }

  }

  remove(id: any) {
    var index = findIndex(this.todos, { id: +id });
    if (~index) {
      var model = this.todos.splice(index, 1).pop();
      var li = document.getElementById('todo_' + id);
      li.parentNode.removeChild(li);
      var countToUpdate = model.checked ? 'archive' : 'active';
      this.updateCounter(countToUpdate, -1);
      this.notify('todosUpdate', this.todos);
    } else {
      throw new Error('Model with such id has not found');
    }
  }

  add(todo: TodoItem) {
    this.todos.push(todo);
  }

  onTodosAvailable = function (array: TodoItem[]) {
    this.todos.length = 0;
    Array.prototype.push.apply(this.todos, array);
  }

  render(callback?: Function) {
    var self = this;
        var compiled = require('../templates/todos.html');
        var filtered;
        if (this.conditions.text) {
          try {
            filtered = this.todos.filter((model: TodoItem) => {
              var passes = true;
              if (this.conditions.checked === false) {
                passes = !model.checked;
              }
              if (!passes) {
                return false;
              }
              if (this.conditions.text) {
                passes = model.text.indexOf(this.conditions.text) !== -1;
              }
              return passes;
            });
          } catch (e) {
            console.error(e);
            alert('Error ocured!');
          }
        } else {
          filtered = this.todos;
        }
        self.elem.innerHTML = compiled({ todos: filtered });
        if (callback) {
          callback();
        }
  }

  addTodo(todo: string) {
    var model = {
      id: Date.now(),
      text: todo
    };
    this.todos.unshift(model);
    this.notify('todosUpdate', this.todos);
    this.render();
  }
}