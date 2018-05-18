import './main.css';
import { Mediator } from './mediator';
import { Search } from './search';
import { Storage } from './storage';
import { Todos } from './todos';
import { AddForm } from './add-form';

const mediator = new Mediator();
const todos = new Todos('todos', mediator);
todos.init();
const storage = new Storage(mediator, window.localStorage);
storage.getAll('todos');
mediator.subscribe('todosUpdate', {context: storage, fn: function(array: Array<any>) {
    this.write('todos', array);
}});
todos.render();
const addForm = new AddForm('add-form', mediator);
addForm.init();

const search = new Search('search-form', mediator);
search.init();

