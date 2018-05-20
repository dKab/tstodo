import './main.css';
import { Mediator } from './mediator';
import { Search } from './search';
import { Storage } from './storage';
import { Todos } from './todos';
import { AddForm } from './add-form';

const mediator = new Mediator();
const todos = new Todos(document.getElementById('todos'), mediator);
todos.init();
const storage = new Storage(mediator, window.localStorage);
storage.getAll('todos');
mediator.subscribe('todosUpdate', {context: storage, fn: function(array: Array<any>) {
    this.write('todos', array);
}});
todos.render();

new AddForm(document.getElementById('add-form'), mediator)
    .init();
new Search(document.getElementById('search-form'), mediator)
    .init();


