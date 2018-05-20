export interface IStorage {
    getAll(): Promise<any>;
    save(value: any): Promise<any>;
}