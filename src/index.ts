import './main.css';
import { Mediator } from './mediator';
import { Search } from './search';
import { BrowserStorage } from './BrowserStorage';
import { Todos } from './todos';
import { AddForm } from './add-form';
import { IStorage } from './IStorage';
import { Events } from './events';

let storagePromise: Promise<IStorage>;

var userAgent = navigator.userAgent.toLowerCase();

if (userAgent.indexOf(' electron/') > -1) {
    storagePromise = import('./ElectronStorage').then((module) => {
        const ElectronStorage = module.ElectronStorage;
        return new ElectronStorage();
    });
} else {
    storagePromise = Promise.resolve(new BrowserStorage());
}

storagePromise.then((storage: IStorage) => {
    const mediator = new Mediator();
    const todos = new Todos(document.getElementById('todos'), mediator);
    todos.init();

    storage.getAll().then((todos) => {
        if (todos) {
            mediator.publish(Events.TODOS_AVAILABLE, todos);
        }
    });

    mediator.subscribe(Events.TODOS_UPDATE, {
        context: storage, fn: function (array: Array<any>) {
            this.save(array).then(() => {
                console.log('State is saved');
            });
        }
    });

    todos.render();
    new AddForm(document.getElementById('add-form'), mediator)
        .init();
    new Search(document.getElementById('search-form'), mediator)
        .init();
});






