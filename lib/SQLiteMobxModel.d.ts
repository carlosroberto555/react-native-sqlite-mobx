export default abstract class SQLiteMobxModel<T extends {
    id: number;
}> {
    abstract table: string;
    abstract data: T[];
    where?: string;
    loadItems(): Promise<void>;
    setItems(items: T[]): Promise<void>;
    addItems(items: T[]): Promise<void>;
    addItem(item: T): Promise<void>;
    getItem(id: number): Promise<void>;
    editItem(item: T): Promise<void>;
    removeItem(item: T): Promise<void>;
}
