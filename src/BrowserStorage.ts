export class BrowserStorage {

  STORAGE_KEY = 'todos';

  getAll(): Promise<any> {
    var raw = window.localStorage.getItem(this.STORAGE_KEY),
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
    return Promise.resolve(val);
  }

  save(value: any): Promise<any> {
    value = JSON.stringify(value);
    window.localStorage.setItem(this.STORAGE_KEY, value);
    return Promise.resolve();
  }
}


