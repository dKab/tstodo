import { Mediator } from "./mediator";
import { IKeyValueStorage } from "./IKeyValueStorage";

export class Storage {

  mediator: Mediator;
  storage: IKeyValueStorage;
  /**
 * @param mediator
 * @param storage - the storage can be any storage as long as it implements methods getItem(key) & setItem(key, val)
 * @constructor
 */
  constructor(mediator: Mediator, storage: IKeyValueStorage) {
    this.mediator = mediator;
    this.storage = storage;
  }

  getAll(name: string) {
    var raw = this.storage.getItem(name),
      val;
    if (typeof raw === 'string') {
      try {
        val = JSON.parse(raw);
      } catch (err) {
        val = raw; //if it's not a valid json, than it's just a string
      }
    } else {
      val = raw;
    }
    if (val) {
      this.mediator.publish(name + 'Available', val);
    }
  }

  write(name: string, value: string) {
    if (this.storage === window.localStorage) {
      value = JSON.stringify(value);
    }
    this.storage.setItem(name, value);
  }
}


