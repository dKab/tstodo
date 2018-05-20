const storage = require('electron-storage');

export class ElectronStorage {
    filePath = 'db.json';

    getAll() {
        return storage.get(this.filePath);
    }

    save(value: any) {
        return storage.set(this.filePath, JSON.stringify(value));
    }

}